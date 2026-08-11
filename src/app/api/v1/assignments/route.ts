import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { createAssignmentSchema, validateBody } from '@/lib/validate';

// GET: List assignments for course or all assignments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);
    const courseId = searchParams.get('courseId');

    const assignmentsCol = await getCollection(COLLECTIONS.ASSIGNMENTS);
    const filter: Record<string, any> = {};
    if (courseId) filter.courseId = courseId;

    const [data, total] = await Promise.all([
      assignmentsCol.find(filter).sort({ dueDate: 1 }).skip(skip).limit(limit).toArray(),
      assignmentsCol.countDocuments(filter),
    ]);

    return apiPaginated(
      data.map((a) => ({ ...a, _id: a._id.toString() })),
      page,
      limit,
      total,
      'Assignments retrieved'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Create assignment (Trainer / Admin only)
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'trainer.assignment.create');

    const body = await validateBody(request, createAssignmentSchema);
    const assignmentsCol = await getCollection(COLLECTIONS.ASSIGNMENTS);

    const newAssignment = {
      ...body,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      trainerId: authUser.userId,
      createdAt: new Date(),
    };

    const result = await assignmentsCol.insertOne(newAssignment);
    return apiSuccess({ ...newAssignment, _id: result.insertedId.toString() }, 'Assignment created', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
