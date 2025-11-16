'use client';

import { getTranslation } from '@/app/actions';
import React, { createContext, useContext, useState, useTransition, useCallback, ReactNode } from 'react';

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (text: string) => string;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('English');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const setLanguageAndClearCache = (lang: string) => {
    setLanguage(lang);
    setTranslations({});
  };

  const t = useCallback((text: string): string => {
    if (language === 'English') {
      return text;
    }

    const cacheKey = `${language}:${text}`;
    if (translations[cacheKey]) {
      return translations[cacheKey];
    }

    if (text) {
      startTransition(async () => {
        const result = await getTranslation({ text, targetLanguage: language });
        if (result.success && result.data) {
          setTranslations(prev => ({
            ...prev,
            [cacheKey]: result.data.translatedText,
          }));
        }
      });
    }

    return text; // Return original text while translation is loading
  }, [language, translations]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage: setLanguageAndClearCache, t, isTranslating: isPending }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
