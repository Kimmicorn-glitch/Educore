

export type Subject = 'Python' | 'English' | 'Maths' | 'Physics';
export type TargetAudience = 'Children' | 'Teenagers' | 'Adults';

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
  targetAudience: TargetAudience;
  content: string;
  linkedExerciseId?: string;
}

export interface Exercise {
  id: string;
  title: string;
  type: 'coding' | 'quiz';
  description: string;
  starterCode?: string;
  solution?: string;
  test?: string;
}

export interface Badge {
  id: string;
  title:string;
  description: string;
  icon: string;
}

export interface UserProgress {
  lessonCompletions: { lessonId: string; isCompleted: boolean }[];
  exerciseAttempts: { exerciseId: string; attempts: number; successRate: number }[];
  badges: string[];
  challengeProgress: { level: number, completed: boolean }[];
  playgroundProgress?: { level: number, completed: boolean }[];
}

export interface UserAccount {
  id: string;
  email: string;
  registrationDate: string;
  name: string;
}

export interface SupportTicket {
    id: string;
    userId: string;
    subject: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    submissionDate: string;
}

export interface Challenge {
    level: number;
    title: string;
    description: string;
    starterCode: string;
    test: string;
    tags: Subject[];
}

export interface TheoryContent {
  subject: Subject;
  glossary: {
    term: string;
    definition: string;
  }[];
  lectureNotes: string;
}

export interface PlaygroundLevel {
    level: number;
    title: string;
    starterCode: string;
    target: {
        x: number;
        y: number;
    }
}
