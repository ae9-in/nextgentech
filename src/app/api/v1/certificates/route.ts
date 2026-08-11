import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { apiSuccess, parsePagination, apiPaginated } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';

// GET: List student certificates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);
    const studentId = searchParams.get('studentId');

    const certsCol = await getCollection(COLLECTIONS.CERTIFICATES);
    const filter: Record<string, any> = {};
    if (studentId) filter.studentId = studentId;

    const [data, total] = await Promise.all([
      certsCol.find(filter).sort({ issueDate: -1 }).skip(skip).limit(limit).toArray(),
      certsCol.countDocuments(filter),
    ]);

    return apiPaginated(
      data.map((c) => ({ ...c, _id: c._id.toString() })),
      page,
      limit,
      total,
      'Certificates retrieved'
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST: Issue/Generate Custom Verified Certificate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, programName, certificateType, issueDate, customSignature } = body;

    const certName = studentName || 'Sai Varshith';
    const trackName = programName || '1-Day Full Stack MERN Experience';
    const certType = certificateType || '1-Day Experience Credential';

    const certsCol = await getCollection(COLLECTIONS.CERTIFICATES);

    // Unique certificate ID generator e.g. NGT-CERT-2026-892173
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const certificateId = `NGT-CERT-${new Date().getFullYear()}-${randomNum}`;
    const verificationHash = Buffer.from(`${certificateId}-${certName}-${Date.now()}`).toString('hex');

    const newCertificate = {
      certificateId,
      studentName: certName,
      programName: trackName,
      certificateType: certType,
      issueDate: issueDate ? new Date(issueDate) : new Date(),
      status: 'ISSUED',
      customSignature: customSignature || 'NextGen Tech Certification Authority',
      verificationHash,
      createdAt: new Date(),
    };

    const result = await certsCol.insertOne(newCertificate);

    return apiSuccess(
      { ...newCertificate, _id: result.insertedId.toString() },
      `Certificate ${certificateId} generated successfully!`,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
