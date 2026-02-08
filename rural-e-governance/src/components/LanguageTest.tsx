'use client';

import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Globe } from 'lucide-react';

export function LanguageTest() {
  const { t, i18n } = useTranslation();

  const testTranslations = [
    { key: 'app.name', expected: 'Rural e-Governance' },
    { key: 'status.pending', expected: 'Pending' },
    { key: 'status.inProgress', expected: 'In Progress' },
    { key: 'status.resolved', expected: 'Resolved' },
    { key: 'button.save', expected: 'Save' },
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm z-50">
      <div className="flex items-center mb-3">
        <Globe className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="font-semibold text-gray-900">Language Test</h3>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-2">Current Language: <strong>{i18n.language}</strong></p>
        <div className="flex flex-wrap gap-2">
          {['en', 'hi', 'ta', 'te', 'bn', 'mr', 'or'].map((lang) => (
            <button
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              className={`px-2 py-1 text-xs rounded ${
                i18n.language === lang 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {testTranslations.map((item) => {
          const translation = t(item.key);
          const isTranslated = translation !== item.key; // If it returns the key, translation is missing
          
          return (
            <div key={item.key} className="flex items-start">
              {isTranslated ? (
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-700">{item.key}</p>
                <p className={`text-xs ${isTranslated ? 'text-green-600' : 'text-red-600'}`}>
                  {translation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}