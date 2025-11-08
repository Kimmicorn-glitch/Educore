import type { Course, Exercise, UserProgress } from './types';

export const courses: Course[] = [
  {
    id: 'Python',
    title: 'Python Mastery',
    description: 'From fundamentals to advanced concepts in Python programming.',
    image: {
      id: 'python-course',
      url: 'https://picsum.photos/seed/python/600/400',
      hint: 'code python',
    },
    lessons: [
      { id: 'py-1', title: 'Introduction to Variables', level: 'Beginner', content: 'Learn about variables and data types in Python. A variable is a container for storing data values.', linkedExerciseId: 'ex-py-1' },
      { id: 'py-2', title: 'Conditional Logic', level: 'Beginner', content: 'Understand if-else statements and logical operators.', linkedExerciseId: 'ex-py-2' },
      { id: 'py-3', title: 'Functions', level: 'Intermediate', content: 'Learn how to define and use functions to structure your code.', linkedExerciseId: 'ex-py-3' },
    ],
  },
  {
    id: 'English',
    title: 'English for Coders',
    description: 'Improve grammar, logic, and comprehension for better coding.',
    image: {
      id: 'english-course',
      url: 'https://picsum.photos/seed/english/600/400',
      hint: 'book library',
    },
    lessons: [
      { id: 'en-1', title: 'Sentence Structure', level: 'Beginner', content: 'The foundation of clear communication. A simple sentence has a subject and a verb.', linkedExerciseId: 'ex-en-1' },
      { id: 'en-2', title: 'Logical Connectors', level: 'Intermediate', content: 'Using words like "and", "or", "but" to connect ideas logically.', linkedExerciseId: 'ex-py-2' },
    ],
  },
  {
    id: 'Maths',
    title: 'Mathematical Foundations',
    description: 'Explore algebra, logic, and problem-solving skills.',
    image: {
      id: 'maths-course',
      url: 'https://picsum.photos/seed/maths/600/400',
      hint: 'algebra math',
    },
    lessons: [
      { id: 'ma-1', title: 'Basic Algebra', level: 'Beginner', content: 'Solving for x. Understand the core principles of algebraic equations.', linkedExerciseId: 'ex-py-1' },
      { id: 'ma-2', title: 'Boolean Logic', level: 'Intermediate', content: 'The basis of all computing. Learn about AND, OR, and NOT operators.', linkedExerciseId: 'ex-py-2' },
    ],
  },
  {
    id: 'Physics',
    title: 'Physics in Simulations',
    description: 'Apply physics concepts to create realistic simulations.',
    image: {
      id: 'physics-course',
      url: 'https://picsum.photos/seed/physics/600/400',
      hint: 'atom physics',
    },
    lessons: [
      { id: 'ph-1', title: 'Laws of Motion', level: 'Beginner', content: 'Newton\'s laws govern how objects move. Let\'s explore them.', linkedExerciseId: 'ex-py-3' },
      { id: 'ph-2', title: 'Projectile Motion', level: 'Intermediate', content: 'Calculate the trajectory of an object in motion.', linkedExerciseId: 'ex-ph-2' },
    ],
  },
];

export const exercises: Exercise[] = [
    { id: 'ex-py-1', title: 'Declare Variables', type: 'coding', description: 'Declare a variable `name` with your name and an `age` variable with your age.', starterCode: 'name = ""\nage = 0\nprint(f"My name is {name} and I am {age} years old.")' },
    { id: 'ex-py-2', title: 'If-Else Statement', type: 'coding', description: 'Write an if-else statement to check if a number is positive or negative.', starterCode: 'number = 5\n\n# Your code here\n' },
    { id: 'ex-py-3', title: 'Simple Function', type: 'coding', description: 'Write a function that takes two numbers and returns their sum.', starterCode: 'def add(a, b):\n  # Your code here\n  return 0' },
    { id: 'ex-en-1', title: 'String Manipulation', type: 'coding', description: 'Create a sentence by concatenating three strings: "Python", "is", "fun".', starterCode: 'word1 = "Python"\nword2 = "is"\nword3 = "fun"\n\nsentence = "" # Combine the words\nprint(sentence)' },
    { id: 'ex-ph-2', title: 'Simulate a Bouncing Ball', type: 'coding', description: 'Use a loop to simulate a ball bouncing, reducing its height by 10% on each bounce.', starterCode: 'height = 100\nbounce = 0\n\nwhile height > 10:\n  # Your code here\n  bounce += 1\n  print(f"Bounce {bounce}: {height:.2f}")' },
];

export const userProgress: UserProgress = {
  lessonCompletions: [
    { lessonId: 'py-1', isCompleted: true },
    { lessonId: 'en-1', isCompleted: true },
    { lessonId: 'ma-1', isCompleted: false },
  ],
  exerciseAttempts: [
    { exerciseId: 'ex-py-1', attempts: 1, successRate: 1.0 },
    { exerciseId: 'ex-en-1', attempts: 3, successRate: 0.66 },
    { exerciseId: 'ex-py-2', attempts: 5, successRate: 0.2 },
  ],
};
