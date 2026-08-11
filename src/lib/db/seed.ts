/**
 * Development Seed Data Script
 * Run: npx tsx src/lib/db/seed.ts
 *
 * Creates: 1 Admin, 2 Trainers, 5 Students, 3 Courses with modules/lessons,
 * Assignments, Quizzes, Projects, Internships, Bootcamps, Certificates, etc.
 */
import { getDb } from '../db';
import { hashPassword } from '../auth';
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  const db = await getDb();

  console.log('🌱 Seeding NextGen Tech database...\n');

  // ─── Clean existing data ──────────────────────────────────────
  const collections = [
    'users', 'enrollments', 'lesson_progress', 'courses',
    'assignments', 'assignment_submissions', 'quizzes', 'quiz_attempts',
    'projects', 'project_submissions', 'internships', 'internship_applications',
    'certificates', 'notifications', 'payments', 'orders',
    'community_posts', 'job_listings', 'audit_logs', 'refresh_tokens',
    'bootcamps', 'live_classes', 'achievements', 'student_achievements',
  ];
  for (const c of collections) {
    await db.collection(c).deleteMany({});
  }
  console.log('✓ Cleaned existing data');

  // ─── Hash common password ─────────────────────────────────────
  const hashedPw = await hashPassword('password123');
  const now = new Date();

  // ─── Users ────────────────────────────────────────────────────
  const adminUser = {
    _id: undefined as any,
    name: 'Admin User',
    email: 'admin@nxtgentech.com',
    password: hashedPw,
    role: 'ADMIN',
    status: 'ACTIVE',
    phone: '+91 98000 00001',
    college: 'NextGen Tech HQ',
    track: '',
    xp: 0,
    streak: 0,
    level: 1,
    createdAt: now,
    updatedAt: now,
  };

  const trainerUsers = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@nxtgentech.com',
      password: hashedPw,
      role: 'TRAINER',
      status: 'ACTIVE',
      phone: '+91 98000 00002',
      college: 'NextGen Tech',
      track: 'Full Stack Development',
      specialization: 'MERN Stack, System Design',
      xp: 0, streak: 0, level: 1,
      createdAt: now, updatedAt: now,
    },
    {
      name: 'Priya Sharma',
      email: 'priya@nxtgentech.com',
      password: hashedPw,
      role: 'TRAINER',
      status: 'ACTIVE',
      phone: '+91 98000 00003',
      college: 'NextGen Tech',
      track: 'AI & Data Science',
      specialization: 'Machine Learning, LLM Agents',
      xp: 0, streak: 0, level: 1,
      createdAt: now, updatedAt: now,
    },
  ];

  const studentUsers = [
    {
      name: 'Sai Varshith',
      email: 'sai@college.edu',
      password: hashedPw,
      role: 'STUDENT',
      status: 'ACTIVE',
      phone: '+91 98765 43210',
      college: 'VIT University',
      track: 'Full Stack Development',
      xp: 0, streak: 0, level: 1,
      enrolledCoursesCount: 0,
      weeklyHours: 0,
      aggregateScore: 0,
      createdAt: now, updatedAt: now,
    },
    {
      name: 'Ananya Patel',
      email: 'ananya@bits.edu',
      password: hashedPw,
      role: 'STUDENT',
      status: 'ACTIVE',
      phone: '+91 98123 45678',
      college: 'BITS Pilani',
      track: 'AI & Data Science',
      xp: 0, streak: 0, level: 1,
      enrolledCoursesCount: 0,
      weeklyHours: 0,
      aggregateScore: 0,
      createdAt: now, updatedAt: now,
    },
    {
      name: 'Vikram Singh',
      email: 'vikram@iitd.ac.in',
      password: hashedPw,
      role: 'STUDENT',
      status: 'ACTIVE',
      phone: '+91 97111 22233',
      college: 'IIT Delhi',
      track: 'Full Stack Development',
      xp: 0, streak: 0, level: 1,
      enrolledCoursesCount: 0,
      weeklyHours: 0,
      aggregateScore: 0,
      createdAt: now, updatedAt: now,
    },
    {
      name: 'Sneha Reddy',
      email: 'sneha@srm.edu',
      password: hashedPw,
      role: 'STUDENT',
      status: 'ACTIVE',
      phone: '+91 96000 11122',
      college: 'SRM Chennai',
      track: 'UI/UX Design',
      xp: 0, streak: 0, level: 1,
      enrolledCoursesCount: 0,
      weeklyHours: 0,
      aggregateScore: 0,
      createdAt: now, updatedAt: now,
    },
    {
      name: 'Arjun Mehta',
      email: 'arjun@manipal.edu',
      password: hashedPw,
      role: 'STUDENT',
      status: 'ACTIVE',
      phone: '+91 95555 66677',
      college: 'Manipal University',
      track: 'Cloud & DevOps',
      xp: 0, streak: 0, level: 1,
      enrolledCoursesCount: 0,
      weeklyHours: 0,
      aggregateScore: 0,
      createdAt: now, updatedAt: now,
    },
  ];

  const adminResult = await db.collection('users').insertOne(adminUser);
  const adminId = adminResult.insertedId.toString();

  const trainerResult = await db.collection('users').insertMany(trainerUsers);
  const trainerIds = Object.values(trainerResult.insertedIds).map((id) => id.toString());

  const studentResult = await db.collection('users').insertMany(studentUsers);
  const studentIds = Object.values(studentResult.insertedIds).map((id) => id.toString());

  console.log(`✓ Created ${1 + trainerIds.length + studentIds.length} users (1 admin, ${trainerIds.length} trainers, ${studentIds.length} students)`);

  // ─── Courses ──────────────────────────────────────────────────
  const courses = [
    {
      title: 'MERN Stack Development Bootcamp',
      description: 'Master full-stack web development with MongoDB, Express, React, and Node.js. Build and deploy production-ready applications.',
      category: 'Development',
      level: 'Beginner',
      price: 999,
      originalPrice: 2999,
      duration: '7 Days',
      techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'],
      trainerId: trainerIds[0],
      trainerName: 'Rajesh Kumar',
      published: true,
      studentsEnrolled: 0,
      modules: [
        {
          id: 'mod-1', title: 'Intro to Full Stack', order: 0,
          lessons: [
            { id: 'les-1-1', title: 'What is Full Stack?', type: 'video', duration: '15:00', order: 0 },
            { id: 'les-1-2', title: 'Setting Up Dev Environment', type: 'video', duration: '20:00', order: 1 },
          ],
        },
        {
          id: 'mod-2', title: 'HTML5 & Accessibility', order: 1,
          lessons: [
            { id: 'les-2-1', title: 'HTML5 Semantic Elements', type: 'video', duration: '18:00', order: 0 },
            { id: 'les-2-2', title: 'Accessibility Best Practices', type: 'text', duration: '10:00', order: 1 },
          ],
        },
        {
          id: 'mod-3', title: 'CSS Grid & Flexbox', order: 2,
          lessons: [
            { id: 'les-3-1', title: 'CSS Grid Layout', type: 'video', duration: '22:00', order: 0 },
            { id: 'les-3-2', title: 'Flexbox Mastery', type: 'video', duration: '18:00', order: 1 },
          ],
        },
        {
          id: 'mod-4', title: 'JavaScript Async/Await', order: 3,
          lessons: [
            { id: 'les-4-1', title: 'Promises & Async', type: 'video', duration: '25:00', order: 0 },
            { id: 'les-4-2', title: 'Error Handling', type: 'video', duration: '15:00', order: 1 },
          ],
        },
        {
          id: 'mod-5', title: 'React 19 State & Hooks', order: 4,
          lessons: [
            { id: 'les-5-1', title: 'useState & useEffect', type: 'video', duration: '24:15', order: 0 },
            { id: 'les-5-2', title: 'Custom Hooks', type: 'video', duration: '20:00', order: 1 },
          ],
        },
        {
          id: 'mod-6', title: 'Node.js & Express REST API', order: 5,
          lessons: [
            { id: 'les-6-1', title: 'Express Setup & Routing', type: 'video', duration: '22:00', order: 0 },
            { id: 'les-6-2', title: 'REST API Best Practices', type: 'video', duration: '18:00', order: 1 },
          ],
        },
        {
          id: 'mod-7', title: 'MongoDB & Mongoose', order: 6,
          lessons: [
            { id: 'les-7-1', title: 'MongoDB Atlas Setup', type: 'video', duration: '15:00', order: 0 },
            { id: 'les-7-2', title: 'Mongoose Models & Queries', type: 'video', duration: '25:00', order: 1 },
          ],
        },
        {
          id: 'mod-8', title: 'Capstone Deployment', order: 7,
          lessons: [
            { id: 'les-8-1', title: 'Vercel Deployment', type: 'video', duration: '18:00', order: 0 },
            { id: 'les-8-2', title: 'Final Project Review', type: 'assignment', duration: '60:00', order: 1 },
          ],
        },
      ],
      totalLessons: 16,
      createdAt: now,
      updatedAt: now,
    },
    {
      title: 'AI Application & LLM Agent Builder',
      description: 'Build autonomous AI agents powered by OpenAI, LangChain, and modern LLM APIs. From prompt engineering to production deployment.',
      category: 'AI',
      level: 'Intermediate',
      price: 1999,
      originalPrice: 5999,
      duration: '14 Days',
      techStack: ['Python', 'OpenAI API', 'LangChain', 'Streamlit', 'PyTorch'],
      trainerId: trainerIds[1],
      trainerName: 'Priya Sharma',
      published: true,
      studentsEnrolled: 0,
      modules: [
        {
          id: 'ai-mod-1', title: 'Introduction to AI & LLMs', order: 0,
          lessons: [
            { id: 'ai-les-1-1', title: 'What are Large Language Models?', type: 'video', duration: '20:00', order: 0 },
            { id: 'ai-les-1-2', title: 'OpenAI API Setup', type: 'video', duration: '15:00', order: 1 },
          ],
        },
        {
          id: 'ai-mod-2', title: 'Prompt Engineering', order: 1,
          lessons: [
            { id: 'ai-les-2-1', title: 'Prompt Design Patterns', type: 'video', duration: '25:00', order: 0 },
            { id: 'ai-les-2-2', title: 'Chain-of-Thought Prompting', type: 'video', duration: '18:00', order: 1 },
          ],
        },
        {
          id: 'ai-mod-3', title: 'LangChain Agents', order: 2,
          lessons: [
            { id: 'ai-les-3-1', title: 'Building Your First Agent', type: 'video', duration: '30:00', order: 0 },
            { id: 'ai-les-3-2', title: 'RAG Pipeline', type: 'video', duration: '28:00', order: 1 },
          ],
        },
      ],
      totalLessons: 6,
      createdAt: now,
      updatedAt: now,
    },
    {
      title: 'HTML5 & CSS Grid Layout Mastery',
      description: 'Master modern HTML5 semantics and CSS Grid/Flexbox layouts. Build responsive, accessible web pages from scratch.',
      category: 'Development',
      level: 'Beginner',
      price: 299,
      originalPrice: 999,
      duration: '1 Day',
      techStack: ['HTML5', 'CSS3', 'Grid', 'Flexbox'],
      trainerId: trainerIds[0],
      trainerName: 'Rajesh Kumar',
      published: true,
      studentsEnrolled: 0,
      modules: [
        {
          id: 'css-mod-1', title: 'HTML5 Fundamentals', order: 0,
          lessons: [
            { id: 'css-les-1-1', title: 'Semantic HTML', type: 'video', duration: '15:00', order: 0 },
            { id: 'css-les-1-2', title: 'Forms & Inputs', type: 'video', duration: '12:00', order: 1 },
          ],
        },
        {
          id: 'css-mod-2', title: 'CSS Grid Deep Dive', order: 1,
          lessons: [
            { id: 'css-les-2-1', title: 'Grid Template Areas', type: 'video', duration: '20:00', order: 0 },
            { id: 'css-les-2-2', title: 'Responsive Grid Patterns', type: 'video', duration: '18:00', order: 1 },
          ],
        },
      ],
      totalLessons: 4,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const courseResult = await db.collection('courses').insertMany(courses);
  const courseIds = Object.values(courseResult.insertedIds).map((id) => id.toString());
  console.log(`✓ Created ${courseIds.length} courses with modules & lessons`);

  // ─── Assignments ──────────────────────────────────────────────
  const assignments = [
    {
      title: 'Build React Login Page',
      instructions: 'Build a responsive dark-mode Login & Signup authentication form using React 19, Tailwind CSS, and custom client-side validation hooks.',
      courseId: courseIds[0],
      moduleId: 'mod-5',
      dueDate: new Date('2026-08-12'),
      maxScore: 100,
      trainerId: trainerIds[0],
      createdAt: now,
    },
    {
      title: 'Python Data Analysis',
      instructions: 'Clean and analyze student cohort datasets using Pandas & NumPy. Export automated metrics for pass percentages.',
      courseId: courseIds[1],
      moduleId: 'ai-mod-1',
      dueDate: new Date('2026-08-14'),
      maxScore: 100,
      trainerId: trainerIds[1],
      createdAt: now,
    },
    {
      title: 'Portfolio Website',
      instructions: 'Develop a personal developer portfolio showcasing your 1-Day Experience capstones, certificates, and skills matrix.',
      courseId: courseIds[2],
      moduleId: 'css-mod-2',
      dueDate: new Date('2026-08-18'),
      maxScore: 100,
      trainerId: trainerIds[0],
      createdAt: now,
    },
  ];

  const assignmentResult = await db.collection('assignments').insertMany(assignments);
  const assignmentIds = Object.values(assignmentResult.insertedIds).map((id) => id.toString());
  console.log(`✓ Created ${assignmentIds.length} assignments`);

  // ─── Quizzes ──────────────────────────────────────────────────
  const quizzes = [
    {
      title: 'React Fundamentals',
      courseId: courseIds[0],
      moduleId: 'mod-5',
      category: 'Course quizzes',
      timeLimit: 30,
      questions: [
        { question: 'What Hook should be used for side-effects in React?', options: ['useState()', 'useEffect()', 'useContext()', 'useRef()'], correctIndex: 1, points: 1 },
        { question: 'What does JSX stand for?', options: ['JavaScript XML', 'JavaScript Extension', 'Java Syntax XML', 'JSON XML'], correctIndex: 0, points: 1 },
        { question: 'Which method is used to update state in a class component?', options: ['this.state()', 'this.setState()', 'this.updateState()', 'state.set()'], correctIndex: 1, points: 1 },
      ],
      totalPoints: 3,
      createdAt: now,
    },
    {
      title: 'HTML & CSS Layout Mastery',
      courseId: courseIds[2],
      moduleId: 'css-mod-2',
      category: 'Module tests',
      timeLimit: 20,
      questions: [
        { question: 'What is the CSS Grid property for defining columns?', options: ['grid-rows', 'grid-template-columns', 'grid-columns', 'column-template'], correctIndex: 1, points: 1 },
        { question: 'Which HTML5 element is used for navigation?', options: ['<div>', '<nav>', '<menu>', '<header>'], correctIndex: 1, points: 1 },
      ],
      totalPoints: 2,
      createdAt: now,
    },
  ];

  const quizResult = await db.collection('quizzes').insertMany(quizzes);
  const quizIds = Object.values(quizResult.insertedIds).map((id) => id.toString());
  console.log(`✓ Created ${quizIds.length} quizzes with questions`);

  // ─── Projects ─────────────────────────────────────────────────
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack marketplace with Stripe payments & JWT authorization.',
      courseId: courseIds[0],
      techStack: 'React + Node.js + MongoDB',
      milestones: [
        { title: 'Setup & Auth', description: 'Project setup with authentication', order: 0 },
        { title: 'Product CRUD', description: 'Product listing and management', order: 1 },
        { title: 'Cart & Checkout', description: 'Shopping cart and payment integration', order: 2 },
        { title: 'Deployment', description: 'Deploy to production', order: 3 },
      ],
      createdAt: now,
    },
    {
      title: 'Portfolio Website',
      description: 'Next.js portfolio with glassmorphism & responsive layout.',
      courseId: courseIds[2],
      techStack: 'Next.js + Tailwind CSS',
      milestones: [
        { title: 'Design & Layout', description: 'Create responsive layout', order: 0 },
        { title: 'Content & Animations', description: 'Add content and micro-animations', order: 1 },
        { title: 'Deploy', description: 'Deploy to Vercel', order: 2 },
      ],
      createdAt: now,
    },
  ];

  const projectResult = await db.collection('projects').insertMany(projects);
  const projectIds = Object.values(projectResult.insertedIds).map((id) => id.toString());
  console.log(`✓ Created ${projectIds.length} projects with milestones`);

  // ─── Internships ──────────────────────────────────────────────
  const internships = [
    {
      title: 'Full Stack Development Internship',
      track: 'Full Stack Development',
      duration: '8 Weeks',
      description: 'Work in simulated Agile sprints with real Jira tickets, GitHub pull requests, and senior engineer code reviews.',
      skills: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs'],
      mentorName: 'Rajesh Kumar',
      price: 1499,
      maxStudents: 50,
      applicationsCount: 0,
      enrolledCount: 0,
      status: 'OPEN',
      createdAt: now,
    },
    {
      title: 'AI & ML Research Internship',
      track: 'AI & Data Science',
      duration: '8 Weeks',
      description: 'Build autonomous AI agents, fine-tune models, and integrate LLM APIs into production software.',
      skills: ['Python', 'OpenAI API', 'LangChain', 'PyTorch', 'Streamlit'],
      mentorName: 'Priya Sharma',
      price: 1999,
      maxStudents: 30,
      applicationsCount: 0,
      enrolledCount: 0,
      status: 'OPEN',
      createdAt: now,
    },
  ];

  const internshipResult = await db.collection('internships').insertMany(internships);
  const internshipIds = Object.values(internshipResult.insertedIds).map((id) => id.toString());
  console.log(`✓ Created ${internshipIds.length} internships`);

  // ─── Job Listings ─────────────────────────────────────────────
  const jobs = [
    {
      title: 'Junior Full Stack Developer',
      company: 'TechCorp India',
      location: 'Bangalore, India (Hybrid)',
      type: 'Full-time',
      description: 'Join our engineering team to build scalable SaaS applications.',
      requirements: ['React/Next.js', 'Node.js', 'MongoDB', 'TypeScript'],
      salary: '₹6-10 LPA',
      status: 'ACTIVE',
      createdAt: now,
    },
    {
      title: 'AI/ML Intern',
      company: 'DataLabs AI',
      location: 'Remote',
      type: 'Internship',
      description: 'Work on cutting-edge LLM applications and RAG pipelines.',
      requirements: ['Python', 'PyTorch/TensorFlow', 'OpenAI API'],
      salary: '₹25K/month',
      status: 'ACTIVE',
      createdAt: now,
    },
  ];

  await db.collection('job_listings').insertMany(jobs);
  console.log(`✓ Created ${jobs.length} job listings`);

  // ─── Achievements ─────────────────────────────────────────────
  const achievements = [
    { id: 'first-login', title: 'First Login', description: 'Logged in for the first time', xpReward: 10, icon: '🎯', createdAt: now },
    { id: 'first-enrollment', title: 'First Enrollment', description: 'Enrolled in your first course', xpReward: 25, icon: '📚', createdAt: now },
    { id: 'first-assignment', title: 'First Submission', description: 'Submitted your first assignment', xpReward: 50, icon: '📝', createdAt: now },
    { id: 'quiz-master', title: 'Quiz Master', description: 'Scored 90%+ on a quiz', xpReward: 100, icon: '🏆', createdAt: now },
    { id: 'streak-7', title: '7-Day Streak', description: 'Maintained a 7-day learning streak', xpReward: 75, icon: '🔥', createdAt: now },
    { id: 'course-complete', title: 'Course Complete', description: 'Completed a full course', xpReward: 200, icon: '🎓', createdAt: now },
  ];

  await db.collection('achievements').insertMany(achievements);
  console.log(`✓ Created ${achievements.length} achievements`);

  // ─── Summary ──────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════');
  console.log('🌱 SEED COMPLETE');
  console.log('═══════════════════════════════════════════');
  console.log(`\nTest Accounts (password: password123):`);
  console.log(`  Admin:   admin@nxtgentech.com`);
  console.log(`  Trainer: rajesh@nxtgentech.com`);
  console.log(`  Trainer: priya@nxtgentech.com`);
  console.log(`  Student: sai@college.edu`);
  console.log(`  Student: ananya@bits.edu`);
  console.log(`  Student: vikram@iitd.ac.in`);
  console.log(`  Student: sneha@srm.edu`);
  console.log(`  Student: arjun@manipal.edu`);
  console.log('═══════════════════════════════════════════\n');

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
