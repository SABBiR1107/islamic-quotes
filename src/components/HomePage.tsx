import React, { useState, useEffect } from 'react';
import { RefreshCw, Bookmark, BookmarkCheck } from 'lucide-react';
import { Quote, Language } from '../types';
import { fetchRandomQuote } from '../utils/api';
import QuoteCard from './QuoteCard';
import LoadingSpinner from './LoadingSpinner';

interface HomePageProps {
  language: Language;
  onBookmark: (quote: Quote) => void;
  onRemoveBookmark: (quoteId: string) => void;
  isBookmarked: (quoteId: string) => boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  language,
  onBookmark,
  onRemoveBookmark,
  isBookmarked,
}) => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  const loadRandomQuote = async () => {
    setLoading(true);
    try {
      const quote = await fetchRandomQuote();
      setCurrentQuote(quote);
    } catch (error) {
      console.error('Failed to load quote:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomQuote();
  }, []);

  const handleBookmarkToggle = () => {
    if (!currentQuote) return;
    
    if (isBookmarked(currentQuote.id)) {
      onRemoveBookmark(currentQuote.id);
    } else {
      onBookmark(currentQuote);
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          Islamic Quotes
        </h1>
        <p className="text-emerald-600">
          Find peace and inspiration in divine words
        </p>
      </div>

      {/* Main Quote Section */}
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <LoadingSpinner />
        ) : currentQuote ? (
          <div className="space-y-4">
            <QuoteCard quote={currentQuote} language={language} />
            
            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={loadRandomQuote}
                disabled={loading}
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                <span>New Quote</span>
              </button>
              
              <button
                onClick={handleBookmarkToggle}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isBookmarked(currentQuote.id)
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isBookmarked(currentQuote.id) ? (
                  <BookmarkCheck size={20} />
                ) : (
                  <Bookmark size={20} />
                )}
                <span>
                  {isBookmarked(currentQuote.id) ? 'Bookmarked' : 'Bookmark'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Failed to load quote. Please try again.</p>
            <button
              onClick={loadRandomQuote}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Islamic Pattern Decoration */}
      <div className="fixed top-0 left-0 w-32 h-32 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
          <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="3" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#islamic-pattern)" />
        </svg>
      </div>
    </div>
  );
};

export default HomePage;