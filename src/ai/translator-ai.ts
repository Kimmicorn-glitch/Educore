
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const translatorAi = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash-latest',
});
