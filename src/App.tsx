import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Bookmark, Settings, MessageCircle } from 'lucide-react';
import HomePage from './components/HomePage';
import ReadPage from './components/ReadPage';
import BookmarkPage from './components/BookmarkPage';
import SettingsPage from './components/SettingsPage';
import AskAIPage from './components/AskAIPage';
import { Quote, Language } from './types';
import { getStoredBookmarks, getStoredLanguage, storeLanguage } from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'read' | 'bookmark' | 'askai' | 'settings'>('home');
  const [language, setLanguage] = useState<Language>('english');
  const [bookmarks, setBookmarks] = useState<Quote[]>([]);

  useEffect(() => {
    const storedLanguage = getStoredLanguage();
    const storedBookmarks = getStoredBookmarks();
    
    setLanguage(storedLanguage);
    setBookmarks(storedBookmarks);
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    storeLanguage(newLanguage);
  };

  const addBookmark = (quote: Quote) => {
    const updatedBookmarks = [...bookmarks, quote];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('islamicQuotesBookmarks', JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = (quoteId: string) => {
    const updatedBookmarks = bookmarks.filter(b => b.id !== quoteId);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('islamicQuotesBookmarks', JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (quoteId: string) => {
    return bookmarks.some(b => b.id === quoteId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            language={language}
            onBookmark={addBookmark}
            onRemoveBookmark={removeBookmark}
            isBookmarked={isBookmarked}
          />
        );
      case 'read':
        return (
          <ReadPage
            language={language}
            onBookmark={addBookmark}
            onRemoveBookmark={removeBookmark}
            isBookmarked={isBookmarked}
          />
        );
      case 'bookmark':
        return (
          <BookmarkPage
            bookmarks={bookmarks}
            language={language}
            onRemoveBookmark={removeBookmark}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        );
      case 'askai':
        return (
          <AskAIPage />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-200 shadow-lg">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'home'
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-emerald-500'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('read')}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'read'
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-emerald-500'
            }`}
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1 font-medium">Read</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmark')}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 relative ${
              activeTab === 'bookmark'
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-emerald-500'
            }`}
          >
            <Bookmark size={24} />
            <span className="text-xs mt-1 font-medium">Bookmark</span>
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'settings'
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-emerald-500'
            }`}
          >
            <Settings size={24} />
            <span className="text-xs mt-1 font-medium">Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('askai')}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'askai'
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-emerald-500'
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-xs mt-1 font-medium">Ask AI</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;