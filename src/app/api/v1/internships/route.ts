import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { createInternshipSchema, validateBody } from '@/lib/validate';
import { CONTENT } from '@/config/content';

// GET: List available developer internships
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const internshipsCol = await getCollection(COLLECTIONS.INTERNSHIPS);

    const [data, total] = await Promise.all([
      internshipsCol.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      internshipsCol.countDocuments({}),
    ]);

    if (!data || data.length === 0) {
      return apiPaginated(
        CONTENT.internship.tracks,
        1,
        10,
        CONTENT.internship.tracks.length,
        'Official domain tracks retrieved'
      );
    }

    return apiPaginated(
      data.map((i) => ({ ...i, _id: i._id.toString() })),
      page,
      limit,
      total,
      'Internships retrieved'
    );
  } catch (error) {
    return apiPaginated(
      CONTENT.internship.tracks,
      1,
      10,
      CONTENT.internship.tracks.length,
      'Official domain tracks retrieved'
    );
  }
}

// POST: Create internship track (Admin only)
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'admin.internship.manage');

    const body = await validateBody(request, createInternshipSchema);
    const internshipsCol = await getCollection(COLLECTIONS.INTERNSHIPS);

    const newInternship = {
      ...body,
      applicationsCount: 0,
      enrolledCount: 0,
      status: 'OPEN',
      createdAt: new Date(),
    };

    const result = await internshipsCol.insertOne(newInternship);
    return apiSuccess({ ...newInternship, _id: result.insertedId.toString() }, 'Internship created', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
