
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
      { 
        id: 'py-1', 
        title: 'Introduction to Variables', 
        level: 'Beginner', 
        targetAudience: 'Children', 
        content: `Welcome to the world of Python! Today, we're learning about variables.

A variable is like a box or a container where you can store information. You give the box a name, and then you can put things inside it. In programming, we store data values in variables.

Let's look at an example. Imagine you want to store your name. You can create a variable called 'name' and put your name in it.

\`name = "Alice"\`

Here, 'name' is the variable, and "Alice" is the value we stored. The value is a piece of text, which we call a 'string' in programming. We usually put strings inside double quotes.

You can also store numbers:

\`age = 10\`

Here, 'age' is the variable, and 10 is the number.

You can print your variables to see what's inside them:

\`print(name)\`
\`print(age)\`

This will show "Alice" and 10 on the screen. Now it's your turn to try!`, 
        linkedExerciseId: 'ex-py-1' 
      },
      { 
        id: 'py-2', 
        title: 'Fun with Python Turtle', 
        level: 'Beginner', 
        targetAudience: 'Children', 
        content: `Let's have some fun by drawing with code! Python has a special feature called the 'turtle' module that lets you draw cool pictures.

Imagine a tiny turtle with a pen tied to its tail. You can tell the turtle where to go, and it will draw a line as it moves.

First, we need to tell Python that we want to use the turtle. We do this by 'importing' it:

\`import turtle\`

Now we have our turtle! Let's tell it to move forward:

\`turtle.forward(100)\`

This tells the turtle to move 100 steps forward. How about turning?

\`turtle.right(90)\`

This tells the turtle to turn right by 90 degrees (a perfect corner).

If we combine these commands, we can draw a square:

\`turtle.forward(100)\`
\`turtle.right(90)\`
\`turtle.forward(100)\`
\`turtle.right(90)\`
\`turtle.forward(100)\`
\`turtle.right(90)\`
\`turtle.forward(100)\`

Try it out in the exercise below!`, 
        linkedExerciseId: 'ex-py-turtle' 
      },
      { 
        id: 'py-3', 
        title: 'Conditional Logic', 
        level: 'Beginner', 
        targetAudience: 'Teenagers', 
        content: `In life, we make decisions based on conditions. For example, "IF it is raining, THEN I will take an umbrella." Programming works the same way using 'if' statements.

An 'if' statement runs a block of code only if a certain condition is true.

Let's see it in action:

\`age = 18\`
\`if age >= 18:\`
    \`print("You are eligible to vote.")\`

The code inside the 'if' block only runs because the value of 'age' is 18, which is greater than or equal to 18.

What if the condition is false? We can add an 'else' block.

\`age = 16\`
\`if age >= 18:\`
    \`print("You are eligible to vote.")\`
\`else:\`
    \`print("You are not eligible to vote yet.")\`

In this case, since 'age' is 16, the condition is false, and the code inside the 'else' block will run. This is the foundation of making your programs smart!`, 
        linkedExerciseId: 'ex-py-2' 
      },
      { 
        id: 'py-4', 
        title: 'Introduction to Functions', 
        level: 'Intermediate', 
        targetAudience: 'Teenagers', 
        content: `As your programs get bigger, you'll find yourself writing the same code over and over. Functions are here to help!

A function is a reusable block of code that performs a specific task. You define it once and can use it many times.

Here's how to define a simple function:

\`def greet():\`
    \`print("Hello, world!")\`

'def' is the keyword to define a function. 'greet' is the name of our function. To run the code inside the function, you "call" it by its name:

\`greet()\`

This will print "Hello, world!".

Functions can also take inputs, called 'parameters' or 'arguments'.

\`def greet_user(name):\`
    \`print(f"Hello, {name}!")\`

\`greet_user("Bob")\`  # This will print "Hello, Bob!"

And they can also return a value:

\`def add(a, b):\`
    \`return a + b\`

\`sum_result = add(5, 3)\`
\`print(sum_result)\`  # This will print 8

Functions are essential for writing clean, organized, and efficient code.`, 
        linkedExerciseId: 'ex-py-3' 
      },
      { 
        id: 'py-5', 
        title: 'Object-Oriented Python', 
        level: 'Advanced', 
        targetAudience: 'Adults', 
        content: `Object-Oriented Programming (OOP) is a powerful paradigm for structuring your applications. It's based on the concept of "objects," which can contain data and code.

The blueprint for an object is called a 'class'. Let's define a class for a 'Car':

\`class Car:\`
    \`def __init__(self, brand, model):\`
        \`self.brand = brand\`
        \`self.model = model\`

    \`def display_info(self):\`
        \`print(f"{self.brand} {self.model}")\`

The '__init__' method is a special method that runs when you create a new object from the class. 'self' refers to the instance of the object itself.

Now, we can create 'instances' of the Car class:

\`my_car = Car("Tesla", "Model 3")\`
\`your_car = Car("Ford", "Mustang")\`

'my_car' and 'your_car' are both objects of the Car class, but they have different data.

We can call methods on these objects:

\`my_car.display_info()\`  # Prints "Tesla Model 3"
\`your_car.display_info()\` # Prints "Ford Mustang"

OOP helps you model real-world things and manage complexity in large applications.`, 
        linkedExerciseId: 'ex-py-oop' 
      },
      { 
        id: 'py-6', 
        title: 'Data Analysis with Pandas', 
        level: 'Advanced', 
        targetAudience: 'Adults', 
        content: `Pandas is the most popular Python library for data analysis. It provides high-performance, easy-to-use data structures and data analysis tools.

The primary data structure in Pandas is the 'DataFrame', which is like a table or a spreadsheet.

First, you'll need to import pandas. It's common practice to import it with the alias 'pd'.

\`import pandas as pd\`

You can create a DataFrame from a dictionary:

\`data = {\`
    \`'Name': ['Alice', 'Bob', 'Charlie'],\`
    \`'Age': [25, 30, 35]\`
\`}\`
\`df = pd.DataFrame(data)\`

\`print(df)\`

This will output a nicely formatted table.

A common task is to read data from a file, like a CSV:

\`# df = pd.read_csv('your_data.csv')\`

You can then easily select columns, filter rows, and perform complex calculations on your data. For example, to get the 'Age' column:

\`print(df['Age'])\`

Pandas is a fundamental tool for anyone working with data in Python.`, 
        linkedExerciseId: 'ex-py-pandas' 
      },
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
      { id: 'en-1', title: 'Building Simple Sentences', level: 'Beginner', targetAudience: 'Children', content: `Every sentence is a complete thought. The most basic sentences have two parts: a 'subject' and a 'verb'.

The 'subject' is who or what the sentence is about.
The 'verb' is the action the subject is doing.

Example:
"Dogs bark."
Subject: Dogs
Verb: bark

Let's add an 'object'. The object is what receives the action of the verb.

Example:
"The programmer writes code."
Subject: The programmer
Verb: writes
Object: code

Understanding this structure helps you write clearly. In coding, clear comments and variable names are just as important as the code itself!`, linkedExerciseId: 'ex-en-1' },
      { id: 'en-2', title: 'Storytelling Basics', level: 'Beginner', targetAudience: 'Children', content: `Every good story has a beginning, a middle, and an end.

Beginning: Introduce your characters and the setting. Where and when does the story happen?
Middle: This is where the main events happen. There's usually a problem or an adventure.
End: The problem is solved, and the story concludes.

Think about a simple story:
Beginning: A little robot was lost in a big city.
Middle: It beeped and booped, looking for its way home. It met a friendly cat who helped it navigate the busy streets.
End: The robot finally found its charging station, safe and sound.

Try to create your own short story!` },
      { id: 'en-3', title: 'Complex Sentences', level: 'Intermediate', targetAudience: 'Teenagers', content: `Simple sentences are great, but to express more complex ideas, we need to connect them. We use 'conjunctions' like 'and', 'but', and 'because'.

Example:
"The code compiled, BUT it had a logical error."
This connects two related but contrasting ideas.

Another way is to use 'clauses'. A clause is a group of words with a subject and a verb. An independent clause can stand on its own as a sentence. A dependent clause cannot.

Example:
"BECAUSE the API was slow, the application felt unresponsive."
"Because the API was slow" is a dependent clause. It needs the main clause to make sense.

Mastering these helps you write better documentation and explain technical problems more effectively.`, linkedExerciseId: 'ex-en-2' },
      { id: 'en-4', title: 'Writing Technical Documentation', level: 'Advanced', targetAudience: 'Adults', content: `Good code needs good documentation. Technical writing is a skill that makes your projects usable and maintainable by others (and your future self!).

Key principles:
1.  **Be Clear and Concise:** Avoid jargon where possible. Get straight to the point.
2.  **Know Your Audience:** Are you writing for beginners or experts? Tailor your language accordingly.
3.  **Provide Examples:** Code snippets are worth a thousand words. Show how to use the function or component.
4.  **Structure Your Document:** Use headings, lists, and bold text to make the document easy to scan. A good structure includes a purpose, parameters/arguments, return values, and examples.

Example of documenting a function:

\`/**
 * Calculates the sum of two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of a and b.
 */
function add(a, b) {
  return a + b;
}\`

This is clear, simple, and tells another developer everything they need to know.` },
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
      { id: 'ma-1', title: 'Fun with Numbers', level: 'Beginner', targetAudience: 'Children', content: `Numbers are all around us! Let's play with them.

Addition (+) is for putting things together. If you have 3 apples and you get 2 more, you have 3 + 2 = 5 apples.

Subtraction (-) is for taking things away. If you have 5 balloons and 1 pops, you have 5 - 1 = 4 balloons left.

Multiplication (x) is for adding the same number many times. 3 groups of 4 stars is 4 + 4 + 4, which is the same as 3 x 4 = 12 stars.

Let's try a problem: What is 10 + 5?` },
      { id: 'ma-2', title: 'Basic Algebra', level: 'Intermediate', targetAudience: 'Teenagers', content: `Algebra introduces 'variables', which are letters that stand in for unknown numbers. The most common one is 'x'.

The goal is often to "solve for x". This means finding the value of x that makes an equation true.

Consider the equation:
\`x + 5 = 12\`

To solve for x, we want to get x by itself on one side of the equals sign. We can do this by performing the same operation on both sides. To get rid of the '+ 5', we subtract 5 from both sides:

\`x + 5 - 5 = 12 - 5\`
\`x = 7\`

This is the core of algebra! It's like a puzzle where you balance both sides of the equation.`, linkedExerciseId: 'ex-ma-2' },
      { id: 'ma-3', title: 'Introduction to Logic', level: 'Intermediate', targetAudience: 'Teenagers', content: `Logic is the foundation of all computing. Computers think in terms of 'true' and 'false'.

We use logical operators to combine these true/false values.

AND: The 'AND' operator is true only if BOTH conditions are true.
(Is it daytime?) AND (Is the sun out?)
If both are true, the result is true. If either is false, the result is false.

OR: The 'OR' operator is true if AT LEAST ONE condition is true.
(Do I have a cat?) OR (Do I have a dog?)
If you have either, or both, the result is true. It's only false if you have neither.

NOT: The 'NOT' operator simply flips the value.
NOT (true) is false.
NOT (false) is true.

This is how computers make complex decisions.`, linkedExerciseId: 'ex-py-2' },
      { id: 'ma-4', title: 'Calculus for Machine Learning', level: 'Advanced', targetAudience: 'Adults', content: `Calculus is the mathematics of change, and it's fundamental to how machine learning models 'learn'.

The most important concept is the 'derivative', which measures the instantaneous rate of change. Think of it as the slope of a curve at a single point. In machine learning, we use derivatives to find the 'error' of our model's prediction. The derivative tells us in which direction to adjust the model's parameters to reduce the error. This process is called 'gradient descent'.

An 'integral' is the reverse of a derivative. It's used to calculate the total area under a curve. In probability and statistics, which are central to AI, integrals help us find the probability of a range of outcomes.

While you don't always have to do calculus by hand (libraries do it for you), understanding what derivatives and integrals represent is key to understanding how AI works under the hood.` },
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
      { id: 'ph-1', title: 'Gravity and Bouncing Balls', level: 'Beginner', targetAudience: 'Children', content: `Why does a ball fall back to the ground when you throw it up? Gravity!

Gravity is a force that pulls objects toward each other. Earth has a lot of mass, so it has strong gravity that pulls everything down.

When a ball hits the ground, the energy from the fall has to go somewhere. The ball squishes a little and then pushes back, which makes it bounce! With each bounce, it loses a little energy, so it doesn't bounce as high as before.

We can simulate this in code by having a 'velocity' for our ball. Gravity constantly adds to the downward velocity. When it hits the ground, we reverse the velocity but make it a little weaker.`, linkedExerciseId: 'ex-ph-2' },
      { id: 'ph-2', title: 'Newton\'s Laws of Motion', level: 'Intermediate', targetAudience: 'Teenagers', content: `Sir Isaac Newton came up with three laws that are the foundation of classical mechanics. They are essential for creating realistic physics in games and simulations.

1.  **First Law (Inertia):** An object will stay still, or keep moving at a constant speed in a straight line, unless a force acts on it. (An object in motion stays in motion).

2.  **Second Law (F=ma):** The force acting on an object is equal to the mass of that object times its acceleration (Force = mass × acceleration). This is the most important law for simulations. It tells you how much an object's velocity changes when you apply a force like gravity or a push.

3.  **Third Law (Action-Reaction):** For every action, there is an equal and opposite reaction. When you push on a wall, the wall pushes back on you with the same force. When a rocket pushes gas out, the gas pushes the rocket forward.`, linkedExerciseId: 'ex-py-3' },
      { id: 'ph-3', title: 'Projectile Motion', level: 'Intermediate', targetAudience: 'Teenagers', content: `What path does a ball take when you throw it? That's projectile motion!

It's a combination of two separate movements:
1.  **Horizontal Motion:** If we ignore air resistance, the ball moves horizontally at a constant speed.
2.  **Vertical Motion:** The ball is constantly being pulled down by gravity. Its upward speed decreases, it reaches a peak, and then its downward speed increases.

When you combine these two, you get a curved path called a 'parabola'.

To simulate this, you need to track the horizontal velocity (which stays the same) and the vertical velocity (which is changed by gravity in every step of your simulation).`, linkedExerciseId: 'ex-ph-2' },
      { id: 'ph-4', title: 'Building a Simple Physics Engine', level: 'Advanced', targetAudience: 'Adults', content: `A physics engine is the part of a game or simulation that calculates how objects move and interact. Let's outline a very simple one for a 2D world.

Core components:
1.  **Objects:** Each object needs properties like position (x, y), velocity (vx, vy), acceleration (ax, ay), and mass.
2.  **The Game Loop:** This is a loop that runs continuously. In each 'tick' of the loop, you update the state of all objects.
3.  **Update Logic (per tick):**
    a. Apply forces: Start by applying constant forces like gravity. Gravity would increase the y-acceleration of all objects. \`acceleration.y += gravity_force\`.
    b. Update velocity: \`velocity += acceleration * time_delta\`. The \`time_delta\` is the time since the last tick.
    c. Update position: \`position += velocity * time_delta\`.
    d. Reset acceleration: \`acceleration = (0, 0)\` so forces don't accumulate incorrectly.
    
This is the basic 'Euler integration' method. It's simple but can be inaccurate at high speeds. More advanced engines use methods like 'Verlet integration'.` },
    ],
  },
];

export const badges: Badge[] = [
    { id: 'py-beginner', title: 'Python Novice', description: 'Completed the Python beginner lessons.', icon: 'GraduationCap' },
    { id: 'py-intermediate', title: 'Python Apprentice', description: 'Mastered intermediate Python concepts.', icon: 'Code' },
    { id: 'first-badge', title: 'First Steps', description: 'Earned your very first badge!', icon: 'Award' }
]

export const exercises: Exercise[] = [
    { id: 'ex-py-1', title: 'Declare Variables', type: 'coding', description: 'Declare a variable `name` with your name and an `age` variable with your age, then print a sentence.', starterCode: 'name = "Alex"\nage = 10\nprint(f"My name is {name} and I am {age} years old.")' },
    { id: 'ex-ma-2', title: 'Solve for X', type: 'coding', description: 'The equation is x + 15 = 25. Find the value of x and print it.', starterCode: '# Solve for x in the equation: x + 15 = 25\nx = 0 # Change this line\nprint(x)' },
    { id: 'ex-py-2', title: 'If-Else Statement', type: 'coding', description: 'Check if the `number` is greater than 0. If it is, print "Positive". Otherwise, print "Not Positive".', starterCode: 'number = 5\n\n# Your code here\nif number > 0:\n  print("Positive")\nelse:\n  print("Not Positive")' },
    { id: 'ex-py-3', title: 'Simple Function', type: 'coding', description: 'Complete the function to take two numbers and return their sum.', starterCode: 'def add(a, b):\n  # Your code here\n  return a + b' },
    { id: 'ex-en-1', title: 'String Concatenation', type: 'coding', description: 'Create a single sentence by joining the three strings.', starterCode: 'word1 = "Programming"\nword2 = "is"\nword3 = "powerful"\n\nsentence = word1 + " " + word2 + " " + word3\nprint(sentence)' },
    { id: 'ex-ph-2', title: 'Simulate a Bouncing Ball', type: 'coding', description: 'Simulate a ball bouncing 5 times, reducing its height by half each time. The initial height is 100.', starterCode: 'height = 100\n\nfor i in range(5):\n  height = height / 2\n  print(f"Bounce {i+1}: New height is {height}")' },
    { id: 'ex-py-turtle', title: 'Draw a Square', type: 'coding', description: 'Complete the loop to make the turtle draw a square.', starterCode: 'import turtle\n\n# Loop 4 times to draw 4 sides\nfor _ in range(4):\n  turtle.forward(100)\n  turtle.right(90)\n\nturtle.done()' },
    { id: 'ex-py-oop', title: 'Create a Car Class', type: 'coding', description: 'Define a Car class with a brand and model. The __init__ method should store them as attributes.', starterCode: 'class Car:\n  def __init__(self, brand, model):\n    self.brand = brand\n    self.model = model\n\nmy_car = Car("Tesla", "Model S")\nprint(my_car.brand)\nprint(my_car.model)'},
    { id: 'ex-py-pandas', title: 'Create a DataFrame', type: 'coding', description: 'Use pandas to create a DataFrame from the given dictionary and print it.', starterCode: 'import pandas as pd\n\ndata = {\n    "Fruit": ["Apple", "Banana", "Cherry"],\n    "Count": [10, 15, 7]\n}\n\ndf = pd.DataFrame(data)\nprint(df)'},
    { id: 'ex-en-2', title: 'Logical Connectors', type: 'coding', description: 'Combine the two ideas using the word "because".', starterCode: 'idea1 = "The code failed"\nidea2 = "there was a syntax error"\n\nsentence = idea1 + " because " + idea2\nprint(sentence)' },
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
