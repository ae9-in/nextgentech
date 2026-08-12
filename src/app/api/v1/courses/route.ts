import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, apiPaginated, parsePagination } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { createCourseSchema, validateBody } from '@/lib/validate';
import { createAuditLog, AUDIT_ACTIONS } from '@/lib/audit';
import { ZodError } from 'zod';
import { apiError } from '@/lib/apiResponse';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


// GET: List courses (public for published, all for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');

    const courses = await getCollection(COLLECTIONS.COURSES);

    const filter: Record<string, any> = { published: true };
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) filter.title = { $regex: search, $options: 'i' };

    // Check if admin/trainer requesting all courses
    try {
      const authUser = await authenticateRequest(request);
      if (['ADMIN', 'SUPER_ADMIN', 'TRAINER'].includes(authUser.role)) {
        delete filter.published; // Show all courses to admins
      }
    } catch {
      // Unauthenticated — only show published
    }

    const [data, total] = await Promise.all([
      courses.find(filter, { projection: { 'modules.lessons': 0 } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      courses.countDocuments(filter),
    ]);

    return apiPaginated(data, page, limit, total, 'Courses retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Create course (trainer/admin only)
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'trainer.course.manage');

    const body = await validateBody(request, createCourseSchema);
    const courses = await getCollection(COLLECTIONS.COURSES);

    const totalLessons = (body.modules || []).reduce(
      (sum, mod) => sum + (mod.lessons?.length || 0), 0,
    );

    const newCourse = {
      ...body,
      trainerId: authUser.userId,
      trainerName: authUser.name,
      studentsEnrolled: 0,
      totalLessons,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await courses.insertOne(newCourse);

    await createAuditLog({
      actor: authUser.userId,
      actorRole: authUser.role,
      actorName: authUser.name,
      action: AUDIT_ACTIONS.COURSE_CREATED,
      entity: 'course',
      entityId: result.insertedId.toString(),
      metadata: { title: body.title },
    });

    return apiSuccess(
      { ...newCourse, _id: result.insertedId.toString() },
      'Course created successfully',
      201,
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError('VALIDATION_ERROR', 'Invalid course data', 400, {
        fields: error.issues.map((e: any) => ({ path: e.path.join('.'), message: e.message })),
      });
    }
    return handleApiError(error);
  }
}
