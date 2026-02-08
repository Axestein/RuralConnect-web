'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown, RefreshCw } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Initialize with current language
    const currentLang = i18n.language?.split('-')[0] || 'en';
    return languages.find(lang => lang.code === currentLang) || languages[0];
  });

  const handleLanguageSelect = (language: typeof languages[0]) => {
    // Save to localStorage immediately
    localStorage.setItem('i18nextLng', language.code);
    
    // Update state
    setSelectedLanguage(language);
    setIsOpen(false);
    
    // Change language immediately
    i18n.changeLanguage(language.code);
    
    // Show refresh prompt for complete experience
    setShowRefreshPrompt(true);
    
    // Hide prompt after 5 seconds
    setTimeout(() => {
      setShowRefreshPrompt(false);
    }, 5000);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCancelRefresh = () => {
    setShowRefreshPrompt(false);
  };

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
      >
        <Globe className="h-5 w-5 text-gray-600" />
        <span className="font-medium text-gray-700">{selectedLanguage.nativeName}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
            <div className="p-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Select Language</h3>
              <p className="text-sm text-gray-500 mt-1">Choose your preferred language</p>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedLanguage.code === language.code ? 'bg-blue-50' : ''
                  }`}
                >
                  <span className="text-2xl mr-3">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{language.nativeName}</div>
                    <div className="text-sm text-gray-500">{language.name}</div>
                  </div>
                  {selectedLanguage.code === language.code && (
                    <Check className="h-5 w-5 text-green-600 ml-2" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500">
                Language preference will be saved for future visits
              </p>
            </div>
          </div>
        </>
      )}

      {/* Refresh Prompt */}
      {showRefreshPrompt && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-lg shadow-xl p-4 max-w-sm z-50 animate-in slide-in-from-bottom-5">
          <div className="flex items-start">
            <RefreshCw className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Language Changed!</h4>
              <p className="text-sm opacity-90 mb-3">
                For best experience, refresh the page to update all content.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Refresh Now
                </button>
                <button
                  onClick={handleCancelRefresh}
                  className="px-4 py-2 text-white hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Continue Without Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}