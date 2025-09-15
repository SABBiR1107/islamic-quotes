import React from 'react';
import { BookmarkX, Heart } from 'lucide-react';
import { Quote, Language } from '../types';
import QuoteCard from './QuoteCard';

interface BookmarkPageProps {
  bookmarks: Quote[];
  language: Language;
  onRemoveBookmark: (quoteId: string) => void;
}

const BookmarkPage: React.FC<BookmarkPageProps> = ({
  bookmarks,
  language,
  onRemoveBookmark,
}) => {
  if (bookmarks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Heart size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            No Bookmarks Yet
          </h2>
          <p className="text-gray-500 mb-4">
            Start bookmarking your favorite Islamic quotes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          Bookmarked Quotes
        </h1>
        <p className="text-emerald-600">
          Your saved collection of {bookmarks.length} quote{bookmarks.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Bookmarked Quotes Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {bookmarks.map((quote) => (
            <div key={quote.id} className="relative">
              <QuoteCard quote={quote} language={language} />
              
              {/* Remove Bookmark Button */}
              <button
                onClick={() => onRemoveBookmark(quote.id)}
                className="absolute top-4 right-4 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-colors duration-200 shadow-sm"
                title="Remove bookmark"
              >
                <BookmarkX size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Clear All Bookmarks */}
        {bookmarks.length > 1 && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all bookmarks?')) {
                  bookmarks.forEach(bookmark => onRemoveBookmark(bookmark.id));
                }
              }}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Clear All Bookmarks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;