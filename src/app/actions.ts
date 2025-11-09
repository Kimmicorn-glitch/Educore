// @ts-nocheck
'use server';

import { analyzePerformanceAndAdjustDifficulty, type PerformanceAnalysisInput } from '@/ai/flows/ai-powered-personalized-learning';
import { askChatbot, type AskChatbotInput } from '@/ai/ai-chatbot-assistance';
import { generateAudio, type GenerateAudioInput } from '@/ai/flows/generate-audio-flow';

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

export async function getAudioLecture(input: GenerateAudioInput) {
    try {
        const result = await generateAudio(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error in getAudioLecture action:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during audio generation.';
        if (errorMessage.includes('deadline')) {
            return { success: false, error: 'The request took too long to process and timed out. Please try again with a shorter text.' };
        }
        return { success: false, error: `Failed to generate audio lecture: ${errorMessage}` };
    }
}
