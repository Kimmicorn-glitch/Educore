
'use server';
/**
 * @fileOverview An AI-powered personalized learning tool that analyzes user performance and adjusts lesson difficulty.
 *
 * - analyzePerformanceAndAdjustDifficulty - A function that analyzes user performance and adjusts the difficulty of lessons.
 * - PerformanceAnalysisInput - The input type for the analyzePerformanceAndAdjustDifficulty function.
 * - PerformanceAnalysisOutput - The return type for the analyzePerformanceAndAdjustDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PerformanceAnalysisInputSchema = z.object({
  lessonCompletions: z
    .array(z.object({
      lessonId: z.string(),
      isCompleted: z.boolean(),
    }))
    .describe('List of lessons and their completion status.'),
  exerciseAttempts: z
    .array(z.object({
      exerciseId: z.string(),
      attempts: z.number(),
      successRate: z.number(),
    }))
    .describe('List of exercises and the number of attempts and success rate.'),
  subject: z.enum(['Python', 'English', 'Maths', 'Physics']).describe('The subject for which to analyze performance.'),
});
export type PerformanceAnalysisInput = z.infer<typeof PerformanceAnalysisInputSchema>;

const PerformanceAnalysisOutputSchema = z.object({
  recommendedDifficultyAdjustment: z
    .string()
    .describe('Recommended adjustment to the lesson difficulty (e.g., increase, decrease, maintain).'),
  suggestedFocusAreas: z
    .array(z.string())
    .describe('Specific areas within the subject to focus on for improvement.'),
});
export type PerformanceAnalysisOutput = z.infer<typeof PerformanceAnalysisOutputSchema>;

export async function analyzePerformanceAndAdjustDifficulty(
  input: PerformanceAnalysisInput
): Promise<PerformanceAnalysisOutput> {
  return analyzePerformanceAndAdjustDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'performanceAnalysisPrompt',
  model: 'googleai/gemini-pro',
  input: {schema: PerformanceAnalysisInputSchema},
  output: {schema: PerformanceAnalysisOutputSchema},
  prompt: `You are an AI-powered learning assistant. Analyze the student\'s performance in {{subject}} based on the provided data and suggest difficulty adjustments and focus areas.

Lesson Completions:
{{#each lessonCompletions}}
  - Lesson ID: {{lessonId}}, Completed: {{isCompleted}}
{{/each}}

Exercise Attempts:
{{#each exerciseAttempts}}
  - Exercise ID: {{exerciseId}}, Attempts: {{attempts}}, Success Rate: {{successRate}}
{{/each}}

Based on this data, recommend whether to increase, decrease, or maintain the difficulty of future lessons. Also, suggest specific areas within {{subject}} that the student should focus on to improve their understanding.
`,
});

const analyzePerformanceAndAdjustDifficultyFlow = ai.defineFlow(
  {
    name: 'analyzePerformanceAndAdjustDifficultyFlow',
    inputSchema: PerformanceAnalysisInputSchema,
    outputSchema: PerformanceAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
