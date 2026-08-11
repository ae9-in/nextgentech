import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { apiSuccess } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const [leadsCol, usersCol, studentsCol, certsCol, enrollCol] = await Promise.all([
      getCollection(COLLECTIONS.LEADS),
      getCollection(COLLECTIONS.USERS),
      getCollection(COLLECTIONS.STUDENTS),
      getCollection(COLLECTIONS.CERTIFICATES),
      getCollection(COLLECTIONS.ENROLLMENTS),
    ]);

    // Wipe all test student leads, student accounts, and test certificates
    const deleteLeads = await leadsCol.deleteMany({});
    const deleteUsers = await usersCol.deleteMany({ role: 'STUDENT' });
    const deleteStudents = await studentsCol.deleteMany({});
    const deleteCerts = await certsCol.deleteMany({});
    const deleteEnrollments = await enrollCol.deleteMany({});

    return apiSuccess(
      {
        deletedLeadsCount: deleteLeads.deletedCount,
        deletedUsersCount: deleteUsers.deletedCount,
        deletedStudentsCount: deleteStudents.deletedCount,
        deletedCertificatesCount: deleteCerts.deletedCount,
        deletedEnrollmentsCount: deleteEnrollments.deletedCount,
      },
      'All student data successfully cleared from database',
      200
    );
  } catch (error) {
    return handleApiError(error);
  }
}
