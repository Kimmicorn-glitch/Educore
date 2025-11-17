
// @ts-nocheck
'use server';

import { analyzePerformanceAndAdjustDifficulty, type PerformanceAnalysisInput } from '@/ai/flows/ai-powered-personalized-learning';
import { askChatbot, type AskChatbotInput } from '@/ai/ai-chatbot-assistance';
import { translate } from '@/ai/flows/translator';
import { type TranslateInput } from '@/ai/flows/translator-types';

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

export async function getChatbotResponse(input: AskChatbotInput) {
    try {
        const result = await askChatbot(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, error: `Failed to get chatbot response: ${errorMessage}` };
    }
}

export async function getTranslation(input: TranslateInput) {
    try {
        const result = await translate(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, error: `Failed to translate text: ${errorMessage}` };
    }
}
