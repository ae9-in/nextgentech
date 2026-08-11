import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';

// GET: Get user notifications
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const notifsCol = await getCollection(COLLECTIONS.NOTIFICATIONS);

    const [data, total, unreadCount] = await Promise.all([
      notifsCol.find({ userId: authUser.userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      notifsCol.countDocuments({ userId: authUser.userId }),
      notifsCol.countDocuments({ userId: authUser.userId, read: false }),
    ]);

    return apiSuccess({
      notifications: data.map((n) => ({ ...n, _id: n._id.toString() })),
      unreadCount,
      pagination: { page, limit, total },
    }, 'Notifications retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH: Mark notification(s) as read
export async function PATCH(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    const body = await request.json();

    const notifsCol = await getCollection(COLLECTIONS.NOTIFICATIONS);

    if (body.all) {
      await notifsCol.updateMany({ userId: authUser.userId }, { $set: { read: true } });
    } else if (body.id) {
      await notifsCol.updateOne({ _id: new ObjectId(body.id), userId: authUser.userId }, { $set: { read: true } });
    }

    return apiSuccess(null, 'Notifications marked as read');
  } catch (error) {
    return handleApiError(error);
  }
}
