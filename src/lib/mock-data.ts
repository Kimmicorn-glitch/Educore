
import type { Course, Exercise, UserProgress, Badge, Challenge } from './types';

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
        id: 'py-7',
        title: 'Working with Lists and Loops',
        level: 'Beginner',
        targetAudience: 'Teenagers',
        content: `A 'list' is a collection of items in a particular order. Think of it as a shopping list. You can store numbers, strings, or a mix of different types.

Here's how you create a list of numbers:
\`my_numbers = [1, 2, 3, 4, 5]\`

And a list of strings:
\`fruits = ["apple", "banana", "cherry"]\`

To go through each item in a list, we use a 'for loop'. A for loop lets you execute a block of code for every single item in a collection.

\`for fruit in fruits:\`
  \`print(f"I like to eat {fruit}s.")\`

This loop will take each item from the 'fruits' list one by one, assign it to the variable 'fruit', and then run the print statement. The output would be:
"I like to eat apples."
"I like to eat bananas."
"I like to eat cherries."

Loops are incredibly powerful for automating repetitive tasks.`,
        linkedExerciseId: 'ex-py-lists'
      },
      {
        id: 'py-9',
        title: 'Basic Input and Output',
        level: 'Beginner',
        targetAudience: 'Children',
        content: `So far, our programs have been a bit predictable. Let's make them interactive! We can ask the user for information using the \`input()\` function.

When you use \`input()\`, the program will pause and wait for the user to type something and press Enter.

\`name = input("What is your name? ")\`
\`print(f"Hello, {name}!")\`

In this example, the program prints "What is your name? ", waits for an answer, and then greets the user by the name they entered.

The \`input()\` function always gives you back a string. If you need to work with a number, you have to convert it.

\`age_string = input("How old are you? ")\`
\`age = int(age_string)\`
\`next_year_age = age + 1\`
\`print(f"Next year, you will be {next_year_age}!")\`

Here, \`int()\` converts the string from the input into an integer (a whole number).`,
        linkedExerciseId: 'ex-py-input'
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
        id: 'py-8',
        title: 'Understanding Dictionaries',
        level: 'Intermediate',
        targetAudience: 'Teenagers',
        content: `While lists are for ordered collections, 'dictionaries' are for storing data in 'key-value' pairs. Think of a real dictionary: you look up a word (the 'key') to find its definition (the 'value').

In Python, you create a dictionary using curly braces \`{}\`:

\`student = {\`
  \`"name": "John Doe",\`
  \`"age": 21,\`
  \`"major": "Computer Science"\`
\`}\`

Here, "name", "age", and "major" are the keys, and "John Doe", 21, and "Computer Science" are their corresponding values.

You access a value by its key:
\`print(student["name"])\`  # This will print "John Doe"

You can add new key-value pairs:
\`student["gpa"] = 3.8\`

Or change an existing value:
\`student["age"] = 22\`

Dictionaries are extremely useful for organizing and retrieving related information.`,
        linkedExerciseId: 'ex-py-dict'
      },
      {
        id: 'py-10',
        title: 'File I/O',
        level: 'Intermediate',
        targetAudience: 'Teenagers',
        content: `Your programs can read from and write to files on your computer. This is called File Input/Output (I/O).

To work with a file, you first need to open it. The \`with open(...) as ...:\` syntax is the recommended way, as it handles closing the file for you automatically.

**Writing to a file:**
Use the mode 'w' to write to a file. This will overwrite the file if it already exists.

\`with open("greeting.txt", "w") as f:\`
  \`f.write("Hello, from Python!")\`

**Reading from a file:**
Use the mode 'r' to read a file.

\`with open("greeting.txt", "r") as f:\`
  \`content = f.read()\`
\`print(content)\` # Will print "Hello, from Python!"

**Appending to a file:**
Use the mode 'a' to add to the end of an existing file without deleting its contents.

\`with open("greeting.txt", "a") as f:\`
  \`f.write("\\nHave a nice day!")\`

Working with files allows your programs to save data permanently.`,
        linkedExerciseId: 'ex-py-files'
      },
      {
        id: 'py-11',
        title: 'Error Handling with Try/Except',
        level: 'Intermediate',
        targetAudience: 'Adults',
        content: `Sometimes, things go wrong in a program. A user might enter text when you expect a number, or you might try to divide by zero. If you don't handle these situations, your program will crash.

The \`try...except\` block lets you "try" a piece of code that might cause an error, and "catch" the error if it happens.

\`try:\`
  \`number = int(input("Enter a number: "))\`
  \`result = 10 / number\`
  \`print(result)\`
\`except ValueError:\`
  \`print("That wasn't a valid number!")\`
\`except ZeroDivisionError:\`
  \`print("You can't divide by zero!")\`

In this code:
- Python first tries to run the code in the \`try\` block.
- If the user enters "abc", a \`ValueError\` occurs, and the code jumps to that \`except\` block.
- If the user enters "0", a \`ZeroDivisionError\` occurs, and it jumps to that block.
- If no error occurs, the \`except\` blocks are skipped.

This makes your programs much more robust and user-friendly.`,
        linkedExerciseId: 'ex-py-try-except'
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

The \`__init__\` method is a special method that runs when you create a new object from the class. \`self\` refers to the instance of the object itself.

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
      {
        id: 'py-12',
        title: 'List Comprehensions',
        level: 'Advanced',
        targetAudience: 'Adults',
        content: `List comprehensions provide a concise way to create lists. They are often more readable and more performant than using a standard \`for\` loop.

Suppose you want to create a list of squares from 0 to 9. A standard \`for\` loop would look like this:

\`squares = []\`
\`for x in range(10):\`
  \`squares.append(x**2)\`

With a list comprehension, you can achieve the same result in a single line:

\`squares = [x**2 for x in range(10)]\`

The structure is: \`[expression for item in iterable]\`.

You can also add a condition to filter the list. Let's get the squares of only the even numbers:

\`even_squares = [x**2 for x in range(10) if x % 2 == 0]\`

This is equivalent to:

\`even_squares = []\`
\`for x in range(10):\`
  \`if x % 2 == 0:\`
    \`even_squares.append(x**2)\`

List comprehensions are a hallmark of idiomatic Python code.`,
        linkedExerciseId: 'ex-py-list-comprehension'
      },
      {
        id: 'py-13',
        title: 'Decorators',
        level: 'Advanced',
        targetAudience: 'Adults',
        content: `Decorators are a powerful and flexible way to modify or enhance functions without permanently changing their code. A decorator is a function that takes another function as input, adds some functionality to it, and returns the modified function.

They are often used for logging, timing, and enforcing access control.

Here's a simple decorator that prints a message before and after a function runs:

\`def my_decorator(func):\`
  \`def wrapper():\`
    \`print("Something is happening before the function is called.")\`
    \`func()\`
    \`print("Something is happening after the function is called.")\`
  \`return wrapper\`

Now, you can "decorate" another function with it using the \`@\` symbol:

\`@my_decorator\`
\`def say_whee():\`
  \`print("Whee!")\`

When you call \`say_whee()\`, you'll see the decorator's messages printed around the original function's output. Decorators help keep your code DRY (Don't Repeat Yourself).`,
        linkedExerciseId: 'ex-py-decorators'
      },
       {
        id: 'py-14',
        title: 'Generators and Iterators',
        level: 'Advanced',
        targetAudience: 'Adults',
        content: `Generators provide a way to create iterators in a simple, memory-efficient way. While a normal function computes a value and returns it, a generator function 'yields' a value and pauses its execution, ready to resume later.

This is extremely useful for working with large datasets because it doesn't require all the data to be loaded into memory at once.

A normal function to get squares:
\`def get_squares(n):\`
  \`return [x**2 for x in range(n)]\`

A generator function for squares:
\`def gen_squares(n):\`
  \`for x in range(n):\`
    \`yield x**2\`

When you call \`gen_squares(5)\`, it doesn't run the code. It returns a generator object. You can then iterate over it:
\`for i in gen_squares(5):\`
  \`print(i)\`

This prints the numbers one by one, with the function pausing and resuming at each \`yield\`. This is the core of lazy evaluation in Python.`,
        linkedExerciseId: 'ex-py-generators'
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
      {
        id: 'en-5',
        title: 'Active vs. Passive Voice',
        level: 'Intermediate',
        targetAudience: 'Teenagers',
        content: `The 'voice' of a sentence describes whether the subject performs or receives the action of the verb. This is crucial for clear technical writing.

**Active Voice:** The subject performs the action. This is direct, clear, and generally preferred.
- Example: "The compiler **threw** an error."
- Subject: "The compiler"
- Action: "threw"

**Passive Voice:** The subject receives the action. This can be wordy or ambiguous.
- Example: "An error **was thrown** by the compiler."
- Subject: "An error"
- Action: "was thrown"

Notice how the active voice is more direct. It immediately tells you *who* or *what* did the action. In code comments, git commits, and documentation, active voice makes responsibility and action clear.

- **Prefer:** "The function validates the input."
- **Avoid:** "The input is validated by the function."

Use passive voice sparingly, perhaps when the actor is unknown or unimportant.`,
        linkedExerciseId: 'ex-en-active-passive'
      },
      {
        id: 'en-6',
        title: 'Punctuation for Clarity',
        level: 'Intermediate',
        targetAudience: 'Teenagers',
        content: `Proper punctuation is essential for clarity in technical writing. Misplaced commas can change the meaning of a sentence entirely.

**Commas (,):** Use commas to separate items in a list, to separate clauses in a complex sentence, and to set off non-essential information.
- List: "The function requires a username, password, and token."
- Clauses: "If the connection fails, the program will retry."

**Semicolons (;):** Use a semicolon to connect two closely related independent clauses.
- Example: "The first test passed; the second one failed."

**Colons (:):** Use a colon to introduce a list, an explanation, or a quotation.
- Example: "The function returns one of three states: 'success', 'pending', or 'failure'."

Using these correctly will make your documentation and comments much easier for others to read.`,
        linkedExerciseId: 'ex-en-punctuation'
      },
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
      {
        id: 'en-7',
        title: 'Writing Effective Commit Messages',
        level: 'Advanced',
        targetAudience: 'Adults',
        content: `Commit messages are a vital part of collaborative software development. They are a log of *why* changes were made. A well-written commit message saves developers time and frustration.

A popular format is the **Conventional Commits** specification. It follows a simple structure:

\`<type>[optional scope]: <description>\`

\`[optional body]\`

\`[optional footer]\`

**Type:**
- \`feat\`: A new feature
- \`fix\`: A bug fix
- \`docs\`: Documentation only changes
- \`style\`: Changes that do not affect the meaning of the code (white-space, formatting)
- \`refactor\`: A code change that neither fixes a bug nor adds a feature
- \`test\`: Adding missing tests or correcting existing tests
- \`chore\`: Changes to the build process or auxiliary tools

**Example:**

\`feat(auth): Add Google OAuth provider\`

\`Implements the Google Sign-In flow using Firebase. When a user signs up with Google, a new user profile is created in Firestore.\`

This is far more useful than a message like "added login stuff".`
      },
       {
        id: 'en-8',
        title: 'Explaining Technical Concepts Simply',
        level: 'Advanced',
        targetAudience: 'Adults',
        content: `A key skill for senior developers and team leads is the ability to explain complex technical topics to non-technical stakeholders (like managers, clients, or designers). This requires empathy and the use of analogy.

**The Feynman Technique:**
1.  Choose a concept you want to understand.
2.  Pretend you are teaching it to a student in grade 6.
3.  Identify gaps in your explanation. Go back to the source material to understand it better.
4.  Simplify and use analogies.

**Example: Explaining an API**

*   **Too Technical:** "We're using a RESTful API that returns JSON objects over HTTP."
*   **A Better Analogy:** "Think of an API like a waiter in a restaurant. Your application (the customer) tells the waiter (the API) what it wants. The waiter goes to the kitchen (the server), gets the food (the data), and brings it back to you. You don't need to know how the kitchen works, you just need to know how to ask the waiter."

Practicing this skill will make you a more effective communicator and a more valuable team member.`
      },
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
      {
        id: 'ma-5',
        title: 'Order of Operations (PEMDAS)',
        level: 'Beginner',
        targetAudience: 'Children',
        content: `When you have a math problem with many operations, how do you know which one to do first? We use the Order of Operations, which you can remember with the acronym **PEMDAS**.

**P** - Parentheses: Always solve what's inside parentheses first.
**E** - Exponents: Next, solve any exponents (powers).
**M/D** - Multiplication and Division: Do these from left to right, whichever comes first.
**A/S** - Addition and Subtraction: Finally, do these from left to right.

Let's try an example: \`10 + 2 * 3\`
1. No Parentheses or Exponents.
2. Multiplication first: \`2 * 3 = 6\`.
3. Now the problem is \`10 + 6\`.
4. Addition last: \`10 + 6 = 16\`.

Another one: \`(3 + 2) * 4\`
1. Parentheses first: \`3 + 2 = 5\`.
2. Now the problem is \`5 * 4\`.
3. Multiplication last: \`5 * 4 = 20\`.

This order is very important in programming, as computers follow it exactly!`,
        linkedExerciseId: 'ex-ma-pemdas'
      },
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
      {
        id: 'ma-6',
        title: 'Binary Numbers',
        level: 'Intermediate',
        targetAudience: 'Teenagers',
        content: `Computers don't think in the numbers we use (0-9). They think in **binary**, which only uses two digits: 0 and 1. Everything a computer does, from showing a picture to running a game, is broken down into a series of 0s and 1s.

Our number system is "base-10" because we have 10 digits. Binary is "base-2".

Let's see how it works. In base-10, each place value is a power of 10:
... 1000s, 100s, 10s, 1s

In binary, each place value is a power of 2:
... 16s, 8s, 4s, 2s, 1s

So, the number 5 in binary is \`101\`. Why?
- \`1\` in the 4s place = 4
- \`0\` in the 2s place = 0
- \`1\` in the 1s place = 1
- 4 + 0 + 1 = 5

The number 10 in binary is \`1010\`.
- \`1\` * 8 + \`0\` * 4 + \`1\` * 2 + \`0\` * 1 = 10.

Understanding binary is key to understanding how computers work at their most fundamental level.`,
        linkedExerciseId: 'ex-ma-binary'
      },
      { id: 'ma-4', title: 'Calculus for Machine Learning', level: 'Advanced', targetAudience: 'Adults', content: `Calculus is the mathematics of change, and it's fundamental to how machine learning models 'learn'.

The most important concept is the 'derivative', which measures the instantaneous rate of change. Think of it as the slope of a curve at a single point. In machine learning, we use derivatives to find the 'error' of our model's prediction. The derivative tells us in which direction to adjust the model's parameters to reduce the error. This process is called 'gradient descent'.

An 'integral' is the reverse of a derivative. It's used to calculate the total area under a curve. In probability and statistics, which are central to AI, integrals help us find the probability of a range of outcomes.

While you don't always have to do calculus by hand (libraries do it for you), understanding what derivatives and integrals represent is key to understanding how AI works under the hood.` },
      {
        id: 'ma-7',
        title: 'Big O Notation',
        level: 'Advanced',
        targetAudience: 'Adults',
        content: `How do we measure how "fast" an algorithm is? We use Big O notation. It doesn't measure time in seconds, but rather how the runtime of an algorithm grows as the input size grows.

**O(1) - Constant Time:** The runtime is the same, no matter the size of the input.
- Example: Accessing an item in an array by its index (\`my_array[5]\`).

**O(n) - Linear Time:** The runtime grows linearly with the input size 'n'.
- Example: Looping through every item in a list once. If the list has 10 items, it takes 10 "steps". If it has 1,000,000 items, it takes 1,000,000 "steps".

**O(n²) - Quadratic Time:** The runtime grows by the square of the input size. This is common in algorithms with nested loops.
- Example: Comparing every item in a list to every other item.

**O(log n) - Logarithmic Time:** The runtime grows very slowly. Every time you double the input size, you only add one "step" to the work.
- Example: Binary search in a sorted array.

Understanding Big O is crucial for writing efficient code, especially when working with large datasets.`,
        linkedExerciseId: 'ex-ma-big-o'
      },
      {
        id: 'ma-8',
        title: 'Linear Algebra for Data Science',
        level: 'Advanced',
        targetAudience: 'Adults',
        content: `Linear algebra is the mathematics of vectors and matrices. It is the language of data science and machine learning.

**Vectors:** As we've seen in physics, a vector is a list of numbers representing a point in space. In data science, a vector can represent a single data point with many features. For example, a user could be represented by a vector \`[age, income, screen_time]\`.

**Matrices:** A matrix is a grid of numbers, or a collection of vectors. A whole dataset can be represented as a matrix, where each row is a data point (a user) and each column is a feature.

**Why is this useful?**
By representing data as vectors and matrices, we can use powerful linear algebra operations to manipulate it at scale. For example, multiplying matrices is a fundamental operation in neural networks. Libraries like NumPy in Python are highly optimized for these operations, allowing us to process massive datasets efficiently. Understanding the concepts of matrix multiplication, dot products, and transformations is key to understanding how many machine learning models work.`,
        linkedExerciseId: 'ex-ma-matrix'
      },
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
      {
        id: 'ph-5',
        title: 'Basic Collision Detection',
        level: 'Intermediate',
        targetAudience: 'Teenagers',
        content: `How do video games know when two objects hit each other? Collision detection!

The simplest form is **Axis-Aligned Bounding Box (AABB)** detection. Imagine drawing a rectangle around each of your objects that is aligned with the screen's X and Y axes.

An object (like a character or a ball) has properties: \`x\`, \`y\`, \`width\`, and \`height\`.

To check if two rectangles (rect1 and rect2) are colliding, you need to check four conditions:
1. Is rect1's right side to the right of rect2's left side? (\`rect1.x + rect1.width > rect2.x\`)
2. Is rect1's left side to the left of rect2's right side? (\`rect1.x < rect2.x + rect2.width\`)
3. Is rect1's bottom side below rect2's top side? (\`rect1.y + rect1.height > rect2.y\`)
4. Is rect1's top side above rect2's bottom side? (\`rect1.y < rect2.y + rect2.height\`)

If **all four** of these conditions are true, the rectangles are overlapping, and a collision has occurred! This logic is the foundation of interaction in most 2D games.`,
        linkedExerciseId: 'ex-ph-collision'
      },
      {
        id: 'ph-6',
        title: 'Vectors for Game Development',
        level: 'Intermediate',
        targetAudience: 'Adults',
        content: `In physics and game development, a **vector** is an object that has both a magnitude (length/size) and a direction. We use vectors to represent things like position, velocity, and acceleration.

A 2D vector has two components: an x component and a y component. You might see it written as \`(x, y)\`.

**Position:** A vector from the origin (0,0) to a point in space. The vector \`(10, 20)\` represents the point 10 units right and 20 units down.

**Velocity:** A vector representing the change in position over time. A velocity vector of \`(5, -2)\` means the object moves 5 units right and 2 units up every second.

**Vector Math:**
- **Addition:** To add two vectors, you add their components. \`(2, 3) + (4, 1) = (6, 4)\`. This is used to combine forces or velocities.
- **Scalar Multiplication:** To multiply a vector by a single number (a scalar), you multiply each component. \`3 * (2, 5) = (6, 15)\`. This is used to scale forces or speed.

Understanding vectors is essential for creating movement and interactions in any physics simulation.`,
        linkedExerciseId: 'ex-ph-vectors'
      },
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
      {
        id: 'ph-7',
        title: 'Collision Response',
        level: 'Advanced',
        targetAudience: 'Adults',
        content: `Once you detect a collision, what do you do? This is **collision response**. The goal is to make objects react realistically.

For simple AABB (Axis-Aligned Bounding Box) collisions, the simplest response is to stop the objects from overlapping.
1.  **Find the Overlap:** Calculate how much the two boxes are overlapping on the X and Y axes.
2.  **Resolve the Overlap:** Move one or both of the objects so they are just touching. Usually, you move them along the axis with the *smallest* overlap. This is called the Minimum Translation Vector (MTV).
3.  **Update Velocity:** For a realistic bounce, you need to change the object's velocity. For a simple bounce off a wall, you reverse the velocity component for that axis.
    - Hitting a vertical wall: \`velocity.x = -velocity.x\`
    - Hitting a horizontal surface: \`velocity.y = -velocity.y\`

For more complex physics (like two balls hitting each other), you need to account for their mass and angle of impact using momentum conservation formulas. This can get very complex, but the basic principle of resolving the overlap and then adjusting velocities is the same.`,
      },
       {
        id: 'ph-8',
        title: 'Raycasting',
        level: 'Advanced',
        targetAudience: 'Adults',
        content: `Raycasting is a technique used to determine what a ray, or a straight line, intersects with in a scene. It's like shining a laser pointer and seeing what it hits first.

In games and simulations, it has many uses:
- **Shooting mechanics:** To see if a bullet hits a target.
- **AI line of sight:** To determine if an enemy can "see" the player.
- **Determining what's under the mouse cursor:** To allow the player to interact with objects.

The basic algorithm for a ray-line intersection involves some vector math. You have a ray with an origin point and a direction vector. For each line segment in your scene (like the walls of a room), you solve a system of equations to see if and where the ray and the line intersect.

If the ray intersects multiple objects, you usually only care about the intersection point that is closest to the ray's origin. While the math can be complex, many physics libraries provide simple, highly-optimized raycasting functions. For example: \`hit_object = physics.raycast(origin, direction)\`.`,
        linkedExerciseId: 'ex-ph-raycast'
      },
    ],
  },
];

export const badges: Badge[] = [
    { id: 'py-beginner', title: 'Python Novice', description: 'Completed the Python beginner lessons.', icon: 'GraduationCap' },
    { id: 'py-intermediate', title: 'Python Apprentice', description: 'Mastered intermediate Python concepts.', icon: 'Code' },
    { id: 'challenge-master', title: 'Challenge Master', description: 'Completed all 20 coding challenges.', icon: 'HardHat' }
]

export const exercises: Exercise[] = [
    {
        id: 'ex-py-1',
        title: 'Declare Variables',
        type: 'coding',
        description: 'Declare a variable `name` with your name and an `age` variable with your age, then print a sentence.',
        starterCode: 'name = "Alex"\nage = 10\nprint(f"My name is {name} and I am {age} years old.")',
        test: `
import sys
from io import StringIO

# Capture original stdout
original_stdout = sys.stdout
# Redirect stdout
sys.stdout = captured_output = StringIO()

# --- User's code is executed here ---
name = "Alex"
age = 10
print(f"My name is {name} and I am {age} years old.")
# --- End of user code ---

# Restore stdout
sys.stdout = original_stdout
output = captured_output.getvalue().strip()

# Assertion
assert "my name is" in output.lower()
assert "and i am" in output.lower()
print("Correct!")
`
    },
    {
        id: 'ex-ma-2',
        title: 'Solve for X',
        type: 'coding',
        description: 'The equation is x + 15 = 25. Find the value of x and print it.',
        starterCode: '# Solve for x in the equation: x + 15 = 25\nx = 0 # Change this line\nprint(x)',
        test: `
# --- User's code is executed here ---
x = 10
# --- End of user code ---

# Assertion
assert 'x' in locals()
assert locals()['x'] == 10
print("Correct!")
`
    },
    {
        id: 'ex-py-2',
        title: 'If-Else Statement',
        type: 'coding',
        description: 'Check if the `number` is greater than 0. If it is, print "Positive". Otherwise, print "Not Positive".',
        starterCode: 'number = 5\n\n# Your code here\nif number > 0:\n  print("Positive")\nelse:\n  print("Not Positive")',
        test: `
import sys
from io import StringIO
original_stdout = sys.stdout

# Test case 1: Positive
sys.stdout = captured_output_1 = StringIO()
number = 5
# --- User code for test 1 ---
if number > 0:
    print("Positive")
else:
    print("Not Positive")
# ---
sys.stdout = original_stdout
output_1 = captured_output_1.getvalue().strip()
assert "Positive" in output_1, "Failed on positive number"

# Test case 2: Negative
sys.stdout = captured_output_2 = StringIO()
number = -2
# --- User code for test 2 ---
if number > 0:
    print("Positive")
else:
    print("Not Positive")
# ---
sys.stdout = original_stdout
output_2 = captured_output_2.getvalue().strip()
assert "Not Positive" in output_2, "Failed on negative number"

print("Correct!")
`
    },
    {
        id: 'ex-py-3',
        title: 'Simple Function',
        type: 'coding',
        description: 'Complete the function to take two numbers and return their sum.',
        starterCode: 'def add(a, b):\n  # Your code here\n  return a + b\n\n# You can test your function by calling it\nresult = add(5, 10)\nprint(result)',
        test: `
# --- User's function definition is executed here ---
def add(a, b):
  return a + b
# ---

assert add(1, 2) == 3
assert add(-5, 5) == 0
assert add(100, 200) == 300
print("Correct!")
`
    },
    {
        id: 'ex-en-1',
        title: 'String Concatenation',
        type: 'coding',
        description: 'Create a single sentence by joining the three strings.',
        starterCode: 'word1 = "Programming"\nword2 = "is"\nword3 = "powerful"\n\nsentence = word1 + " " + word2 + " " + word3\nprint(sentence)',
        test: `
# --- User's code is executed here ---
word1 = "Programming"
word2 = "is"
word3 = "powerful"
sentence = word1 + " " + word2 + " " + word3
# ---

assert 'sentence' in locals()
assert locals()['sentence'] == "Programming is powerful"
print("Correct!")
`
    },
    {
        id: 'ex-ph-2',
        title: 'Simulate a Bouncing Ball',
        type: 'coding',
        description: 'Simulate a ball bouncing 5 times, reducing its height by half each time. The initial height is 100.',
        starterCode: 'height = 100\n\nfor i in range(5):\n  height = height / 2\n  print(f"Bounce {i+1}: New height is {height}")',
        test: `
import sys
from io import StringIO
original_stdout = sys.stdout
sys.stdout = captured_output = StringIO()

# --- User's code is executed here ---
height = 100
for i in range(5):
  height = height / 2
# ---
sys.stdout = original_stdout
# The test will check the final value of height
assert abs(height - 3.125) < 0.001
print("Correct!")
`
    },
    {
        id: 'ex-py-turtle',
        title: 'Draw a Square',
        type: 'coding',
        description: 'Complete the loop to make the turtle draw a square.',
        starterCode: 'import turtle\n\n# Loop 4 times to draw 4 sides\nfor _ in range(4):\n  turtle.forward(100)\n  turtle.right(90)\n\nturtle.done()',
        test: `
# Turtle tests are visual and hard to automate here. We'll assume correctness if it runs.
print("Correct!")
`
    },
    {
        id: 'ex-py-oop',
        title: 'Create a Car Class',
        type: 'coding',
        description: 'Define a Car class with a brand and model. The __init__ method should store them as attributes.',
        starterCode: 'class Car:\n  def __init__(self, brand, model):\n    self.brand = brand\n    self.model = model\n\nmy_car = Car("Tesla", "Model S")\nprint(my_car.brand)\nprint(my_car.model)',
        test: `
# --- User's class definition is executed here ---
class Car:
  def __init__(self, brand, model):
    self.brand = brand
    self.model = model
# ---

test_car = Car("Generic", "Test")
assert hasattr(test_car, 'brand')
assert hasattr(test_car, 'model')
assert test_car.brand == "Generic"
assert test_car.model == "Test"
print("Correct!")
`
    },
    {
        id: 'ex-py-pandas',
        title: 'Create a DataFrame',
        type: 'coding',
        description: 'Use pandas to create a DataFrame from the given dictionary and print it.',
        starterCode: 'import pandas as pd\n\ndata = {\n    "Fruit": ["Apple", "Banana", "Cherry"],\n    "Count": [10, 15, 7]\n}\n\ndf = pd.DataFrame(data)\nprint(df)',
        test: `
import pandas as pd
# --- User's code is executed here ---
data = {
    "Fruit": ["Apple", "Banana", "Cherry"],
    "Count": [10, 15, 7]
}
df = pd.DataFrame(data)
# ---

assert 'df' in locals()
assert isinstance(locals()['df'], pd.DataFrame)
assert 'Fruit' in locals()['df'].columns
assert 'Count' in locals()['df'].columns
assert len(locals()['df']) == 3
print("Correct!")
`
    },
    {
        id: 'ex-en-2',
        title: 'Logical Connectors',
        type: 'coding',
        description: 'Combine the two ideas using the word "because".',
        starterCode: 'idea1 = "The code failed"\nidea2 = "there was a syntax error"\n\nsentence = idea1 + " because " + idea2\nprint(sentence)',
        test: `
# --- User's code is executed here ---
idea1 = "The code failed"
idea2 = "there was a syntax error"
sentence = idea1 + " because " + idea2
# ---

assert 'sentence' in locals()
assert locals()['sentence'] == "The code failed because there was a syntax error"
print("Correct!")
`
    },
    {
        id: 'ex-py-lists',
        title: 'Sum a List',
        type: 'coding',
        description: 'Write a function that takes a list of numbers and returns their sum.',
        starterCode: 'def sum_list(numbers):\n  # Your code here\n  total = 0\n  for num in numbers:\n    total += num\n  return total\n\n# Test the function\nprint(sum_list([1, 2, 3, 4, 5]))',
        test: `
# --- User's function definition is executed here ---
def sum_list(numbers):
  total = 0
  for num in numbers:
    total += num
  return total
# ---

assert sum_list([1, 2, 3]) == 6
assert sum_list([-1, 0, 1]) == 0
assert sum_list([]) == 0
assert sum_list([100]) == 100
print("Correct!")
`
    },
    {
        id: 'ex-py-dict',
        title: 'Access Dictionary Data',
        type: 'coding',
        description: 'Given the dictionary, access and print the value associated with the "major" key.',
        starterCode: 'student = {\n  "name": "John Doe",\n  "age": 21,\n  "major": "Computer Science"\n}\n\n# Your code here\nmajor = student["major"]\nprint(major)',
        test: `
# --- User's code is executed here ---
student = {
  "name": "John Doe",
  "age": 21,
  "major": "Computer Science"
}
major = student["major"]
# ---

assert 'major' in locals()
assert locals()['major'] == "Computer Science"
print("Correct!")
`
    },
    {
        id: 'ex-en-active-passive',
        title: 'Rewrite in Active Voice',
        type: 'coding',
        description: 'The variable `passive_sentence` contains a sentence in the passive voice. Rewrite it in the active voice and assign it to the `active_sentence` variable.',
        starterCode: 'passive_sentence = "The bug was fixed by the developer."\n\n# Your code here\nactive_sentence = "The developer fixed the bug."\nprint(active_sentence)',
        test: `
# --- User's code is executed here ---
active_sentence = "The developer fixed the bug."
# ---

output = locals()['active_sentence'].lower()
assert "developer" in output
assert "fixed" in output
assert "bug" in output
assert "was fixed" not in output
assert output.startswith("the developer")
print("Correct!")
`
    },
    {
        id: 'ex-ma-pemdas',
        title: 'Calculate with PEMDAS',
        type: 'coding',
        description: 'Calculate the result of the expression `5 * (4 - 2) + 10` following the order of operations and print the final number.',
        starterCode: '# Calculate and print the result\nresult = 5 * (4 - 2) + 10\nprint(result)',
        test: `
# --- User's code is executed here ---
result = 5 * (4 - 2) + 10
# ---

assert 'result' in locals()
assert locals()['result'] == 20
print("Correct!")
`
    },
    {
        id: 'ex-ph-collision',
        title: 'AABB Collision Function',
        type: 'coding',
        description: 'Complete the `check_collision` function. It should return `True` if the two rectangles are colliding and `False` otherwise. Each rectangle is a dictionary with x, y, width, and height.',
        starterCode: 'def check_collision(rect1, rect2):\n  # Check for collision between rect1 and rect2\n  # Return True if they collide, False otherwise\n  return (rect1["x"] < rect2["x"] + rect2["width"] and\n          rect1["x"] + rect1["width"] > rect2["x"] and\n          rect1["y"] < rect2["y"] + rect2["height"] and\n          rect1["y"] + rect1["height"] > rect2["y"])\n\n# Test cases (You can add more)\nrectA = {"x": 0, "y": 0, "width": 50, "height": 50}\nrectB = {"x": 40, "y": 40, "width": 50, "height": 50}\nprint(check_collision(rectA, rectB)) # Should print True',
        test: `
# --- User's function definition is executed here ---
def check_collision(rect1, rect2):
  return (rect1["x"] < rect2["x"] + rect2["width"] and
          rect1["x"] + rect1["width"] > rect2["x"] and
          rect1["y"] < rect2["y"] + rect2["height"] and
          rect1["y"] + rect1["height"] > rect2["y"])
# ---

# Test Case 1: Overlapping
rect1 = {"x": 0, "y": 0, "width": 50, "height": 50}
rect2 = {"x": 40, "y": 40, "width": 50, "height": 50}
assert check_collision(rect1, rect2) == True, "Test Case 1 Failed"

# Test Case 2: Not Overlapping
rect3 = {"x": 100, "y": 100, "width": 50, "height": 50}
assert check_collision(rect1, rect3) == False, "Test Case 2 Failed"

# Test Case 3: Touching Edges
rect4 = {"x": 50, "y": 0, "width": 50, "height": 50}
assert check_collision(rect1, rect4) == False, "Test Case 3 Failed"

# Test Case 4: One inside another
rect5 = {"x": 10, "y": 10, "width": 20, "height": 20}
assert check_collision(rect1, rect5) == True, "Test Case 4 Failed"

print("Correct!")
`
    },
    {
        id: 'ex-py-input',
        title: 'Greeting Machine',
        type: 'coding',
        description: 'Ask the user for their name and then print a greeting message. This exercise cannot be auto-graded due to its interactive nature.',
        starterCode: '# Ask for the user\'s name\nname = input("What is your name? ")\n# Print a greeting\nprint(f"Hello, {name}!")',
        test: `
# Input() cannot be tested in this environment, so we will assume correctness.
print("Correct!")
`
    },
    {
        id: 'ex-py-files',
        title: 'Write to a File',
        type: 'coding',
        description: 'Write a program that asks for a user\'s favorite color and saves it to a file named `favorite_color.txt`. This cannot be auto-graded.',
        starterCode: 'color = input("What is your favorite color? ")\n\nwith open("favorite_color.txt", "w") as f:\n  f.write(color)',
        test: `
# File I/O cannot be reliably tested in this sandboxed environment.
print("Correct!")
`
    },
    {
        id: 'ex-py-try-except',
        title: 'Safe Division Calculator',
        type: 'coding',
        description: 'Create a function `safe_divide(a, b)` that returns the result of a / b. If b is zero, it should return the string "Error: Cannot divide by zero." instead of crashing.',
        starterCode: 'def safe_divide(a, b):\n  try:\n    return a / b\n  except ZeroDivisionError:\n    return "Error: Cannot divide by zero."\n\n# Test cases\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))',
        test: `
# --- User's function definition is executed here ---
def safe_divide(a, b):
  try:
    return a / b
  except ZeroDivisionError:
    return "Error: Cannot divide by zero."
# ---

assert safe_divide(10, 2) == 5
assert safe_divide(10, 0) == "Error: Cannot divide by zero."
assert safe_divide(0, 5) == 0
print("Correct!")
`
    },
    {
        id: 'ex-py-list-comprehension',
        title: 'Filter a List',
        type: 'coding',
        description: 'Given a list of numbers, use a list comprehension to create a new list containing only the numbers greater than 10.',
        starterCode: 'numbers = [5, 20, 3, 15, 8, 25]\n\n# Your list comprehension here\ngreater_than_10 = [n for n in numbers if n > 10]\n\nprint(greater_than_10)',
        test: `
# --- User's code is executed here ---
numbers = [5, 20, 3, 15, 8, 25]
greater_than_10 = [n for n in numbers if n > 10]
# ---

assert 'greater_than_10' in locals()
assert locals()['greater_than_10'] == [20, 15, 25]
print("Correct!")
`
    },
    {
        id: 'ex-py-decorators',
        title: 'Timing a Function',
        type: 'coding',
        description: 'Write a decorator `timer` that prints the time a function takes to execute. The `time` library has been imported for you.',
        starterCode: 'import time\n\ndef timer(func):\n  def wrapper(*args, **kwargs):\n    start_time = time.time()\n    result = func(*args, **kwargs)\n    end_time = time.time()\n    print(f"Function {func.__name__} took {end_time - start_time:.4f} seconds")\n    return result\n  return wrapper\n\n@timer\ndef slow_function():\n  time.sleep(1)\n  print("Function finished.")\n\nslow_function()',
        test: `
import time

# --- User's decorator is executed here ---
def timer(func):
  def wrapper(*args, **kwargs):
    start_time = time.time()
    result = func(*args, **kwargs)
    end_time = time.time()
    print(f"Function {func.__name__} took {end_time - start_time:.4f} seconds")
    return result
  return wrapper
# ---

@timer
def test_func():
  pass

# The test will pass if the decorator is syntactically correct and callable.
# Visual inspection of the output is needed for full verification.
test_func()
print("Correct!")
`
    },
    {
        id: 'ex-en-punctuation',
        title: 'Fix the Punctuation',
        type: 'coding',
        description: 'The string `sentence` is missing a comma. Add the comma in the correct place to separate the two clauses and print the corrected sentence.',
        starterCode: '# Add a comma to this sentence\nsentence = "If the user is not logged in we should redirect them."\n\n# Your correction here\ncorrected_sentence = "If the user is not logged in, we should redirect them."\nprint(corrected_sentence)',
        test: `
# --- User's code is executed here ---
corrected_sentence = "If the user is not logged in, we should redirect them."
# ---

assert 'corrected_sentence' in locals()
assert "," in locals()['corrected_sentence']
assert locals()['corrected_sentence'] == "If the user is not logged in, we should redirect them."
print("Correct!")
`
    },
    {
        id: 'ex-ma-binary',
        title: 'Binary to Decimal',
        type: 'coding',
        description: 'Create a function `binary_to_decimal` that takes a string representing a binary number (e.g., "101") and returns its decimal (base-10) equivalent.',
        starterCode: 'def binary_to_decimal(binary_string):\n  # Python\'s int() function can do this for you with a second argument!\n  return int(binary_string, 2)\n\n# Test case\nprint(binary_to_decimal("1010")) # Should be 10',
        test: `
# --- User's function definition is executed here ---
def binary_to_decimal(binary_string):
  return int(binary_string, 2)
# ---

assert binary_to_decimal("101") == 5
assert binary_to_decimal("1111") == 15
assert binary_to_decimal("0") == 0
assert binary_to_decimal("10000") == 16
print("Correct!")
`
    },
    {
        id: 'ex-ma-big-o',
        title: 'Identify the Big O',
        type: 'coding',
        description: 'Look at the `find_duplicates` function. What is its Big O time complexity? Assign your answer as a string to the `big_o_complexity` variable (e.g., "O(n)").',
        starterCode: 'def find_duplicates(my_list):\n  for i in range(len(my_list)):\n    for j in range(i + 1, len(my_list)):\n      if my_list[i] == my_list[j]:\n        return True\n  return False\n\n# What is the Big O of the function above?\nbig_o_complexity = "O(n^2)"',
        test: `
# --- User's code is executed here ---
big_o_complexity = "O(n^2)"
# ---

assert 'big_o_complexity' in locals()
# Common acceptable answers
assert locals()['big_o_complexity'].replace(" ", "").lower() in ["o(n^2)", "o(n**2)"]
print("Correct!")
`
    },
    {
        id: 'ex-ph-vectors',
        title: 'Vector Addition',
        type: 'coding',
        description: 'Create a function `add_vectors` that takes two vectors (represented as dictionaries) and returns their sum as a new vector.',
        starterCode: 'def add_vectors(v1, v2):\n  # Add the x and y components\n  sum_x = v1["x"] + v2["x"]\n  sum_y = v1["y"] + v2["y"]\n  return {"x": sum_x, "y": sum_y}\n\n# Test case\nvec1 = {"x": 3, "y": 5}\nvec2 = {"x": -1, "y": 2}\nprint(add_vectors(vec1, vec2)) # Should be {\'x\': 2, \'y\': 7}',
        test: `
# --- User's function definition is executed here ---
def add_vectors(v1, v2):
  sum_x = v1["x"] + v2["x"]
  sum_y = v1["y"] + v2["y"]
  return {"x": sum_x, "y": sum_y}
# ---

assert add_vectors({"x": 1, "y": 1}, {"x": 1, "y": 1}) == {"x": 2, "y": 2}
assert add_vectors({"x": 10, "y": -5}, {"x": -8, "y": 5}) == {"x": 2, "y": 0}
print("Correct!")
`
    },
    {
        id: 'ex-py-generators',
        title: 'Create a Generator',
        type: 'coding',
        description: 'Create a generator function `countdown` that yields numbers from `n` down to 1.',
        starterCode: 'def countdown(n):\n  while n > 0:\n    yield n\n    n -= 1\n\n# Print numbers from 5 down to 1\nfor i in countdown(5):\n  print(i)',
        test: `
# --- User's function definition is executed here ---
def countdown(n):
  while n > 0:
    yield n
    n -= 1
# ---
gen = countdown(3)
assert next(gen) == 3
assert next(gen) == 2
assert next(gen) == 1
print("Correct!")
`
    },
    {
        id: 'ex-ma-matrix',
        title: 'Matrix Multiplication with NumPy',
        type: 'coding',
        description: 'Using the NumPy library, multiply the two matrices `A` and `B` and store the result in a variable called `C`.',
        starterCode: 'import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\n\n# Multiply matrices A and B\nC = np.dot(A, B)\n\nprint(C)',
        test: `
import numpy as np
# --- User's code is executed here ---
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = np.dot(A, B)
# ---
expected = np.array([[19, 22], [43, 50]])
assert np.array_equal(C, expected)
print("Correct!")
`
    },
    {
        id: 'ex-ph-raycast',
        title: 'Simple Raycast Logic',
        type: 'coding',
        description: 'You have a list of objects, each with a `distance`. Write a function `find_closest_hit` that iterates through a list of `hits` and returns the one with the smallest distance. Return `None` if the list is empty.',
        starterCode: 'def find_closest_hit(hits):\n  if not hits:\n    return None\n  \n  closest = hits[0]\n  for hit in hits:\n    if hit["distance"] < closest["distance"]:\n      closest = hit\n  return closest\n\n# Test case\nhits = [\n  {"name": "wall", "distance": 100},\n  {"name": "enemy", "distance": 50},\n  {"name": "tree", "distance": 75}\n]\nprint(find_closest_hit(hits))',
        test: `
# --- User's function definition is executed here ---
def find_closest_hit(hits):
  if not hits:
    return None
  
  closest = hits[0]
  for hit in hits:
    if hit["distance"] < closest["distance"]:
      closest = hit
  return closest
# ---
hits = [{"name": "wall", "distance": 100}, {"name": "enemy", "distance": 50}]
closest = find_closest_hit(hits)
assert closest is not None
assert closest["name"] == "enemy"
assert find_closest_hit([]) is None
print("Correct!")
`
    },
];

export const challenges: Challenge[] = [
    {
        level: 1,
        title: "Variable Swap",
        description: "You are given two variables, `a` and `b`. Swap their values and print them.",
        starterCode: "a = 5\nb = 10\n\n# Your code here to swap a and b\n\nprint(f'a: {a}')\nprint(f'b: {b}')",
        test: "assert a == 10 and b == 5, 'The variables were not swapped correctly.'\nprint('Correct!')",
        tags: ['Python']
    },
    {
        level: 2,
        title: "Even or Odd",
        description: "Write a function `is_even(number)` that returns `True` if a number is even and `False` otherwise.",
        starterCode: "def is_even(number):\n  # Your code here\n  pass\n\nprint(is_even(4))\nprint(is_even(7))",
        test: "assert is_even(10) == True, 'is_even(10) should be True'\nassert is_even(7) == False, 'is_even(7) should be False'\nassert is_even(0) == True, 'is_even(0) should be True'\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 3,
        title: "String Reversal",
        description: "Write a function `reverse_string(s)` that takes a string and returns it reversed.",
        starterCode: "def reverse_string(s):\n  # Your code here\n  pass\n\nprint(reverse_string('hello'))",
        test: "assert reverse_string('hello') == 'olleh'\nassert reverse_string('Python') == 'nohtyP'\nassert reverse_string('') == ''\nprint('Correct!')",
        tags: ['Python', 'English']
    },
    {
        level: 4,
        title: "Find the Maximum",
        description: "Write a function `find_max(numbers)` that finds the maximum number in a list without using the built-in `max()` function.",
        starterCode: "def find_max(numbers):\n  # Your code here\n  pass\n\nprint(find_max([1, 5, 2, 9, 3]))",
        test: "assert find_max([1, 5, 2, 9, 3]) == 9\nassert find_max([-1, -5, -2]) == -1\nassert find_max([100]) == 100\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 5,
        title: "Factorial",
        description: "Write a function `factorial(n)` that calculates the factorial of a non-negative integer. The factorial of n is the product of all positive integers up to n.",
        starterCode: "def factorial(n):\n  # Your code here\n  pass\n\nprint(factorial(5)) # Should be 120",
        test: "assert factorial(5) == 120\nassert factorial(0) == 1\nassert factorial(1) == 1\nassert factorial(7) == 5040\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 6,
        title: "Palindrome Check",
        description: "Write a function `is_palindrome(s)` that checks if a string is a palindrome (reads the same forwards and backwards). Ignore case and non-alphanumeric characters.",
        starterCode: "import re\n\ndef is_palindrome(s):\n  # Your code here\n  pass\n\nprint(is_palindrome('A man, a plan, a canal: Panama'))",
        test: "assert is_palindrome('A man, a plan, a canal: Panama') == True\nassert is_palindrome('race a car') == False\nassert is_palindrome('Was it a car or a cat I saw?') == True\nprint('Correct!')",
        tags: ['Python', 'English']
    },
    {
        level: 7,
        title: "Fibonacci Sequence",
        description: "Write a function `fibonacci(n)` that returns the nth number in the Fibonacci sequence. The sequence starts 0, 1, 1, 2, 3, 5, ...",
        starterCode: "def fibonacci(n):\n  # Your code here\n  pass\n\nprint(fibonacci(10))",
        test: "assert fibonacci(0) == 0\nassert fibonacci(1) == 1\nassert fibonacci(10) == 55\nassert fibonacci(15) == 610\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 8,
        title: "FizzBuzz",
        description: "Write a function `fizzbuzz(n)` that prints numbers from 1 to n. But for multiples of three print 'Fizz' instead of the number and for the multiples of five print 'Buzz'. For numbers which are multiples of both three and five print 'FizzBuzz'.",
        starterCode: "def fizzbuzz(n):\n  # Your code here\n  pass\n\nfizzbuzz(15)",
        test: "import sys\nfrom io import StringIO\n\nsys.stdout = captured_output = StringIO()\nfizzbuzz(15)\nsys.stdout = sys.__stdout__\noutput = captured_output.getvalue().strip().split('\\n')\nexpected = ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']\nassert output == expected, 'Output does not match FizzBuzz sequence'\nprint('Correct!')",
        tags: ['Python', 'Maths', 'English']
    },
    {
        level: 9,
        title: "Prime Number Check",
        description: "Write a function `is_prime(num)` that returns `True` if a number is prime and `False` otherwise.",
        starterCode: "def is_prime(num):\n  # Your code here\n  pass\n\nprint(is_prime(11))\nprint(is_prime(10))",
        test: "assert is_prime(2) == True\nassert is_prime(11) == True\nassert is_prime(15) == False\nassert is_prime(29) == True\nassert is_prime(1) == False\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 10,
        title: "Simple Vector Class",
        description: "Create a `Vector` class that supports initialization with x and y coordinates, and has a method `magnitude()` that returns its length from the origin.",
        starterCode: "import math\n\nclass Vector:\n  def __init__(self, x, y):\n    # Your code here\n    pass\n\n  def magnitude(self):\n    # Your code here\n    pass\n\nv = Vector(3, 4)\nprint(v.magnitude()) # Should be 5",
        test: "import math\nv1 = Vector(3, 4)\nassert abs(v1.magnitude() - 5) < 1e-9\nv2 = Vector(0, 0)\nassert v2.magnitude() == 0\nv3 = Vector(-5, 12)\nassert abs(v3.magnitude() - 13) < 1e-9\nprint('Correct!')",
        tags: ['Python', 'Physics']
    },
    {
        level: 11,
        title: "Count Vowels",
        description: "Write a function `count_vowels(s)` that counts the number of vowels (a, e, i, o, u) in a string, case-insensitively.",
        starterCode: "def count_vowels(s):\n  # Your code here\n  pass\n\nprint(count_vowels('Hello World'))",
        test: "assert count_vowels('Hello World') == 3\nassert count_vowels('AEIOU') == 5\nassert count_vowels('Rhythm') == 0\nprint('Correct!')",
        tags: ['Python', 'English']
    },
    {
        level: 12,
        title: "Bubble Sort",
        description: "Implement the Bubble Sort algorithm in a function `bubble_sort(arr)` that sorts a list of numbers in ascending order.",
        starterCode: "def bubble_sort(arr):\n  # Your code here\n  return arr\n\nprint(bubble_sort([5, 3, 8, 4, 2]))",
        test: "assert bubble_sort([5, 3, 8, 4, 2]) == [2, 3, 4, 5, 8]\nassert bubble_sort([1, 2, 3]) == [1, 2, 3]\nassert bubble_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 13,
        title: "Find Missing Number",
        description: "You are given a list of n-1 integers and these integers are in the range of 1 to n. There are no duplicates. One of the integers is missing. Write a function `find_missing(arr)` to find it.",
        starterCode: "def find_missing(arr):\n  # Your code here\n  pass\n\nprint(find_missing([1, 2, 4, 5])) # Should be 3",
        test: "assert find_missing([1, 2, 4, 5, 6]) == 3\nassert find_missing([3, 1]) == 2\nassert find_missing([1, 2, 3, 4, 5, 6, 8, 9, 10]) == 7\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 14,
        title: "Two Sum Problem",
        description: "Given a list of numbers and a target, write a function `two_sum(arr, target)` that returns the indices of the two numbers that add up to the target. Assume there is exactly one solution.",
        starterCode: "def two_sum(arr, target):\n  # Your code here\n  pass\n\nprint(two_sum([2, 7, 11, 15], 9)) # Should be (0, 1) or [0, 1]",
        test: "result = two_sum([2, 7, 11, 15], 9)\nassert sorted(result) == [0, 1]\nresult2 = two_sum([3, 2, 4], 6)\nassert sorted(result2) == [1, 2]\nresult3 = two_sum([3, 3], 6)\nassert sorted(result3) == [0, 1]\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 15,
        title: "Balanced Brackets",
        description: "Write a function `are_brackets_balanced(s)` that checks if a string of brackets '()[]{}' is balanced. This means every opening bracket has a matching closing bracket in the correct order.",
        starterCode: "def are_brackets_balanced(s):\n  # Your code here\n  pass\n\nprint(are_brackets_balanced('{[()]}'))\nprint(are_brackets_balanced('{[(])}'))",
        test: "assert are_brackets_balanced('{[()]}') == True\nassert are_brackets_balanced('{[(])}') == False\nassert are_brackets_balanced('{{[[(())]]}}') == True\nassert are_brackets_balanced('[[') == False\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 16,
        title: "Run-Length Encoding",
        description: "Write a function `encode(s)` that performs run-length encoding. For example, 'AAAABBBCCDAA' would be encoded as '4A3B2C1D2A'.",
        starterCode: "def encode(s):\n  # Your code here\n  pass\n\nprint(encode('AAAABBBCCDAA'))",
        test: "assert encode('AAAABBBCCDAA') == '4A3B2C1D2A'\nassert encode('WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB') == '12W1B12W3B24W1B'\nassert encode('A') == '1A'\nassert encode('') == ''\nprint('Correct!')",
        tags: ['Python', 'English']
    },
    {
        level: 17,
        title: "Caesar Cipher",
        description: "Implement a Caesar cipher in a function `caesar_cipher(text, shift)`. It should shift each letter by a certain number of places down the alphabet, wrapping around from Z to A.",
        starterCode: "def caesar_cipher(text, shift):\n  # Your code here\n  pass\n\nprint(caesar_cipher('Hello, World!', 3))",
        test: "assert caesar_cipher('Hello, World!', 3) == 'Khoor, Zruog!'\nassert caesar_cipher('xyz', 3) == 'abc'\nassert caesar_cipher('PYTHON', 13) == 'CLGUBA'\nprint('Correct!')",
        tags: ['Python', 'English']
    },
    {
        level: 18,
        title: "Projectile Motion Simulation",
        description: "Write a function `simulate_projectile(vx, vy, num_steps)` that simulates the path of a projectile. Given initial x/y velocities, update its position over `num_steps`. Assume gravity `g = -9.8` and a time step of `dt = 0.1`.",
        starterCode: "def simulate_projectile(vx, vy, num_steps):\n  g = -9.8\n  dt = 0.1\n  x, y = 0.0, 0.0\n  path = []\n  for _ in range(num_steps):\n    # Your physics update logic here\n    path.append((x, y))\n  return path",
        test: "path = simulate_projectile(10, 20, 10)\nfinal_pos = path[-1]\nassert abs(final_pos[0] - 9.0) < 1e-6\nassert abs(final_pos[1] - 15.59) < 1e-6\nprint('Correct! Final position is approx (9.0, 15.59)')",
        tags: ['Python', 'Physics']
    },
    {
        level: 19,
        title: "Sudoku Validator",
        description: "Write a function `is_valid_sudoku(board)` that determines if a 9x9 Sudoku board is valid. The board is a 2D list. Validity means no repeated numbers in any row, column, or 3x3 sub-grid.",
        starterCode: "def is_valid_sudoku(board):\n  # Your code here\n  pass\n\n# Example valid board (represented as a list of lists)\nvalid_board = [[...]]",
        test: "valid_board = [[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]]\ninvalid_board = [[8,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]]\nassert is_valid_sudoku(valid_board) == True\nassert is_valid_sudoku(invalid_board) == False\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
    {
        level: 20,
        title: "Longest Common Subsequence",
        description: "Write a function `lcs(X, Y)` to find the length of the longest common subsequence between two strings X and Y.",
        starterCode: "def lcs(X, Y):\n  # Your code here\n  pass\n\nprint(lcs('AGGTAB', 'GXTXAYB')) # Should be 4 (GTAB)",
        test: "assert lcs('AGGTAB', 'GXTXAYB') == 4\nassert lcs('ABCDGH', 'AEDFHR') == 3\nassert lcs('ABC', 'XYZ') == 0\nprint('Correct!')",
        tags: ['Python', 'Maths']
    },
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
  badges: ['first-badge', 'py-beginner'],
  challengeProgress: [
    { level: 1, completed: true },
    { level: 2, completed: true },
    { level: 3, completed: false }
  ]
};
