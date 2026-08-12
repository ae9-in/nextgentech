import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import { requirePermission } from '@/lib/rbac';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { applyInternshipSchema, validateBody } from '@/lib/validate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await authenticateRequest(request);
    requirePermission(authUser, 'student.internship.apply');

    const body = await validateBody(request, applyInternshipSchema);
    const internshipsCol = await getCollection(COLLECTIONS.INTERNSHIPS);
    const appsCol = await getCollection(COLLECTIONS.INTERNSHIP_APPLICATIONS);

    const internship = await internshipsCol.findOne({ _id: new ObjectId(params.id) });
    if (!internship) {
      return apiError('NOT_FOUND', 'Internship not found', 404);
    }

    // Duplicate check
    const existing = await appsCol.findOne({ studentId: authUser.userId, internshipId: params.id });
    if (existing) {
      return apiError('CONFLICT', 'You have already applied for this internship', 409);
    }

    const application = {
      internshipId: params.id,
      internshipTitle: internship.title,
      studentId: authUser.userId,
      studentName: authUser.name,
      studentEmail: authUser.email,
      coverLetter: body.coverLetter || '',
      status: 'APPROVED', // Direct ENROLLED status for student UX
      appliedAt: new Date(),
    };

    const result = await appsCol.insertOne(application);

    // Update count on internship document
    await internshipsCol.updateOne(
      { _id: new ObjectId(params.id) },
      { $inc: { applicationsCount: 1, enrolledCount: 1 } }
    );

    return apiSuccess({ ...application, _id: result.insertedId.toString() }, 'Internship application submitted & approved!', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
