import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";

// Make sure to put your valid API key in .env.local as NEXT_PUBLIC_GOOGLE_API_KEY
// and restart the development server after updating
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, // your Google API key
      model: "text-bison-001", // supported model
      temperature: 0.7, // optional: controls creativity
      maxOutputTokens: 1024, // optional: maximum response length
    }),
  ],
});