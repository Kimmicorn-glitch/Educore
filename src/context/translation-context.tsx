
'use client';

import { getTranslation } from '@/app/actions';
import React, { createContext, useContext, useState, useTransition, useCallback, ReactNode, useEffect } from 'react';

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
  const [pendingTranslations, setPendingTranslations] = useState<Set<string>>(new Set());

  const setLanguageAndClearCache = (lang: string) => {
    setLanguage(lang);
    setTranslations({});
    setPendingTranslations(new Set());
  };

  useEffect(() => {
    if (pendingTranslations.size > 0) {
      startTransition(async () => {
        const newTranslations: Record<string, string> = {};
        const promises = Array.from(pendingTranslations).map(async (text) => {
          const cacheKey = `${language}:${text}`;
          if (translations[cacheKey]) return;

          const result = await getTranslation({ text, targetLanguage: language });
          if (result.success && result.data) {
            newTranslations[cacheKey] = result.data.translatedText;
          }
        });

        await Promise.all(promises);

        if (Object.keys(newTranslations).length > 0) {
          setTranslations(prev => ({ ...prev, ...newTranslations }));
        }
        setPendingTranslations(new Set()); // Clear the queue
      });
    }
  }, [pendingTranslations, language, translations]);


  const t = useCallback((text: string): string => {
    if (language === 'English' || !text) {
      return text;
    }

    const cacheKey = `${language}:${text}`;
    if (translations[cacheKey]) {
      return translations[cacheKey];
    }
    
    if (!pendingTranslations.has(text)) {
        setPendingTranslations(prev => new Set(prev).add(text));
    }

    return text; // Return original text while translation is loading
  }, [language, translations, pendingTranslations]);

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
