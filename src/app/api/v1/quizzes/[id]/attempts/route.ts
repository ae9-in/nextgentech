import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { submitQuizAttemptSchema, validateBody } from '@/lib/validate';

// POST: Submit quiz attempt and score strictly on backend
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);
    const body = await validateBody(request, submitQuizAttemptSchema);

    const quizzesCol = await getCollection(COLLECTIONS.QUIZZES);
    const attemptsCol = await getCollection(COLLECTIONS.QUIZ_ATTEMPTS);

    const quiz = await quizzesCol.findOne({ _id: new ObjectId(params.id) });
    if (!quiz) {
      return apiError('NOT_FOUND', 'Quiz not found', 404);
    }

    // SERVER-SIDE SCORING VALIDATION - DO NOT TRUST FRONTEND SCORES
    let earnedPoints = 0;
    const totalPoints = quiz.totalPoints || quiz.questions.length;

    const evaluatedAnswers = body.answers.map((userAns) => {
      const question = quiz.questions[userAns.questionIndex];
      const isCorrect = question && question.correctIndex === userAns.selectedIndex;
      const points = isCorrect ? (question.points || 1) : 0;
      earnedPoints += points;

      return {
        questionIndex: userAns.questionIndex,
        selectedIndex: userAns.selectedIndex,
        isCorrect,
        points,
      };
    });

    const percentage = Math.round((earnedPoints / totalPoints) * 100);
    const passed = percentage >= 70;

    const attemptRecord = {
      quizId: params.id,
      quizTitle: quiz.title,
      studentId: authUser.userId,
      studentName: authUser.name,
      answers: evaluatedAnswers,
      earnedPoints,
      totalPoints,
      percentage,
      passed,
      submittedAt: new Date(),
    };

    const result = await attemptsCol.insertOne(attemptRecord);

    return apiSuccess({
      _id: result.insertedId.toString(),
      quizTitle: quiz.title,
      earnedPoints,
      totalPoints,
      percentage,
      passed,
    }, passed ? 'Quiz passed! 🎉' : 'Quiz completed. Keep practicing!');
  } catch (error) {
    return handleApiError(error);
  }
}
