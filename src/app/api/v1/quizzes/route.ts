import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { createQuizSchema, validateBody } from '@/lib/validate';

// GET: List quizzes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);
    const courseId = searchParams.get('courseId');

    const quizzesCol = await getCollection(COLLECTIONS.QUIZZES);
    const filter: Record<string, any> = {};
    if (courseId) filter.courseId = courseId;

    const [data, total] = await Promise.all([
      quizzesCol.find(filter, { projection: { 'questions.correctIndex': 0 } }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      quizzesCol.countDocuments(filter),
    ]);

    return apiPaginated(
      data.map((q) => ({ ...q, _id: q._id.toString() })),
      page,
      limit,
      total,
      'Quizzes retrieved'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Create quiz (Trainer / Admin only)
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'trainer.quiz.create');

    const body = await validateBody(request, createQuizSchema);
    const quizzesCol = await getCollection(COLLECTIONS.QUIZZES);

    const totalPoints = body.questions.reduce((sum, q) => sum + (q.points || 1), 0);

    const newQuiz = {
      ...body,
      totalPoints,
      creatorId: authUser.userId,
      createdAt: new Date(),
    };

    const result = await quizzesCol.insertOne(newQuiz);
    return apiSuccess({ ...newQuiz, _id: result.insertedId.toString() }, 'Quiz created', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
