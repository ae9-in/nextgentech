import { MongoClient, Db, Collection, Document } from 'mongodb';

const DEFAULT_MONGO_URI = 'mongodb+srv://saivarshith4691_db_user:9CwJTISqMKOWta4C@clusternxtgen.ihza2b4.mongodb.net/nxtgentech?retryWrites=true&w=majority&appName=Clusternxtgen';
const uri = process.env.MONGODB_URI || DEFAULT_MONGO_URI;
const DB_NAME = 'nxtgentech';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    maxPoolSize: 20,
    minPoolSize: 5,
    maxIdleTimeMS: 30000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
  clientPromise = client.connect();
}

// ─── Database Getter ───────────────────────────────────────────────
export async function getDb(): Promise<Db> {
  const c = await clientPromise;
  return c.db(DB_NAME);
}

// ─── Collection Getter ─────────────────────────────────────────────
export async function getCollection<T extends Document = Document>(
  name: string,
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

// ─── Collection Names (Single Source of Truth) ─────────────────────
export const COLLECTIONS = {
  USERS: 'users',
  STUDENTS: 'students',
  TRAINERS: 'trainers',
  COLLEGES: 'colleges',

  COURSES: 'courses',
  COURSE_MODULES: 'course_modules',
  LESSONS: 'lessons',

  ENROLLMENTS: 'enrollments',
  LESSON_PROGRESS: 'lesson_progress',

  QUIZZES: 'quizzes',
  QUIZ_QUESTIONS: 'quiz_questions',
  QUIZ_ATTEMPTS: 'quiz_attempts',

  ASSIGNMENTS: 'assignments',
  ASSIGNMENT_SUBMISSIONS: 'assignment_submissions',

  PROJECTS: 'projects',
  PROJECT_SUBMISSIONS: 'project_submissions',

  INTERNSHIPS: 'internships',
  INTERNSHIP_APPLICATIONS: 'internship_applications',
  INTERNSHIP_TASKS: 'internship_tasks',

  BOOTCAMPS: 'bootcamps',

  LIVE_CLASSES: 'live_classes',
  CALENDAR_EVENTS: 'calendar_events',

  CERTIFICATES: 'certificates',

  ORDERS: 'orders',
  PAYMENTS: 'payments',

  NOTIFICATIONS: 'notifications',

  COMMUNITY_POSTS: 'community_posts',
  COMMUNITY_COMMENTS: 'community_comments',

  JOB_LISTINGS: 'job_listings',
  JOB_APPLICATIONS: 'job_applications',

  ACHIEVEMENTS: 'achievements',
  STUDENT_ACHIEVEMENTS: 'student_achievements',

  AUDIT_LOGS: 'audit_logs',
  PLATFORM_SETTINGS: 'platform_settings',
  REFRESH_TOKENS: 'refresh_tokens',
  LEADS: 'leads',
} as const;

export default clientPromise;
