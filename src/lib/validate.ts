import { z } from 'zod';

// ─── Common Validators ─────────────────────────────────────────────
const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID format');
const email = z.string().email('Invalid email address').toLowerCase().trim();
const password = z.string().min(6, 'Password must be at least 6 characters').max(128);
const phone = z.string().min(10, 'Phone must be at least 10 digits').max(15).optional();

// ─── Auth Schemas ──────────────────────────────────────────────────
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  email,
  password,
  role: z.enum(['STUDENT', 'TRAINER', 'ADMIN', 'COLLEGE_ADMIN']).default('STUDENT'),
  college: z.string().max(200).optional(),
  phone,
  track: z.string().max(100).optional(),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// ─── User Schemas ──────────────────────────────────────────────────
export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  college: z.string().max(200).optional(),
  phone: phone,
  track: z.string().max(100).optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'INACTIVE']).optional(),
});

// ─── Course Schemas ────────────────────────────────────────────────
export const createCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200).trim(),
  description: z.string().max(2000).optional(),
  category: z.string().max(100),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
  price: z.number().min(0).default(0),
  originalPrice: z.number().min(0).optional(),
  duration: z.string().max(100).optional(),
  techStack: z.array(z.string().max(50)).max(20).optional(),
  modules: z.array(
    z.object({
      title: z.string().min(1).max(200),
      order: z.number().int().min(0),
      lessons: z.array(
        z.object({
          title: z.string().min(1).max(200),
          type: z.enum(['video', 'text', 'quiz', 'assignment']).default('video'),
          duration: z.string().max(50).optional(),
          order: z.number().int().min(0),
        }),
      ).optional(),
    }),
  ).optional(),
  published: z.boolean().default(false),
});

export const updateCourseSchema = createCourseSchema.partial();

// ─── Enrollment Schema ─────────────────────────────────────────────
export const createEnrollmentSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  studentId: z.string().optional(), // Auto-filled from auth token for students
});

// ─── Progress Schema ───────────────────────────────────────────────
export const updateProgressSchema = z.object({
  courseId: z.string().min(1),
  moduleId: z.string().min(1),
  lessonId: z.string().min(1),
  completed: z.boolean().default(true),
  watchPercentage: z.number().min(0).max(100).optional(),
});

// ─── Assignment Schemas ────────────────────────────────────────────
export const createAssignmentSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  instructions: z.string().min(10).max(5000),
  courseId: z.string().min(1),
  moduleId: z.string().optional(),
  dueDate: z.string().optional(), // ISO date string
  maxScore: z.number().int().min(1).max(1000).default(100),
});

export const submitAssignmentSchema = z.object({
  submissionUrl: z.string().url('Must be a valid URL'),
  notes: z.string().max(2000).optional(),
});

export const gradeAssignmentSchema = z.object({
  score: z.number().min(0).max(1000),
  feedback: z.string().max(5000).optional(),
  status: z.enum(['APPROVED', 'REJECTED', 'RESUBMISSION_REQUIRED']),
});

// ─── Quiz Schemas ──────────────────────────────────────────────────
export const createQuizSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  courseId: z.string().min(1),
  moduleId: z.string().optional(),
  category: z.string().max(100).default('Course quizzes'),
  timeLimit: z.number().int().min(1).max(180).default(30), // minutes
  questions: z.array(
    z.object({
      question: z.string().min(1).max(1000),
      options: z.array(z.string().max(500)).min(2).max(6),
      correctIndex: z.number().int().min(0),
      points: z.number().min(1).default(1),
    }),
  ).min(1).max(100),
});

export const submitQuizAttemptSchema = z.object({
  answers: z.array(
    z.object({
      questionIndex: z.number().int().min(0),
      selectedIndex: z.number().int().min(0),
    }),
  ),
});

// ─── Project Schemas ───────────────────────────────────────────────
export const createProjectSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  description: z.string().max(5000),
  courseId: z.string().optional(),
  techStack: z.string().max(200).optional(),
  milestones: z.array(
    z.object({
      title: z.string().min(1).max(200),
      description: z.string().max(1000).optional(),
      order: z.number().int().min(0),
    }),
  ).optional(),
});

export const submitProjectSchema = z.object({
  repoUrl: z.string().url('Must be a valid URL'),
  demoUrl: z.string().url().optional(),
  notes: z.string().max(2000).optional(),
});

export const gradeProjectSchema = z.object({
  score: z.number().min(0).max(100),
  feedback: z.string().max(5000).optional(),
  status: z.enum(['APPROVED', 'REJECTED', 'REVISION_NEEDED']),
});

// ─── Internship Schemas ────────────────────────────────────────────
export const createInternshipSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  track: z.string().max(100),
  duration: z.string().max(100),
  description: z.string().max(5000).optional(),
  skills: z.array(z.string().max(50)).max(20).optional(),
  mentorName: z.string().max(100).optional(),
  price: z.number().min(0).default(0),
  maxStudents: z.number().int().min(1).default(50),
});

export const applyInternshipSchema = z.object({
  coverLetter: z.string().max(2000).optional(),
});

// ─── Certificate Schemas ───────────────────────────────────────────
export const issueCertificateSchema = z.object({
  studentId: z.string().min(1),
  programType: z.enum(['COURSE', 'INTERNSHIP', 'BOOTCAMP', 'WORKSHOP']),
  programId: z.string().min(1),
  programName: z.string().min(1).max(200),
});

// ─── Notification Schema ───────────────────────────────────────────
export const createNotificationSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1).max(200),
  message: z.string().max(1000),
  type: z.enum(['INFO', 'SUCCESS', 'WARNING', 'ACTION_REQUIRED']).default('INFO'),
  link: z.string().max(500).optional(),
});

// ─── Community Post Schema ─────────────────────────────────────────
export const createPostSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  content: z.string().min(10).max(5000),
  category: z.string().max(100).default('General'),
});

// ─── Job Listing Schema ────────────────────────────────────────────
export const createJobSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  company: z.string().min(1).max(200),
  location: z.string().max(200).optional(),
  type: z.enum(['Full-time', 'Part-time', 'Internship', 'Contract']).default('Full-time'),
  description: z.string().max(5000),
  requirements: z.array(z.string().max(200)).optional(),
  salary: z.string().max(100).optional(),
  applyUrl: z.string().url().optional(),
});

// ─── Payment Schema ────────────────────────────────────────────────
export const createOrderSchema = z.object({
  itemType: z.enum(['COURSE', 'BOOTCAMP', 'INTERNSHIP', 'WORKSHOP']),
  itemId: z.string().min(1),
  amount: z.number().min(0),
  currency: z.string().default('INR'),
});

// ─── Helper: Validate Request Body ─────────────────────────────────
export async function validateBody<T>(
  request: Request,
  schema: z.ZodSchema<T>,
): Promise<T> {
  const body = await request.json();
  return schema.parse(body);
}
