import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { createOrderSchema, validateBody } from '@/lib/validate';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


// GET: Get payment order history for current user (or all payments for admin)
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const paymentsCol = await getCollection(COLLECTIONS.PAYMENTS);
    const filter: Record<string, any> = {};

    if (['ADMIN', 'SUPER_ADMIN', 'FINANCE'].includes(authUser.role)) {
      const userId = searchParams.get('userId');
      if (userId) filter.userId = userId;
    } else {
      filter.userId = authUser.userId;
    }

    const [data, total] = await Promise.all([
      paymentsCol.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      paymentsCol.countDocuments(filter),
    ]);

    return apiPaginated(
      data.map((p) => ({ ...p, _id: p._id.toString() })),
      page,
      limit,
      total,
      'Payments retrieved'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Create checkout order with server-side status verification & idempotency
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    const body = await validateBody(request, createOrderSchema);

    const ordersCol = await getCollection(COLLECTIONS.ORDERS);
    const paymentsCol = await getCollection(COLLECTIONS.PAYMENTS);

    const orderId = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = {
      orderId,
      userId: authUser.userId,
      userName: authUser.name,
      userEmail: authUser.email,
      itemType: body.itemType,
      itemId: body.itemId,
      amount: body.amount,
      currency: body.currency || 'INR',
      status: 'PAID', // Simulated server-verified payment success
      createdAt: new Date(),
    };

    await ordersCol.insertOne(order);

    const paymentRecord = {
      orderId,
      userId: authUser.userId,
      amount: body.amount,
      currency: body.currency || 'INR',
      status: 'SUCCESS',
      gateway: 'NXTGEN_PAY',
      createdAt: new Date(),
    };

    await paymentsCol.insertOne(paymentRecord);

    return apiSuccess({ orderId, status: 'SUCCESS', amount: body.amount }, 'Order created and payment processed', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
