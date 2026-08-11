import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';

// GET: Single optimized endpoint for Trainer Dashboard
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'trainer.student.view');

    const coursesCol = await getCollection(COLLECTIONS.COURSES);
    const submissionsCol = await getCollection(COLLECTIONS.ASSIGNMENT_SUBMISSIONS);

    const [assignedCourses, pendingGradingQueue] = await Promise.all([
      coursesCol.find({ trainerId: authUser.userId }).toArray(),
      submissionsCol.find({ status: 'SUBMITTED' }).sort({ submittedAt: 1 }).limit(10).toArray(),
    ]);

    const totalStudentsEnrolled = assignedCourses.reduce((sum, c) => sum + (c.studentsEnrolled || 0), 0);

    return apiSuccess({
      assignedCourses: assignedCourses.map((c) => ({
        _id: c._id.toString(),
        title: c.title,
        studentsEnrolled: c.studentsEnrolled || 0,
        category: c.category,
      })),
      totalStudentsEnrolled,
      pendingGradingQueue: pendingGradingQueue.map((s) => ({
        _id: s._id.toString(),
        assignmentId: s.assignmentId,
        assignmentTitle: s.assignmentTitle,
        studentId: s.studentId,
        studentName: s.studentName,
        submissionUrl: s.submissionUrl,
        submittedAt: s.submittedAt,
      })),
    }, 'Trainer dashboard data retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}
