import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { createPostSchema, validateBody } from '@/lib/validate';

// GET: List community posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);
    const category = searchParams.get('category');

    const postsCol = await getCollection(COLLECTIONS.COMMUNITY_POSTS);
    const filter: Record<string, any> = {};
    if (category && category !== 'All') filter.category = category;

    const [data, total] = await Promise.all([
      postsCol.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      postsCol.countDocuments(filter),
    ]);

    return apiPaginated(
      data.map((p) => ({ ...p, _id: p._id.toString() })),
      page,
      limit,
      total,
      'Community posts retrieved'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Create community post
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'student.community.post');

    const body = await validateBody(request, createPostSchema);
    const postsCol = await getCollection(COLLECTIONS.COMMUNITY_POSTS);

    const newPost = {
      ...body,
      authorId: authUser.userId,
      authorName: authUser.name,
      authorRole: authUser.role,
      likes: 0,
      repliesCount: 0,
      createdAt: new Date(),
    };

    const result = await postsCol.insertOne(newPost);
    return apiSuccess({ ...newPost, _id: result.insertedId.toString() }, 'Community post created', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
