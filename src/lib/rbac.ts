import { AuthUser } from './auth';
import { ForbiddenError } from './errors';

// ─── Role Definitions ──────────────────────────────────────────────
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  TRAINER: 'TRAINER',
  COUNSELLOR: 'COUNSELLOR',
  FINANCE: 'FINANCE',
  STUDENT: 'STUDENT',
  COLLEGE_ADMIN: 'COLLEGE_ADMIN',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// ─── Permission Definitions ────────────────────────────────────────
const PERMISSIONS: Record<string, string[]> = {
  // Student permissions
  'student.course.read': [ROLES.STUDENT, ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'student.course.enroll': [ROLES.STUDENT],
  'student.assignment.submit': [ROLES.STUDENT],
  'student.quiz.attempt': [ROLES.STUDENT],
  'student.project.submit': [ROLES.STUDENT],
  'student.internship.apply': [ROLES.STUDENT],
  'student.profile.read': [ROLES.STUDENT, ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'student.profile.update': [ROLES.STUDENT],
  'student.certificate.read': [ROLES.STUDENT, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'student.notification.read': [ROLES.STUDENT, ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'student.community.post': [ROLES.STUDENT, ROLES.TRAINER],
  'student.job.read': [ROLES.STUDENT, ROLES.ADMIN, ROLES.SUPER_ADMIN],

  // Trainer permissions
  'trainer.course.manage': [ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'trainer.assignment.create': [ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'trainer.assignment.grade': [ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'trainer.quiz.create': [ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'trainer.project.review': [ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'trainer.student.view': [ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'trainer.liveclass.manage': [ROLES.TRAINER, ROLES.ADMIN, ROLES.SUPER_ADMIN],

  // Admin permissions
  'admin.user.manage': [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'admin.student.manage': [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'admin.course.manage': [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'admin.payment.manage': [ROLES.ADMIN, ROLES.FINANCE, ROLES.SUPER_ADMIN],
  'admin.certificate.manage': [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'admin.internship.manage': [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'admin.job.manage': [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'admin.analytics.read': [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'admin.audit.read': [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'admin.notification.send': [ROLES.ADMIN, ROLES.SUPER_ADMIN],

  // Super Admin permissions
  'superadmin.system.manage': [ROLES.SUPER_ADMIN],
  'superadmin.role.assign': [ROLES.SUPER_ADMIN],

  // College Admin permissions
  'college.students.view': [ROLES.COLLEGE_ADMIN, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  'college.analytics.read': [ROLES.COLLEGE_ADMIN, ROLES.ADMIN, ROLES.SUPER_ADMIN],
};

// ─── Check Permission ──────────────────────────────────────────────
export function hasPermission(user: AuthUser, permission: string): boolean {
  const allowedRoles = PERMISSIONS[permission];
  if (!allowedRoles) return false;
  return allowedRoles.includes(user.role);
}

// ─── Require Permission (throws if denied) ─────────────────────────
export function requirePermission(user: AuthUser, permission: string): void {
  if (!hasPermission(user, permission)) {
    throw new ForbiddenError(
      `Permission '${permission}' denied for role '${user.role}'`,
    );
  }
}

// ─── Check Multiple Permissions (ANY) ──────────────────────────────
export function hasAnyPermission(user: AuthUser, permissions: string[]): boolean {
  return permissions.some((p) => hasPermission(user, p));
}

// ─── Check if user is admin or above ───────────────────────────────
export function isAdmin(user: AuthUser): boolean {
  return user.role === ROLES.ADMIN || user.role === ROLES.SUPER_ADMIN;
}

export function isTrainerOrAbove(user: AuthUser): boolean {
  return user.role === ROLES.TRAINER || user.role === ROLES.ADMIN || user.role === ROLES.SUPER_ADMIN;
}
