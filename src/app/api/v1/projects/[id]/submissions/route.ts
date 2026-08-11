import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { submitProjectSchema, gradeProjectSchema, validateBody } from '@/lib/validate';

// POST: Student submits capstone project
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'student.project.submit');

    const body = await validateBody(request, submitProjectSchema);
    const projectsCol = await getCollection(COLLECTIONS.PROJECTS);
    const subsCol = await getCollection(COLLECTIONS.PROJECT_SUBMISSIONS);

    const project = await projectsCol.findOne({ _id: new ObjectId(params.id) });
    if (!project) {
      return apiError('NOT_FOUND', 'Project not found', 404);
    }

    const submission = {
      projectId: params.id,
      projectTitle: project.title,
      studentId: authUser.userId,
      studentName: authUser.name,
      repoUrl: body.repoUrl,
      demoUrl: body.demoUrl || '',
      notes: body.notes || '',
      status: 'SUBMITTED',
      score: null,
      feedback: null,
      submittedAt: new Date(),
    };

    const result = await subsCol.updateOne(
      { projectId: params.id, studentId: authUser.userId },
      { $set: submission },
      { upsert: true }
    );

    return apiSuccess(submission, 'Project submitted for mentor evaluation', 201);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH: Trainer reviews project submission
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'trainer.project.review');

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return apiError('VALIDATION_ERROR', 'studentId parameter required', 400);
    }

    const body = await validateBody(request, gradeProjectSchema);
    const subsCol = await getCollection(COLLECTIONS.PROJECT_SUBMISSIONS);

    const result = await subsCol.findOneAndUpdate(
      { projectId: params.id, studentId },
      {
        $set: {
          score: body.score,
          feedback: body.feedback || '',
          status: body.status,
          reviewedBy: authUser.userId,
          reviewedByName: authUser.name,
          reviewedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return apiError('NOT_FOUND', 'Project submission not found', 404);
    }

    return apiSuccess({ ...result, _id: result._id.toString() }, 'Project evaluation saved');
  } catch (error) {
    return handleApiError(error);
  }
}
