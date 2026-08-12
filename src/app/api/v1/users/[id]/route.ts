import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { updateUserSchema, validateBody } from '@/lib/validate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);

    // Students can only access their own profile unless admin
    if (authUser.role === 'STUDENT' && authUser.userId !== params.id) {
      return apiError('FORBIDDEN', 'Access denied to this profile', 403);
    }

    const usersCol = await getCollection(COLLECTIONS.USERS);
    const user = await usersCol.findOne({ _id: new ObjectId(params.id) }, { projection: { password: 0 } });

    if (!user) {
      return apiError('NOT_FOUND', 'User not found', 404);
    }

    return apiSuccess({ ...user, _id: user._id.toString() }, 'User retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH: Update user profile / status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);

    // Self update or Admin update
    if (authUser.role === 'STUDENT' && authUser.userId !== params.id) {
      return apiError('FORBIDDEN', 'Access denied', 403);
    }

    const body = await validateBody(request, updateUserSchema);
    const usersCol = await getCollection(COLLECTIONS.USERS);

    // Only admins can update user status (ACTIVE / SUSPENDED)
    if (body.status && !['ADMIN', 'SUPER_ADMIN'].includes(authUser.role)) {
      delete body.status;
    }

    const result = await usersCol.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: { ...body, updatedAt: new Date() } },
      { returnDocument: 'after', projection: { password: 0 } }
    );

    if (!result) {
      return apiError('NOT_FOUND', 'User not found', 404);
    }

    return apiSuccess({ ...result, _id: result._id.toString() }, 'User profile updated');
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE: Delete user (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'admin.user.manage');

    const usersCol = await getCollection(COLLECTIONS.USERS);
    const result = await usersCol.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return apiError('NOT_FOUND', 'User not found', 404);
    }

    return apiSuccess(null, 'User deleted');
  } catch (error) {
    return handleApiError(error);
  }
}
