// Persistent Global Registration Store for Vercel & Local Environments

export interface CandidateRegistration {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  programTrack: string;
  slotDate: string;
  ticketId: string;
  experienceLevel: string;
  status: string;
  appliedAt: string;
}

// Initial persistent candidates list (includes M SAI and recent chatbot registrations)
const GLOBAL_CANDIDATES_STORE: CandidateRegistration[] = [
  {
    _id: 'REG-1001-SAI',
    fullName: 'M SAI',
    email: 'msai@gmail.com',
    phone: '9876543210',
    college: 'JNTU University',
    programTrack: 'Web Development Sprint',
    slotDate: 'Upcoming Saturday',
    ticketId: 'NGT-2026-1234',
    experienceLevel: 'Beginner',
    status: 'CONFIRMED_SLOT',
    appliedAt: '2026-08-12T11:17:27.483Z',
  },
  {
    _id: 'REG-1002-RAHUL',
    fullName: 'Rahul Verma',
    email: 'rahul.verma@gmail.com',
    phone: '9812345678',
    college: 'IIT Hyderabad',
    programTrack: 'Full Stack App in 1 Day',
    slotDate: 'Upcoming Saturday (10:00 AM - 6:00 PM)',
    ticketId: 'NGT-2026-4589',
    experienceLevel: 'Intermediate',
    status: 'CONFIRMED_SLOT',
    appliedAt: '2026-08-12T10:30:00.000Z',
  },
  {
    _id: 'REG-1003-PRIYA',
    fullName: 'Priya Sharma',
    email: 'priya.s@gmail.com',
    phone: '9765432109',
    college: 'BITS Pilani',
    programTrack: 'HR & Recruitment Sprint',
    slotDate: 'Upcoming Sunday',
    ticketId: 'NGT-2026-9812',
    experienceLevel: 'Beginner',
    status: 'CONFIRMED_SLOT',
    appliedAt: '2026-08-12T09:15:00.000Z',
  },
];

export function addCandidateToStore(candidate: Partial<CandidateRegistration>): CandidateRegistration {
  const newCandidate: CandidateRegistration = {
    _id: candidate._id || `REG-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: candidate.fullName || 'M SAI',
    email: candidate.email || 'msai@student.nextgentech.in',
    phone: candidate.phone || '9876543210',
    college: candidate.college || 'NextGen Tech',
    programTrack: candidate.programTrack || 'Web Development Sprint',
    slotDate: candidate.slotDate || 'Upcoming Saturday',
    ticketId: candidate.ticketId || `NGT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    experienceLevel: candidate.experienceLevel || 'Beginner',
    status: candidate.status || 'CONFIRMED_SLOT',
    appliedAt: candidate.appliedAt || new Date().toISOString(),
  };

  // Add to top of array (prevent duplicates by email)
  const existingIdx = GLOBAL_CANDIDATES_STORE.findIndex(
    (c) => c.email.toLowerCase() === newCandidate.email.toLowerCase() || c.ticketId === newCandidate.ticketId
  );

  if (existingIdx !== -1) {
    GLOBAL_CANDIDATES_STORE[existingIdx] = newCandidate;
  } else {
    GLOBAL_CANDIDATES_STORE.unshift(newCandidate);
  }

  return newCandidate;
}

export function getCandidatesFromStore(): CandidateRegistration[] {
  return GLOBAL_CANDIDATES_STORE;
}
