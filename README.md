Got it! Here’s the updated `README.md` with the license section removed:

---

# EduCore – Adaptive Learning Platform

EduCore is a serverless learning platform designed to teach Python, English, Maths, and Physics in a way that strengthens foundational skills and directly applies them to coding exercises. It’s built for learners of all ages with interactive lessons, auto-graded exercises, and personalized AI assistance.

---

## Features

* **Multi-Subject Learning Tracks**: Python, English, Maths, Physics with Fundamentals → Advanced levels.
* **Linked Learning Flow**: Concepts connect to coding exercises to reinforce understanding.
* **Interactive Code Runner**: In-browser Python sandbox using Pyodide.
* **AI Chatbot Assistance**: Get contextual help when stuck on lessons.
* **Progress Dashboard**: Track lesson completion, exercise attempts, and performance.
* **Language Translation**: Free translation support via LibreTranslate API.
* **Secure Authentication**: Firebase Authentication with Email/Password, Google, or Anonymous login.
* **Serverless Database**: Cloud Firestore stores user data, lessons, and progress with role-based access control.
* **Auto-Graded Exercises**: Submit answers and get immediate feedback.
* **Profile and Accessibility**: Achievements, badges, font size adjustments, high-contrast mode.
* **Support System**: Users can submit tickets, administrators can view/manage them.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Set up Environment Variables

Create a `.env.local` file in the project root with the following values from your Firebase project:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

> Make sure `.env.local` is in your `.gitignore` so keys are not pushed to GitHub.

---

### 4. Run Locally

```bash
npm run dev
```

Open your browser at `http://localhost:3000` to view the app.

---

### 5. Deploy to Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login:

```bash
firebase login
```

3. Initialize hosting (if not done yet):

```bash
firebase init hosting
```

* Select your project.
* Public folder: `.next` (for SSR) or `out` (if using `next export`).
* Single-page app: Yes.
* Don’t overwrite `index.html`.

4. Deploy:

```bash
firebase deploy
```

Your live URL will be provided after deployment.

---

## Project Structure

```
├── .env.local           # Environment variables (ignored by Git)
├── src                  # Source files
│   ├── app              # Pages and routing
│   ├── components       # UI components
│   └── firebase         # Firebase config and client provider
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make changes and commit: `git commit -m "Add your feature"`.
4. Push branch: `git push origin feature/your-feature`.
5. Create a pull request.
