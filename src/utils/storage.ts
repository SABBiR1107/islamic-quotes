import { Quote, Language } from '../types';

export const getStoredBookmarks = (): Quote[] => {
  try {
    const stored = localStorage.getItem('islamicQuotesBookmarks');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getStoredLanguage = (): Language => {
  try {
    const stored = localStorage.getItem('islamicQuotesLanguage');
    return (stored as Language) || 'english';
  } catch {
    return 'english';
  }
};

export const storeLanguage = (language: Language): void => {
  localStorage.setItem('islamicQuotesLanguage', language);
};