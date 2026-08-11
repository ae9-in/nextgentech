import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { apiSuccess } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    const users = await getCollection(COLLECTIONS.USERS);
    const user = await users.findOne(
      { _id: new ObjectId(authUser.userId) },
      { projection: { password: 0 } },
    );

    if (!user) {
      return handleApiError(new Error('User not found'));
    }

    return apiSuccess({
      ...user,
      _id: user._id.toString(),
    }, 'User profile retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}
