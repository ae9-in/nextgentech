import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const certsCol = await getCollection(COLLECTIONS.CERTIFICATES);
    const certificate = await certsCol.findOne({ certificateId: params.id });

    if (!certificate) {
      return apiError('NOT_FOUND', 'Invalid or unverified certificate ID', 404);
    }

    return apiSuccess({
      certificateId: certificate.certificateId,
      studentName: certificate.studentName,
      programName: certificate.programName,
      programType: certificate.programType,
      issueDate: certificate.issueDate,
      status: certificate.status,
      verificationHash: certificate.verificationHash,
    }, 'Certificate verified successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
