import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { apiSuccess } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: Single optimized endpoint for Student Dashboard
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    const usersCol = await getCollection(COLLECTIONS.USERS);
    const enrollmentsCol = await getCollection(COLLECTIONS.ENROLLMENTS);
    const assignmentsCol = await getCollection(COLLECTIONS.ASSIGNMENTS);
    const submissionsCol = await getCollection(COLLECTIONS.ASSIGNMENT_SUBMISSIONS);
    const certsCol = await getCollection(COLLECTIONS.CERTIFICATES);
    const notifsCol = await getCollection(COLLECTIONS.NOTIFICATIONS);
    const internshipsCol = await getCollection(COLLECTIONS.INTERNSHIP_APPLICATIONS);

    const [user, enrollments, pendingSubmissions, certs, unreadNotifs, internApps] = await Promise.all([
      usersCol.findOne({ _id: new ObjectId(authUser.userId) }, { projection: { password: 0 } }),
      enrollmentsCol.find({ studentId: authUser.userId }).sort({ enrolledAt: -1 }).toArray(),
      submissionsCol.find({ studentId: authUser.userId }).toArray(),
      certsCol.find({ studentId: authUser.userId }).toArray(),
      notifsCol.countDocuments({ userId: authUser.userId, read: false }),
      internshipsCol.find({ studentId: authUser.userId }).toArray(),
    ]);

    const activeCourse = enrollments[0] || null;

    return apiSuccess({
      profile: user ? { ...user, _id: user._id.toString() } : null,
      stats: {
        enrolledCoursesCount: enrollments.length,
        weeklyHours: user?.weeklyHours || 0,
        aggregateScore: user?.aggregateScore || 0,
        streak: user?.streak || 0,
        xp: user?.xp || 0,
        level: user?.level || 1,
        unreadNotifications: unreadNotifs,
      },
      activeCourse,
      enrollments: enrollments.map((e) => ({ ...e, _id: e._id.toString() })),
      pendingSubmissionsCount: pendingSubmissions.filter((s) => s.status === 'SUBMITTED').length,
      certificatesCount: certs.length,
      activeInternship: internApps[0] || null,
    }, 'Student dashboard data retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}
