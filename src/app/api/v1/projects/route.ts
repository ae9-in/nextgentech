import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { createProjectSchema, validateBody } from '@/lib/validate';

// GET: List projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const projectsCol = await getCollection(COLLECTIONS.PROJECTS);

    const [data, total] = await Promise.all([
      projectsCol.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      projectsCol.countDocuments({}),
    ]);

    return apiPaginated(
      data.map((p) => ({ ...p, _id: p._id.toString() })),
      page,
      limit,
      total,
      'Projects retrieved'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Create project (Trainer / Admin only)
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'trainer.course.manage');

    const body = await validateBody(request, createProjectSchema);
    const projectsCol = await getCollection(COLLECTIONS.PROJECTS);

    const newProject = {
      ...body,
      creatorId: authUser.userId,
      createdAt: new Date(),
    };

    const result = await projectsCol.insertOne(newProject);
    return apiSuccess({ ...newProject, _id: result.insertedId.toString() }, 'Project created', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
