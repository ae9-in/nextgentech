import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// POST: Public application submission from "Join NextGen Tech" modal / 1-Day slot booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fullName = (body.fullName || 'M SAI').trim();
    const email = (body.email || `msai_${Date.now()}@student.nextgentech.in`).trim();
    const phone = (body.phone || '+91 9876543210').trim();
    const college = (body.college || 'NextGen Tech Student').trim();
    const programTrack = (body.programTrack || 'Web Development Sprint').trim();
    const slotDate = (body.slotDate || 'Upcoming Saturday').trim();
    const ticketId = body.ticketId || `NGT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const experienceLevel = body.experienceLevel || 'Beginner';

    const leadsCol = await getCollection(COLLECTIONS.LEADS);
    const usersCol = await getCollection(COLLECTIONS.USERS);

    const leadDoc = {
      fullName,
      email,
      phone,
      college: college || 'N/A',
      programTrack: programTrack || 'Full Stack App in 1 Day',
      slotDate: slotDate || 'Upcoming Saturday (10:00 AM - 6:00 PM)',
      ticketId: ticketId || `NGT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      experienceLevel: experienceLevel || 'Beginner',
      status: 'CONFIRMED_SLOT',
      appliedAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await leadsCol.insertOne(leadDoc);

    // Also upsert into users collection so student is visible in Admin Student Roster
    const existingUser = await usersCol.findOne({ email });
    if (!existingUser) {
      await usersCol.insertOne({
        name: fullName,
        email,
        phone,
        college: college || 'N/A',
        track: programTrack || 'Full Stack Development',
        role: 'STUDENT',
        status: 'ACTIVE',
        experienceLevel: experienceLevel || 'Beginner',
        enrolledCoursesCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      await usersCol.updateOne(
        { email },
        {
          $set: {
            name: fullName,
            phone: phone || existingUser.phone,
            college: college || existingUser.college,
            track: programTrack || existingUser.track,
            updatedAt: new Date(),
          },
        }
      );
    }

    return apiSuccess(
      { id: result.insertedId.toString(), ...leadDoc },
      'Application received & stored in Admin Dashboard',
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// GET: Retrieve applications for Admin Dashboard
export async function GET(request: NextRequest) {
  try {
    const leadsCol = await getCollection(COLLECTIONS.LEADS);
    const leads = await leadsCol.find({}).sort({ appliedAt: -1 }).toArray();

    const formatted = leads.map((l) => ({
      _id: l._id.toString(),
      fullName: l.fullName,
      email: l.email,
      phone: l.phone,
      college: l.college,
      programTrack: l.programTrack,
      slotDate: l.slotDate || 'Upcoming Saturday',
      ticketId: l.ticketId || `NGT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      experienceLevel: l.experienceLevel,
      status: l.status || 'CONFIRMED_SLOT',
      appliedAt: l.appliedAt || new Date(),
    }));

    return apiSuccess(formatted, 'Applications retrieved');
  } catch (error) {
    return handleApiError(error);
  }
}
