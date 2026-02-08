export function detectLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  
  try {
    // Check localStorage
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && savedLang.startsWith('en') || savedLang?.startsWith('hi') || 
        savedLang?.startsWith('ta') || savedLang?.startsWith('te') || 
        savedLang?.startsWith('bn') || savedLang?.startsWith('mr') || 
        savedLang?.startsWith('or')) {
      return savedLang.split('-')[0];
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'or'];
    
    if (supportedLangs.includes(browserLang)) {
      return browserLang;
    }
    
    // Check if browser language starts with any supported language
    for (const lang of supportedLangs) {
      if (browserLang.startsWith(lang)) {
        return lang;
      }
    }
  } catch (error) {
    console.error('Error detecting language:', error);
  }
  
  return 'en'; // Default to English
}