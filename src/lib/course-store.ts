export interface StudentCourse {
  id: string;
  title: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  cat: string;
  catIcon: string;
  status: 'In Progress' | 'Completed' | 'Saved';
  instructor: string;
  lastActive: string;
  isSaved?: boolean;
}

export const INITIAL_COURSES: StudentCourse[] = [];

const STORAGE_KEY = 'nxtgen_student_courses_store_v1';

export function getStoredCourses(): StudentCourse[] {
  if (typeof window === 'undefined') return INITIAL_COURSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to parse courses store', err);
  }
  return INITIAL_COURSES;
}

export function saveStoredCourses(courses: StudentCourse[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    // Dispatch custom event for real-time cross-component syncing
    window.dispatchEvent(new Event('nxtgen_course_store_updated'));
  } catch (err) {
    console.error('Failed to save courses store', err);
  }
}

export function toggleSaveCourse(courseId: string): StudentCourse[] {
  const courses = getStoredCourses();
  const updated: StudentCourse[] = courses.map((c) => {
    if (c.id === courseId) {
      const isSaved = !c.isSaved;
      let status: 'In Progress' | 'Completed' | 'Saved' = c.status;
      if (isSaved && c.progress === 0) {
        status = 'Saved';
      } else if (!isSaved && c.status === 'Saved') {
        status = c.progress > 0 ? (c.progress === 100 ? 'Completed' : 'In Progress') : 'In Progress';
      }
      return { ...c, isSaved, status };
    }
    return c;
  });
  saveStoredCourses(updated);
  return updated;
}

export function advanceCourseProgress(courseId: string): { updatedCourses: StudentCourse[]; newProgress: number; isCompleted: boolean } {
  const courses = getStoredCourses();
  let newProgress = 0;
  let isCompleted = false;

  const updatedCourses: StudentCourse[] = courses.map((c) => {
    if (c.id === courseId) {
      const nextModules = Math.min(c.completedModules + 1, c.totalModules);
      const progressPct = Math.round((nextModules / c.totalModules) * 100);
      const completed = progressPct === 100;

      newProgress = progressPct;
      isCompleted = completed;

      const newStatus: 'In Progress' | 'Completed' | 'Saved' = completed ? 'Completed' : 'In Progress';

      return {
        ...c,
        completedModules: nextModules,
        progress: progressPct,
        status: newStatus,
        lastActive: 'Just now',
      };
    }
    return c;
  });

  saveStoredCourses(updatedCourses);
  return { updatedCourses, newProgress, isCompleted };
}
