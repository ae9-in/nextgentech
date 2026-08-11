import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { registerSchema, validateBody } from '@/lib/validate';
import { hashPassword } from '@/lib/auth';

// GET: List users with pagination and role filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);
    const role = searchParams.get('role');
    const search = searchParams.get('search');

    const usersCol = await getCollection(COLLECTIONS.USERS);
    const filter: Record<string, any> = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      usersCol.find(filter, { projection: { password: 0 } }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      usersCol.countDocuments(filter),
    ]);

    return apiPaginated(
      data.map((u) => ({ ...u, _id: u._id.toString() })),
      page,
      limit,
      total,
      'Users retrieved'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Admin creates a user
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'admin.user.manage');

    const body = await validateBody(request, registerSchema);
    const usersCol = await getCollection(COLLECTIONS.USERS);

    const hashedPassword = await hashPassword(body.password);
    const newUser = {
      ...body,
      password: hashedPassword,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCol.insertOne(newUser);
    const { password: _, ...userWithoutPassword } = newUser;

    return apiSuccess({ ...userWithoutPassword, _id: result.insertedId.toString() }, 'User created', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
