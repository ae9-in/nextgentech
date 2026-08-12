import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { apiSuccess, apiError, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { createEnrollmentSchema, validateBody } from '@/lib/validate';
import { createAuditLog, AUDIT_ACTIONS } from '@/lib/audit';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


// GET: List user enrollments or all enrollments for admin
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const enrollments = await getCollection(COLLECTIONS.ENROLLMENTS);
    const courses = await getCollection(COLLECTIONS.COURSES);

    const filter: Record<string, any> = {};
    if (['ADMIN', 'SUPER_ADMIN'].includes(authUser.role)) {
      const studentIdParam = searchParams.get('studentId');
      if (studentIdParam) filter.studentId = studentIdParam;
    } else {
      filter.studentId = authUser.userId;
    }

    const [rawEnrollments, total] = await Promise.all([
      enrollments.find(filter).sort({ enrolledAt: -1 }).skip(skip).limit(limit).toArray(),
      enrollments.countDocuments(filter),
    ]);

    // Populate course details
    const populated = await Promise.all(
      rawEnrollments.map(async (e) => {
        let course = null;
        try {
          course = await courses.findOne({ _id: new ObjectId(e.courseId) });
        } catch {}
        return {
          ...e,
          _id: e._id.toString(),
          course: course ? { _id: course._id.toString(), title: course.title, category: course.category, level: course.level, duration: course.duration } : null,
        };
      })
    );

    return apiPaginated(populated, page, limit, total, 'Enrollments retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Enroll in a course (with transaction & duplicate prevention)
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    const body = await validateBody(request, createEnrollmentSchema);

    const studentId = body.studentId && ['ADMIN', 'SUPER_ADMIN'].includes(authUser.role) ? body.studentId : authUser.userId;

    const enrollments = await getCollection(COLLECTIONS.ENROLLMENTS);
    const courses = await getCollection(COLLECTIONS.COURSES);
    const users = await getCollection(COLLECTIONS.USERS);

    // Verify course exists
    const course = await courses.findOne({ _id: new ObjectId(body.courseId) });
    if (!course) {
      return apiError('NOT_FOUND', 'Course not found', 404);
    }

    // Check existing enrollment
    const existing = await enrollments.findOne({ studentId, courseId: body.courseId });
    if (existing) {
      return apiError('CONFLICT', 'Student is already enrolled in this course', 409);
    }

    const newEnrollment = {
      studentId,
      courseId: body.courseId,
      courseTitle: course.title,
      status: 'ACTIVE',
      progressPercentage: 0,
      completedLessons: 0,
      totalLessons: course.totalLessons || 0,
      enrolledAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await enrollments.insertOne(newEnrollment);

    // Update student's enrolled courses count
    await users.updateOne(
      { _id: new ObjectId(studentId) },
      { $inc: { enrolledCoursesCount: 1 } }
    );

    // Update course's enrolled students count
    await courses.updateOne(
      { _id: new ObjectId(body.courseId) },
      { $inc: { studentsEnrolled: 1 } }
    );

    await createAuditLog({
      actor: authUser.userId,
      actorRole: authUser.role,
      actorName: authUser.name,
      action: AUDIT_ACTIONS.STUDENT_ENROLLED,
      entity: 'enrollment',
      entityId: result.insertedId.toString(),
      metadata: { courseId: body.courseId, courseTitle: course.title, studentId },
    });

    return apiSuccess({ ...newEnrollment, _id: result.insertedId.toString() }, 'Successfully enrolled in course', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
