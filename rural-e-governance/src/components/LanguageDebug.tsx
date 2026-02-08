'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageDebug() {
  const { t, i18n } = useTranslation();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Log everything for debugging
    console.log('=== LANGUAGE DEBUG ===');
    console.log('Current language:', i18n.language);
    console.log('i18n instance:', i18n);
    console.log('Available languages:', i18n.options.supportedLngs);
    console.log('Resources loaded:', Object.keys(i18n.options.resources || {}));
    
    // Try to get a translation
    const testTranslation = t('app.name');
    console.log('Test translation "app.name":', testTranslation);
    
    // Check localStorage
    const storedLang = localStorage.getItem('i18nextLng');
    console.log('LocalStorage i18nextLng:', storedLang);

    // Update debug info
    setDebugInfo({
      currentLanguage: i18n.language,
      storedLanguage: storedLang,
      testTranslation,
      resources: Object.keys(i18n.options.resources || {}),
      isReady: i18n.isInitialized,
    });
  }, [i18n, t]);

  const changeLanguage = (lang: string) => {
    console.log(`Changing language to: ${lang}`);
    i18n.changeLanguage(lang);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="fixed top-4 left-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50 max-w-md">
      <h3 className="font-bold mb-3 text-lg">🌐 Language Debug</h3>
      
      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-400">Current:</p>
            <p className="font-bold">{debugInfo.currentLanguage || 'none'}</p>
          </div>
          <div>
            <p className="text-gray-400">Stored:</p>
            <p className="font-bold">{debugInfo.storedLanguage || 'none'}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-400">Test Translation:</p>
          <p className="font-bold">{debugInfo.testTranslation || 'none'}</p>
        </div>

        <div>
          <p className="text-gray-400">Resources Loaded:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {(debugInfo.resources || []).map((lang: string) => (
              <span 
                key={lang} 
                className={`px-2 py-1 rounded text-xs ${
                  debugInfo.currentLanguage === lang 
                    ? 'bg-green-600' 
                    : 'bg-gray-700'
                }`}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-400 mb-2">Quick Test:</p>
          <div className="flex flex-wrap gap-2">
            {['en', 'hi', 'ta', 'te', 'bn', 'mr', 'or'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`px-3 py-1 rounded text-xs ${
                  debugInfo.currentLanguage === lang
                    ? 'bg-blue-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-400">Translation Keys:</p>
          <div className="mt-1 space-y-1 max-h-40 overflow-y-auto">
            {[
              'app.name',
              'app.description', 
              'nav.home',
              'nav.complaints',
              'status.pending',
              'status.inProgress',
              'button.save',
              'button.cancel'
            ].map((key) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-400">{key}:</span>
                <span className="font-bold">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('i18nextLng');
            console.log('Cleared localStorage');
            window.location.reload();
          }}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-medium mt-2"
        >
          🔄 Reset Language
        </button>
      </div>
    </div>
  );
}