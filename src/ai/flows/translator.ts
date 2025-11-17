
'use server';
/**
 * @fileOverview A flow for translating text into different languages.
 *
 * - translate - A function that handles the translation.
 * - TranslateInput - The input type for the translate function.
 * - TranslateOutput - The return type for the translate function.
 */

import {ai} from '@/ai/genkit';
import {TranslateInput, TranslateInputSchema, TranslateOutput, TranslateOutputSchema} from './translator-types';


export async function translate(input: TranslateInput): Promise<TranslateOutput> {
  return translateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatePrompt',
  input: {schema: TranslateInputSchema},
  output: {schema: TranslateOutputSchema},
  prompt: `Translate the following text to {{targetLanguage}}. Do not add any extra explanation or formatting beyond the translation itself.

Text:
"{{text}}"

Translation:`,
});

const translateFlow = ai.defineFlow(
  {
    name: 'translateFlow',
    inputSchema: TranslateInputSchema,
    outputSchema: TranslateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
