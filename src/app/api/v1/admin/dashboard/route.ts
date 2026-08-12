import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: Single optimized endpoint for Admin Dashboard
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'admin.analytics.read');

    const usersCol = await getCollection(COLLECTIONS.USERS);
    const coursesCol = await getCollection(COLLECTIONS.COURSES);
    const paymentsCol = await getCollection(COLLECTIONS.PAYMENTS);
    const certsCol = await getCollection(COLLECTIONS.CERTIFICATES);

    const [totalStudents, activeStudents, totalCourses, payments, recentRegistrations, totalCertificates] = await Promise.all([
      usersCol.countDocuments({ role: 'STUDENT' }),
      usersCol.countDocuments({ role: 'STUDENT', status: 'ACTIVE' }),
      coursesCol.countDocuments({}),
      paymentsCol.find({ status: 'SUCCESS' }).toArray(),
      usersCol.find({ role: 'STUDENT' }, { projection: { password: 0 } }).sort({ createdAt: -1 }).limit(10).toArray(),
      certsCol.countDocuments({}),
    ]);

    const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    return apiSuccess({
      stats: {
        totalStudents,
        activeStudents,
        totalCourses,
        totalRevenue: `₹${(totalRevenue / 100000).toFixed(1)}L`,
        rawRevenue: totalRevenue,
        totalCertificates,
      },
      recentRegistrations: recentRegistrations.map((u) => ({
        id: `REG-${u._id.toString().slice(-4).toUpperCase()}`,
        name: u.name,
        email: u.email,
        phone: u.phone || 'N/A',
        college: u.college || 'N/A',
        track: u.track || 'Full Stack Development',
        createdAt: u.createdAt,
      })),
    }, 'Admin dashboard analytics retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}
