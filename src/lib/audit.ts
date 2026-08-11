import { getCollection, COLLECTIONS } from './db';

// ─── Audit Log Entry ───────────────────────────────────────────────
export interface AuditEntry {
  actor: string;       // userId
  actorRole: string;
  actorName: string;
  action: string;      // e.g., 'CREATE_COURSE', 'GRADE_ASSIGNMENT'
  entity: string;      // e.g., 'course', 'assignment_submission'
  entityId: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  timestamp: Date;
}

// ─── Create Audit Log ──────────────────────────────────────────────
export async function createAuditLog(entry: Omit<AuditEntry, 'timestamp'>): Promise<void> {
  try {
    const col = await getCollection(COLLECTIONS.AUDIT_LOGS);
    await col.insertOne({
      ...entry,
      timestamp: new Date(),
    });
  } catch (error) {
    // Audit logging should never break the main flow
    console.error('[Audit] Failed to create audit log:', error);
  }
}

// ─── Predefined Audit Actions ──────────────────────────────────────
export const AUDIT_ACTIONS = {
  // Auth
  USER_REGISTERED: 'USER_REGISTERED',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',

  // Users
  USER_UPDATED: 'USER_UPDATED',
  USER_SUSPENDED: 'USER_SUSPENDED',
  USER_ACTIVATED: 'USER_ACTIVATED',
  USER_DELETED: 'USER_DELETED',

  // Courses
  COURSE_CREATED: 'COURSE_CREATED',
  COURSE_UPDATED: 'COURSE_UPDATED',
  COURSE_PUBLISHED: 'COURSE_PUBLISHED',
  COURSE_DELETED: 'COURSE_DELETED',

  // Enrollments
  STUDENT_ENROLLED: 'STUDENT_ENROLLED',
  STUDENT_UNENROLLED: 'STUDENT_UNENROLLED',

  // Progress
  LESSON_COMPLETED: 'LESSON_COMPLETED',
  COURSE_COMPLETED: 'COURSE_COMPLETED',

  // Assignments
  ASSIGNMENT_CREATED: 'ASSIGNMENT_CREATED',
  ASSIGNMENT_SUBMITTED: 'ASSIGNMENT_SUBMITTED',
  ASSIGNMENT_GRADED: 'ASSIGNMENT_GRADED',

  // Quizzes
  QUIZ_CREATED: 'QUIZ_CREATED',
  QUIZ_ATTEMPTED: 'QUIZ_ATTEMPTED',

  // Projects
  PROJECT_CREATED: 'PROJECT_CREATED',
  PROJECT_SUBMITTED: 'PROJECT_SUBMITTED',
  PROJECT_REVIEWED: 'PROJECT_REVIEWED',

  // Internships
  INTERNSHIP_CREATED: 'INTERNSHIP_CREATED',
  INTERNSHIP_APPLICATION: 'INTERNSHIP_APPLICATION',
  INTERNSHIP_APPROVED: 'INTERNSHIP_APPROVED',

  // Certificates
  CERTIFICATE_ISSUED: 'CERTIFICATE_ISSUED',
  CERTIFICATE_REVOKED: 'CERTIFICATE_REVOKED',

  // Payments
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  REFUND_ISSUED: 'REFUND_ISSUED',

  // Admin
  SETTINGS_UPDATED: 'SETTINGS_UPDATED',
} as const;
