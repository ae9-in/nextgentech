/**
 * Database Index Creation Script
 * Run: npx tsx src/lib/db/indexes.ts
 */
import { getDb } from '../db';

async function createIndexes() {
  const db = await getDb();
  console.log('Creating database indexes...\n');

  // ── Users ──────────────────────────────────────────────────────
  await db.collection('users').createIndexes([
    { key: { email: 1 }, unique: true, name: 'idx_users_email' },
    { key: { role: 1 }, name: 'idx_users_role' },
    { key: { status: 1 }, name: 'idx_users_status' },
    { key: { createdAt: -1 }, name: 'idx_users_created' },
  ]);
  console.log('✓ users indexes');

  // ── Refresh Tokens ─────────────────────────────────────────────
  await db.collection('refresh_tokens').createIndexes([
    { key: { userId: 1 }, name: 'idx_refresh_userId' },
    { key: { expiresAt: 1 }, expireAfterSeconds: 0, name: 'idx_refresh_ttl' },
  ]);
  console.log('✓ refresh_tokens indexes');

  // ── Enrollments ────────────────────────────────────────────────
  await db.collection('enrollments').createIndexes([
    { key: { studentId: 1, courseId: 1 }, unique: true, name: 'idx_enrollments_student_course' },
    { key: { studentId: 1 }, name: 'idx_enrollments_student' },
    { key: { courseId: 1 }, name: 'idx_enrollments_course' },
    { key: { status: 1 }, name: 'idx_enrollments_status' },
  ]);
  console.log('✓ enrollments indexes');

  // ── Lesson Progress ────────────────────────────────────────────
  await db.collection('lesson_progress').createIndexes([
    { key: { studentId: 1, lessonId: 1 }, unique: true, name: 'idx_progress_student_lesson' },
    { key: { studentId: 1, courseId: 1 }, name: 'idx_progress_student_course' },
  ]);
  console.log('✓ lesson_progress indexes');

  // ── Courses ────────────────────────────────────────────────────
  await db.collection('courses').createIndexes([
    { key: { published: 1 }, name: 'idx_courses_published' },
    { key: { category: 1 }, name: 'idx_courses_category' },
    { key: { trainerId: 1 }, name: 'idx_courses_trainer' },
  ]);
  console.log('✓ courses indexes');

  // ── Assignments ────────────────────────────────────────────────
  await db.collection('assignments').createIndexes([
    { key: { courseId: 1 }, name: 'idx_assignments_course' },
    { key: { dueDate: 1 }, name: 'idx_assignments_dueDate' },
  ]);
  console.log('✓ assignments indexes');

  // ── Assignment Submissions ─────────────────────────────────────
  await db.collection('assignment_submissions').createIndexes([
    { key: { studentId: 1, assignmentId: 1 }, name: 'idx_submissions_student_assignment' },
    { key: { assignmentId: 1 }, name: 'idx_submissions_assignment' },
    { key: { status: 1 }, name: 'idx_submissions_status' },
  ]);
  console.log('✓ assignment_submissions indexes');

  // ── Quizzes ────────────────────────────────────────────────────
  await db.collection('quizzes').createIndexes([
    { key: { courseId: 1 }, name: 'idx_quizzes_course' },
  ]);
  console.log('✓ quizzes indexes');

  // ── Quiz Attempts ──────────────────────────────────────────────
  await db.collection('quiz_attempts').createIndexes([
    { key: { studentId: 1, quizId: 1 }, name: 'idx_quiz_attempts_student_quiz' },
  ]);
  console.log('✓ quiz_attempts indexes');

  // ── Projects ───────────────────────────────────────────────────
  await db.collection('projects').createIndexes([
    { key: { courseId: 1 }, name: 'idx_projects_course' },
  ]);
  console.log('✓ projects indexes');

  // ── Project Submissions ────────────────────────────────────────
  await db.collection('project_submissions').createIndexes([
    { key: { studentId: 1, projectId: 1 }, name: 'idx_project_subs_student' },
    { key: { status: 1 }, name: 'idx_project_subs_status' },
  ]);
  console.log('✓ project_submissions indexes');

  // ── Internships ────────────────────────────────────────────────
  await db.collection('internships').createIndexes([
    { key: { status: 1 }, name: 'idx_internships_status' },
  ]);
  console.log('✓ internships indexes');

  // ── Internship Applications ────────────────────────────────────
  await db.collection('internship_applications').createIndexes([
    { key: { studentId: 1, internshipId: 1 }, unique: true, name: 'idx_intern_apps_student_intern' },
    { key: { status: 1 }, name: 'idx_intern_apps_status' },
  ]);
  console.log('✓ internship_applications indexes');

  // ── Certificates ───────────────────────────────────────────────
  await db.collection('certificates').createIndexes([
    { key: { certificateId: 1 }, unique: true, name: 'idx_certs_certId' },
    { key: { studentId: 1 }, name: 'idx_certs_student' },
    { key: { verificationHash: 1 }, name: 'idx_certs_verification' },
  ]);
  console.log('✓ certificates indexes');

  // ── Notifications ──────────────────────────────────────────────
  await db.collection('notifications').createIndexes([
    { key: { userId: 1, createdAt: -1 }, name: 'idx_notifications_user_time' },
    { key: { userId: 1, read: 1 }, name: 'idx_notifications_user_read' },
  ]);
  console.log('✓ notifications indexes');

  // ── Payments ───────────────────────────────────────────────────
  await db.collection('payments').createIndexes([
    { key: { userId: 1, createdAt: -1 }, name: 'idx_payments_user_time' },
    { key: { status: 1 }, name: 'idx_payments_status' },
    { key: { orderId: 1 }, name: 'idx_payments_order' },
  ]);
  console.log('✓ payments indexes');

  // ── Orders ─────────────────────────────────────────────────────
  await db.collection('orders').createIndexes([
    { key: { userId: 1 }, name: 'idx_orders_user' },
    { key: { idempotencyKey: 1 }, unique: true, sparse: true, name: 'idx_orders_idempotency' },
  ]);
  console.log('✓ orders indexes');

  // ── Community Posts ────────────────────────────────────────────
  await db.collection('community_posts').createIndexes([
    { key: { createdAt: -1 }, name: 'idx_posts_time' },
    { key: { category: 1 }, name: 'idx_posts_category' },
    { key: { authorId: 1 }, name: 'idx_posts_author' },
  ]);
  console.log('✓ community_posts indexes');

  // ── Job Listings ───────────────────────────────────────────────
  await db.collection('job_listings').createIndexes([
    { key: { status: 1, createdAt: -1 }, name: 'idx_jobs_status_time' },
  ]);
  console.log('✓ job_listings indexes');

  // ── Audit Logs ─────────────────────────────────────────────────
  await db.collection('audit_logs').createIndexes([
    { key: { actor: 1, timestamp: -1 }, name: 'idx_audit_actor_time' },
    { key: { entity: 1, entityId: 1 }, name: 'idx_audit_entity' },
    { key: { timestamp: -1 }, name: 'idx_audit_time' },
  ]);
  console.log('✓ audit_logs indexes');

  console.log('\n✅ All indexes created successfully.');
  process.exit(0);
}

createIndexes().catch((err) => {
  console.error('Failed to create indexes:', err);
  process.exit(1);
});
