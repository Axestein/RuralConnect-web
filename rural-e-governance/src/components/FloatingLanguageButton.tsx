'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, X } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
];

export function FloatingLanguageButton() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (languageCode: string) => {
    // Save to localStorage
    localStorage.setItem('i18nextLng', languageCode);
    
    // Change language
    i18n.changeLanguage(languageCode);
    
    // Close panel and refresh after a delay
    setIsOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 z-50 group"
        aria-label="Change language"
      >
        <Globe className="h-6 w-6" />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
          {languages.length}
        </div>
        
        {/* Tooltip on hover */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Change Language
          <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
        </div>
      </button>

      {/* Language Selection Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="fixed right-6 bottom-24 bg-white rounded-2xl shadow-2xl z-50 w-80 animate-in slide-in-from-bottom-5">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Choose Language</h3>
                  <p className="text-gray-600 text-sm mt-1">Select your preferred language</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`flex items-center justify-between w-full p-4 rounded-xl transition-all ${
                      i18n.language === language.code
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'hover:bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-4 ${
                        i18n.language === language.code
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Globe className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className={`font-medium ${
                          i18n.language === language.code
                            ? 'text-blue-700'
                            : 'text-gray-900'
                        }`}>
                          {language.nativeName}
                        </div>
                        <div className="text-sm text-gray-500">{language.name}</div>
                      </div>
                    </div>
                    
                    {i18n.language === language.code && (
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Language Saved</p>
                    <p className="text-xs">Your preference will be remembered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}