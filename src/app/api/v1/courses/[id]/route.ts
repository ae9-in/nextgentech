import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { updateCourseSchema, validateBody } from '@/lib/validate';
import { createAuditLog, AUDIT_ACTIONS } from '@/lib/audit';

// GET: Get single course with full details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const courses = await getCollection(COLLECTIONS.COURSES);
    const course = await courses.findOne({ _id: new ObjectId(params.id) });

    if (!course) {
      return apiError('NOT_FOUND', 'Course not found', 404);
    }

    return apiSuccess({ ...course, _id: course._id.toString() }, 'Course retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH: Update course
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'trainer.course.manage');

    const body = await validateBody(request, updateCourseSchema);
    const courses = await getCollection(COLLECTIONS.COURSES);

    const updateData: any = { ...body, updatedAt: new Date() };

    // Recalculate total lessons if modules changed
    if (body.modules) {
      updateData.totalLessons = body.modules.reduce(
        (sum, mod) => sum + (mod.lessons?.length || 0), 0,
      );
    }

    const result = await courses.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: updateData },
      { returnDocument: 'after' },
    );

    if (!result) {
      return apiError('NOT_FOUND', 'Course not found', 404);
    }

    await createAuditLog({
      actor: authUser.userId,
      actorRole: authUser.role,
      actorName: authUser.name,
      action: AUDIT_ACTIONS.COURSE_UPDATED,
      entity: 'course',
      entityId: params.id,
    });

    return apiSuccess({ ...result, _id: result._id.toString() }, 'Course updated');
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE: Delete course
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'admin.course.manage');

    const courses = await getCollection(COLLECTIONS.COURSES);
    const result = await courses.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return apiError('NOT_FOUND', 'Course not found', 404);
    }

    await createAuditLog({
      actor: authUser.userId,
      actorRole: authUser.role,
      actorName: authUser.name,
      action: AUDIT_ACTIONS.COURSE_DELETED,
      entity: 'course',
      entityId: params.id,
    });

    return apiSuccess(null, 'Course deleted');
  } catch (error) {
    return handleApiError(error);
  }
}
