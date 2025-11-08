// @ts-nocheck
'use server';

import { analyzePerformanceAndAdjustDifficulty, type PerformanceAnalysisInput } from '@/ai/flows/ai-powered-personalized-learning';

export async function getPerformanceAnalysis(input: PerformanceAnalysisInput) {
  try {
    const result = await analyzePerformanceAndAdjustDifficulty(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to analyze performance: ${errorMessage}` };
  }
}
