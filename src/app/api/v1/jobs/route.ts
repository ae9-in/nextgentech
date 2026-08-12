import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { createJobSchema, validateBody } from '@/lib/validate';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


// GET: List job listings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const jobsCol = await getCollection(COLLECTIONS.JOB_LISTINGS);

    const [data, total] = await Promise.all([
      jobsCol.find({ status: 'ACTIVE' }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      jobsCol.countDocuments({ status: 'ACTIVE' }),
    ]);

    return apiPaginated(
      data.map((j) => ({ ...j, _id: j._id.toString() })),
      page,
      limit,
      total,
      'Jobs retrieved'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Create job listing (Admin only)
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'admin.job.manage');

    const body = await validateBody(request, createJobSchema);
    const jobsCol = await getCollection(COLLECTIONS.JOB_LISTINGS);

    const newJob = {
      ...body,
      status: 'ACTIVE',
      creatorId: authUser.userId,
      createdAt: new Date(),
    };

    const result = await jobsCol.insertOne(newJob);
    return apiSuccess({ ...newJob, _id: result.insertedId.toString() }, 'Job listing created', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
