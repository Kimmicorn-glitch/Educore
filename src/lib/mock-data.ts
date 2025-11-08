import type { Course, Exercise, UserProgress, Badge } from './types';

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
      { id: 'py-1', title: 'Introduction to Variables', level: 'Beginner', targetAudience: 'Children', content: 'Learn about variables and data types in Python. A variable is a container for storing data values.', linkedExerciseId: 'ex-py-1' },
      { id: 'py-2', title: 'Fun with Python Turtle', level: 'Beginner', targetAudience: 'Children', content: 'Draw shapes and patterns using Python\'s turtle module. It\'s a fun way to learn programming concepts!', linkedExerciseId: 'ex-py-turtle' },
      { id: 'py-3', title: 'Conditional Logic', level: 'Beginner', targetAudience: 'Teenagers', content: 'Understand if-else statements and logical operators.', linkedExerciseId: 'ex-py-2' },
      { id: 'py-4', title: 'Introduction to Functions', level: 'Intermediate', targetAudience: 'Teenagers', content: 'Learn how to define and use functions to structure your code.', linkedExerciseId: 'ex-py-3' },
      { id: 'py-5', title: 'Object-Oriented Python', level: 'Advanced', targetAudience: 'Adults', content: 'Dive into classes, objects, and inheritance in Python.', linkedExerciseId: 'ex-py-oop' },
      { id: 'py-6', title: 'Data Analysis with Pandas', level: 'Advanced', targetAudience: 'Adults', content: 'Explore the powerful Pandas library for data manipulation and analysis.', linkedExerciseId: 'ex-py-pandas' },
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
      { id: 'en-1', title: 'Building Simple Sentences', level: 'Beginner', targetAudience: 'Children', content: 'Learn the basic blocks of English: subjects, verbs, and objects.', linkedExerciseId: 'ex-en-1' },
      { id: 'en-2', title: 'Storytelling Basics', level: 'Beginner', targetAudience: 'Children', content: 'Craft a simple story with a beginning, middle, and end.' },
      { id: 'en-3', title: 'Complex Sentences', level: 'Intermediate', targetAudience: 'Teenagers', content: 'Combine ideas using conjunctions and clauses.', linkedExerciseId: 'ex-en-2' },
      { id: 'en-4', title: 'Writing Technical Documentation', level: 'Advanced', targetAudience: 'Adults', content: 'Learn to write clear, concise, and helpful documentation for software projects.' },
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
      { id: 'ma-1', title: 'Fun with Numbers', level: 'Beginner', targetAudience: 'Children', content: 'Learning addition, subtraction, and multiplication through games.' },
      { id: 'ma-2', title: 'Basic Algebra', level: 'Intermediate', targetAudience: 'Teenagers', content: 'Solving for x. Understand the core principles of algebraic equations.', linkedExerciseId: 'ex-py-1' },
      { id: 'ma-3', title: 'Introduction to Logic', level: 'Intermediate', targetAudience: 'Teenagers', content: 'The basis of all computing. Learn about AND, OR, and NOT operators.', linkedExerciseId: 'ex-py-2' },
      { id: 'ma-4', title: 'Calculus for Machine Learning', level: 'Advanced', targetAudience: 'Adults', content: 'Understand derivatives and integrals, the foundation of training AI models.' },
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
      { id: 'ph-1', title: 'Gravity and Bouncing Balls', level: 'Beginner', targetAudience: 'Children', content: 'Learn why things fall down and how they bounce back up!', linkedExerciseId: 'ex-ph-2' },
      { id: 'ph-2', title: 'Newton\'s Laws of Motion', level: 'Intermediate', targetAudience: 'Teenagers', content: 'Newton\'s laws govern how objects move. Let\'s explore them.', linkedExerciseId: 'ex-py-3' },
      { id: 'ph-3', title: 'Projectile Motion', level: 'Intermediate', targetAudience: 'Teenagers', content: 'Calculate the trajectory of an object in motion.', linkedExerciseId: 'ex-ph-2' },
      { id: 'ph-4', title: 'Building a Simple Physics Engine', level: 'Advanced', targetAudience: 'Adults', content: 'Use your coding skills to create a basic physics engine for a 2D game.' },
    ],
  },
];

export const badges: Badge[] = [
    { id: 'py-beginner', title: 'Python Novice', description: 'Completed the Python beginner lessons.', icon: 'GraduationCap' },
    { id: 'py-intermediate', title: 'Python Apprentice', description: 'Mastered intermediate Python concepts.', icon: 'Code' },
    { id: 'first-badge', title: 'First Steps', description: 'Earned your very first badge!', icon: 'Award' }
]

export const exercises: Exercise[] = [
    { id: 'ex-py-1', title: 'Declare Variables', type: 'coding', description: 'Declare a variable `name` with your name and an `age` variable with your age.', starterCode: 'name = ""\nage = 0\nprint(f"My name is {name} and I am {age} years old.")' },
    { id: 'ex-py-2', title: 'If-Else Statement', type: 'coding', description: 'Write an if-else statement to check if a number is positive or negative.', starterCode: 'number = 5\n\n# Your code here\n' },
    { id: 'ex-py-3', title: 'Simple Function', type: 'coding', description: 'Write a function that takes two numbers and returns their sum.', starterCode: 'def add(a, b):\n  # Your code here\n  return 0' },
    { id: 'ex-en-1', title: 'String Manipulation', type: 'coding', description: 'Create a sentence by concatenating three strings: "Python", "is", "fun".', starterCode: 'word1 = "Python"\nword2 = "is"\nword3 = "fun"\n\nsentence = "" # Combine the words\nprint(sentence)' },
    { id: 'ex-ph-2', title: 'Simulate a Bouncing Ball', type: 'coding', description: 'Use a loop to simulate a ball bouncing, reducing its height by 10% on each bounce.', starterCode: 'height = 100\nbounce = 0\n\nwhile height > 10:\n  # Your code here\n  bounce += 1\n  print(f"Bounce {bounce}: {height:.2f}")' },
    { id: 'ex-py-turtle', title: 'Draw a Square', type: 'coding', description: 'Use the turtle module to draw a square.', starterCode: 'import turtle\n\n# Your code here\n\nturtle.done()' },
    { id: 'ex-py-oop', title: 'Create a Car Class', type: 'coding', description: 'Define a Car class with a brand and model.', starterCode: 'class Car:\n  def __init__(self, brand, model):\n    # your code here\n\nmy_car = Car("Tesla", "Model S")\nprint(my_car.brand)'},
    { id: 'ex-py-pandas', title: 'Load a CSV', type: 'coding', description: 'Use pandas to load a simple CSV file.', starterCode: 'import pandas as pd\n\n# Imagine you have a file named "data.csv"\n# data = pd.read_csv("data.csv")\n# print(data.head())'},
    { id: 'ex-en-2', title: 'Logical Connectors', type: 'coding', description: 'Combine two ideas using "because".', starterCode: 'idea1 = "The code failed"\nidea2 = "there was a syntax error"\n\n# Combine them into one sentence\nsentence = ""\nprint(sentence)' },
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
  badges: ['first-badge', 'py-beginner']
};
