import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { submitAssignmentSchema, gradeAssignmentSchema, validateBody } from '@/lib/validate';
import { createAuditLog, AUDIT_ACTIONS } from '@/lib/audit';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);
    const submissionsCol = await getCollection(COLLECTIONS.ASSIGNMENT_SUBMISSIONS);

    const filter: Record<string, any> = { assignmentId: params.id };
    if (authUser.role === 'STUDENT') {
      filter.studentId = authUser.userId;
    }

    const data = await submissionsCol.find(filter).sort({ submittedAt: -1 }).toArray();

    return apiSuccess(
      data.map((s) => ({ ...s, _id: s._id.toString() })),
      'Submissions retrieved'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Student submits assignment
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'student.assignment.submit');

    const body = await validateBody(request, submitAssignmentSchema);
    const assignmentsCol = await getCollection(COLLECTIONS.ASSIGNMENTS);
    const submissionsCol = await getCollection(COLLECTIONS.ASSIGNMENT_SUBMISSIONS);
    const usersCol = await getCollection(COLLECTIONS.USERS);

    const assignment = await assignmentsCol.findOne({ _id: new ObjectId(params.id) });
    if (!assignment) {
      return apiError('NOT_FOUND', 'Assignment not found', 404);
    }

    const submission = {
      assignmentId: params.id,
      assignmentTitle: assignment.title,
      studentId: authUser.userId,
      studentName: authUser.name,
      submissionUrl: body.submissionUrl,
      notes: body.notes || '',
      status: 'SUBMITTED', // PENDING -> SUBMITTED -> UNDER_REVIEW -> APPROVED / REJECTED
      score: null,
      feedback: null,
      submittedAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await submissionsCol.updateOne(
      { assignmentId: params.id, studentId: authUser.userId },
      { $set: submission },
      { upsert: true }
    );

    // Increment student XP (+150 XP) and real-time streak
    await usersCol.updateOne(
      { _id: new ObjectId(authUser.userId) },
      { $inc: { xp: 150, streak: 1 } }
    );

    await createAuditLog({
      actor: authUser.userId,
      actorRole: authUser.role,
      actorName: authUser.name,
      action: AUDIT_ACTIONS.ASSIGNMENT_SUBMITTED,
      entity: 'assignment_submission',
      entityId: params.id,
    });

    return apiSuccess(submission, 'Assignment submitted successfully (+150 XP)', 201);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH: Trainer grades submission
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'trainer.assignment.grade');

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return apiError('VALIDATION_ERROR', 'studentId parameter is required to grade submission', 400);
    }

    const body = await validateBody(request, gradeAssignmentSchema);
    const submissionsCol = await getCollection(COLLECTIONS.ASSIGNMENT_SUBMISSIONS);
    const usersCol = await getCollection(COLLECTIONS.USERS);

    const result = await submissionsCol.findOneAndUpdate(
      { assignmentId: params.id, studentId },
      {
        $set: {
          score: body.score,
          feedback: body.feedback || '',
          status: body.status,
          gradedBy: authUser.userId,
          gradedByName: authUser.name,
          gradedAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return apiError('NOT_FOUND', 'Submission not found', 404);
    }

    // Recalculate student aggregate score from all graded submissions
    const allGraded = await submissionsCol.find({ studentId, score: { $ne: null } }).toArray();
    if (allGraded.length > 0) {
      const avgScore = Math.round(
        allGraded.reduce((sum, s) => sum + (s.score || 0), 0) / allGraded.length
      );
      await usersCol.updateOne(
        { _id: new ObjectId(studentId) },
        { $set: { aggregateScore: avgScore } }
      );
    }

    await createAuditLog({
      actor: authUser.userId,
      actorRole: authUser.role,
      actorName: authUser.name,
      action: AUDIT_ACTIONS.ASSIGNMENT_GRADED,
      entity: 'assignment_submission',
      entityId: params.id,
      metadata: { studentId, score: body.score, status: body.status },
    });

    return apiSuccess({ ...result, _id: result._id.toString() }, 'Submission graded successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
