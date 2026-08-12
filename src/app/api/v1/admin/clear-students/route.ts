import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { apiSuccess } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { clearCandidatesStore } from '@/lib/registrationsStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    // Clear persistent store in memory
    clearCandidatesStore();

    let deletedLeadsCount = 0;
    let deletedUsersCount = 0;
    let deletedStudentsCount = 0;
    let deletedCertificatesCount = 0;
    let deletedEnrollmentsCount = 0;

    try {
      const [leadsCol, usersCol, studentsCol, certsCol, enrollCol] = await Promise.all([
        getCollection(COLLECTIONS.LEADS),
        getCollection(COLLECTIONS.USERS),
        getCollection(COLLECTIONS.STUDENTS),
        getCollection(COLLECTIONS.CERTIFICATES),
        getCollection(COLLECTIONS.ENROLLMENTS),
      ]);

      const deleteLeads = await leadsCol.deleteMany({});
      const deleteUsers = await usersCol.deleteMany({ role: 'STUDENT' });
      const deleteStudents = await studentsCol.deleteMany({});
      const deleteCerts = await certsCol.deleteMany({});
      const deleteEnrollments = await enrollCol.deleteMany({});

      deletedLeadsCount = deleteLeads.deletedCount;
      deletedUsersCount = deleteUsers.deletedCount;
      deletedStudentsCount = deleteStudents.deletedCount;
      deletedCertificatesCount = deleteCerts.deletedCount;
      deletedEnrollmentsCount = deleteEnrollments.deletedCount;
    } catch (dbErr) {
      console.error('MongoDB clear error (cleared in-memory store):', dbErr);
    }

    return apiSuccess(
      {
        deletedLeadsCount,
        deletedUsersCount,
        deletedStudentsCount,
        deletedCertificatesCount,
        deletedEnrollmentsCount,
      },
      'All student data & registrations successfully cleared from system',
      200
    );
  } catch (error) {
    return handleApiError(error);
  }
}
