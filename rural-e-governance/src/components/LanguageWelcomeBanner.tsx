'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, X, Check, Languages } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
];

export function LanguageWelcomeBanner() {
  const { i18n } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');

  useEffect(() => {
    // Check if user has already selected a language
    const hasSelectedLanguage = localStorage.getItem('userLanguageSelected');
    const savedLanguage = localStorage.getItem('i18nextLng');
    
    // Show banner if no language selected or first visit
    if (!hasSelectedLanguage) {
      setShowBanner(true);
      
      // Auto-select based on browser if available
      const browserLang = navigator.language?.split('-')[0];
      if (browserLang && languages.find(l => l.code === browserLang)) {
        setSelectedLang(browserLang);
      }
    }
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLang(langCode);
  };

  const handleConfirm = () => {
    // Save language preference
    localStorage.setItem('i18nextLng', selectedLang);
    localStorage.setItem('userLanguageSelected', 'true');
    
    // Change language
    i18n.changeLanguage(selectedLang);
    
    // Hide banner and refresh
    setShowBanner(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleSkip = () => {
    // Mark as skipped
    localStorage.setItem('userLanguageSelected', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-in zoom-in-95">
        <div className="p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
              <Languages className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome to Grama e-Seva! 🇮🇳
            </h2>
            <p className="text-gray-600 text-lg">
              Please select your preferred language for the best experience
            </p>
            <p className="text-sm text-gray-500 mt-2">
              आपका स्वागत है! बेहतरीन अनुभव के लिए कृपया अपनी पसंदीदा भाषा चुनें
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedLang === language.code
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🇮🇳</div>
                  <div className={`font-semibold ${
                    selectedLang === language.code ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {language.nativeName}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{language.name}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleConfirm}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              <Check className="h-5 w-5 mr-2" />
              Continue in {languages.find(l => l.code === selectedLang)?.nativeName}
            </button>
            
            <button
              onClick={handleSkip}
              className="px-8 py-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Skip for now
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              You can always change language later using the 🌐 button
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}