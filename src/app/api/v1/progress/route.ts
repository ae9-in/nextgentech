import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { updateProgressSchema, validateBody } from '@/lib/validate';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


// GET: Get course progress for current student
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return apiError('VALIDATION_ERROR', 'courseId parameter is required', 400);
    }

    const lessonProgressCol = await getCollection(COLLECTIONS.LESSON_PROGRESS);
    const enrollmentsCol = await getCollection(COLLECTIONS.ENROLLMENTS);

    const [completedLessons, enrollment] = await Promise.all([
      lessonProgressCol.find({ studentId: authUser.userId, courseId, completed: true }).toArray(),
      enrollmentsCol.findOne({ studentId: authUser.userId, courseId }),
    ]);

    return apiSuccess({
      courseId,
      completedLessons: completedLessons.map((l) => l.lessonId),
      progressPercentage: enrollment ? enrollment.progressPercentage : 0,
    }, 'Progress retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH: Mark lesson as completed and recalculate course progress
export async function PATCH(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    const body = await validateBody(request, updateProgressSchema);

    const lessonProgressCol = await getCollection(COLLECTIONS.LESSON_PROGRESS);
    const enrollmentsCol = await getCollection(COLLECTIONS.ENROLLMENTS);
    const coursesCol = await getCollection(COLLECTIONS.COURSES);

    // Upsert lesson progress
    await lessonProgressCol.updateOne(
      { studentId: authUser.userId, lessonId: body.lessonId },
      {
        $set: {
          studentId: authUser.userId,
          courseId: body.courseId,
          moduleId: body.moduleId,
          lessonId: body.lessonId,
          completed: body.completed,
          watchPercentage: body.watchPercentage || 100,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    // Calculate total completed lessons for course
    const completedCount = await lessonProgressCol.countDocuments({
      studentId: authUser.userId,
      courseId: body.courseId,
      completed: true,
    });

    // Fetch course to get total lessons count
    const course = await coursesCol.findOne({ _id: new ObjectId(body.courseId) });
    const totalLessons = course?.totalLessons || 1;
    const progressPercentage = Math.min(100, Math.round((completedCount / totalLessons) * 100));

    // Update enrollment progress
    await enrollmentsCol.updateOne(
      { studentId: authUser.userId, courseId: body.courseId },
      {
        $set: {
          completedLessons: completedCount,
          totalLessons,
          progressPercentage,
          updatedAt: new Date(),
        },
      }
    );

    return apiSuccess({
      lessonId: body.lessonId,
      completed: body.completed,
      completedCount,
      totalLessons,
      progressPercentage,
    }, 'Lesson progress updated');
  } catch (error) {
    return handleApiError(error);
  }
}
