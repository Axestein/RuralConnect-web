'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Globe, Check } from 'lucide-react';

const languageNames: Record<string, { name: string; native: string }> = {
  en: { name: 'English', native: 'English' },
  hi: { name: 'Hindi', native: 'हिन्दी' },
  ta: { name: 'Tamil', native: 'தமிழ்' },
  te: { name: 'Telugu', native: 'తెలుగు' },
  bn: { name: 'Bengali', native: 'বাংলা' },
  mr: { name: 'Marathi', native: 'मराठी' },
  or: { name: 'Odia', native: 'ଓଡ଼ିଆ' },
};

export function SimpleLanguageSwitcher() {
  const { language, changeLanguage, availableLanguages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang as any);
    setIsOpen(false);
    // Optional: reload page for complete language change
    setTimeout(() => window.location.reload(), 300);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        title="Change Language"
      >
        <Globe className="h-5 w-5 text-gray-600" />
        <span className="font-medium text-gray-700">{languageNames[language]?.native || language}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Select Language</h3>
              <p className="text-sm text-gray-500 mt-1">Choose your preferred language</p>
            </div>
            
            <div className="py-2 max-h-64 overflow-y-auto">
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 ${
                    language === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <div>
                    <div className="font-medium">{languageNames[lang]?.native || lang}</div>
                    <div className="text-sm text-gray-500">{languageNames[lang]?.name || lang}</div>
                  </div>
                  {language === lang && (
                    <Check className="h-5 w-5 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500">
                Language preference will be saved
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}