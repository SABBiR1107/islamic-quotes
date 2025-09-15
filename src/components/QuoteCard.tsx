import React from 'react';
import { Quote, Language } from '../types';

interface QuoteCardProps {
  quote: Quote;
  language: Language;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, language }) => {
  const getDisplayText = () => {
    switch (language) {
      case 'arabic':
        return quote.arabic;
      case 'bangla':
        return quote.bangla;
      default:
        return quote.english;
    }
  };

  const getTextDirection = () => {
    return language === 'arabic' ? 'rtl' : 'ltr';
  };

  const getFontSize = () => {
    switch (language) {
      case 'arabic':
        return 'text-2xl md:text-3xl';
      case 'bangla':
        return 'text-lg md:text-xl';
      default:
        return 'text-xl md:text-2xl';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-emerald-100">
      {/* Quote Text */}
      <div
        className={`${getFontSize()} leading-relaxed text-gray-800 mb-6 text-center`}
        dir={getTextDirection()}
        style={{
          fontFamily: language === 'arabic' ? 'serif' : 'inherit',
          lineHeight: language === 'arabic' ? '1.8' : '1.6',
        }}
      >
        {language === 'arabic' && (
          <span className="text-emerald-700 text-3xl">﴿</span>
        )}
        <span className="mx-2">{getDisplayText()}</span>
        {language === 'arabic' && (
          <span className="text-emerald-700 text-3xl">﴾</span>
        )}
      </div>

      {/* Reference */}
      <div className="text-center">
        <div className="inline-flex items-center bg-emerald-50 px-4 py-2 rounded-lg">
          <span className="text-emerald-700 font-semibold">
            {quote.reference}
          </span>
        </div>
      </div>

      {/* Show other languages if not Arabic */}
      {language !== 'arabic' && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div
            className="text-lg md:text-xl text-gray-600 text-center leading-relaxed"
            dir="rtl"
            style={{ fontFamily: 'serif', lineHeight: '1.8' }}
          >
            <span className="text-emerald-700 text-2xl">﴿</span>
            <span className="mx-2">{quote.arabic}</span>
            <span className="text-emerald-700 text-2xl">﴾</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteCard;