export type Subject = 'Python' | 'English' | 'Maths' | 'Physics';

export interface Course {
  id: Subject;
  title: string;
  description: string;
  image: {
    id: string;
    url: string;
    hint: string;
  };
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  content: string;
  linkedExerciseId?: string;
}

export interface Exercise {
  id: string;
  title: string;
  type: 'coding' | 'quiz';
  description: string;
  starterCode?: string;
}

export interface UserProgress {
  lessonCompletions: { lessonId: string; isCompleted: boolean }[];
  exerciseAttempts: { exerciseId: string; attempts: number; successRate: number }[];
}
