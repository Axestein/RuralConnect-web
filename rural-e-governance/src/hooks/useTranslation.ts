import { useState, useEffect, useCallback } from 'react';

// Import all translation files
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import ta from '@/locales/ta.json';
import te from '@/locales/te.json';
import bn from '@/locales/bn.json';
import mr from '@/locales/mr.json';
import or from '@/locales/or.json';

const translations: Record<string, any> = {
  en,
  hi,
  ta,
  te,
  bn,
  mr,
  or,
};

export type Language = keyof typeof translations;

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('en');

  // Initialize from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  // Translation function
  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    // Navigate through the object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Try English as fallback
        if (language !== 'en') {
          let enValue: any = translations.en;
          for (const k of keys) {
            if (enValue && typeof enValue === 'object' && k in enValue) {
              enValue = enValue[k];
            } else {
              return key; // Return key if not found even in English
            }
          }
          return typeof enValue === 'string' ? enValue : key;
        }
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  }, [language]);

  // Change language
  const changeLanguage = useCallback((lang: Language) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('app-language', lang);
      window.dispatchEvent(new Event('languageChange'));
    }
  }, []);

  return {
    t,
    language,
    changeLanguage,
    availableLanguages: Object.keys(translations) as Language[],
  };
}