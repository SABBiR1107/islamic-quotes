import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, List, BookOpen } from 'lucide-react';
import { Language, Surah } from '../types';
import { fetchAllSurahs, fetchSurahWithTranslations, getAudioUrl } from '../utils/api';
import SurahList from './SurahList';
import SurahReader from './SurahReader';
import LoadingSpinner from './LoadingSpinner';

interface ReadPageProps {
  language: Language;
  onBookmark: (quote: any) => void;
  onRemoveBookmark: (quoteId: string) => void;
  isBookmarked: (quoteId: string) => boolean;
}

const ReadPage: React.FC<ReadPageProps> = ({
  language,
  onBookmark,
  onRemoveBookmark,
  isBookmarked,
}) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [surahLoading, setSurahLoading] = useState(false);
  const [view, setView] = useState<'list' | 'reader'>('list');

  useEffect(() => {
    loadSurahs();
  }, []);

  const loadSurahs = async () => {
    setLoading(true);
    try {
      const surahsData = await fetchAllSurahs();
      setSurahs(surahsData);
    } catch (error) {
      console.error('Failed to load surahs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSurahSelect = async (surah: Surah) => {
    setSurahLoading(true);
    try {
      const surahData = await fetchSurahWithTranslations(surah.number);
      setSelectedSurah(surahData);
      setView('reader');
    } catch (error) {
      console.error('Failed to load surah:', error);
    } finally {
      setSurahLoading(false);
    }
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedSurah(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      {view === 'list' ? (
        <div className="p-4">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="text-emerald-600 mr-3" size={32} />
              <h1 className="text-3xl font-bold text-emerald-800">
                Read Quran
              </h1>
            </div>
            <p className="text-emerald-600">
              Choose a Surah to read in Arabic, English, and Bangla
            </p>
          </div>

          <SurahList 
            surahs={surahs} 
            onSurahSelect={handleSurahSelect}
            loading={surahLoading}
          />
        </div>
      ) : (
        <div>
          {/* Header with Back Button */}
          <div className="sticky top-0 bg-white shadow-sm border-b border-emerald-200 p-4 z-10">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <button
                onClick={handleBackToList}
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Surahs</span>
              </button>
              
              {selectedSurah && (
                <div className="text-center">
                  <h2 className="text-xl font-bold text-emerald-800">
                    {selectedSurah.englishName}
                  </h2>
                  <p className="text-sm text-emerald-600">
                    {selectedSurah.englishNameTranslation}
                  </p>
                </div>
              )}
              
              <div className="w-20"></div> {/* Spacer for centering */}
            </div>
          </div>

          {surahLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : selectedSurah ? (
            <SurahReader
              surah={selectedSurah}
              language={language}
              onBookmark={onBookmark}
              onRemoveBookmark={onRemoveBookmark}
              isBookmarked={isBookmarked}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ReadPage;