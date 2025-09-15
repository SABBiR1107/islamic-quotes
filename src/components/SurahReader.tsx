import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Bookmark, BookmarkCheck, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { getAudioUrl } from '../utils/api';

interface SurahReaderProps {
  surah: any;
  language: Language;
  onBookmark: (quote: any) => void;
  onRemoveBookmark: (quoteId: string) => void;
  isBookmarked: (quoteId: string) => boolean;
}

const SurahReader: React.FC<SurahReaderProps> = ({
  surah,
  language,
  onBookmark,
  onRemoveBookmark,
  isBookmarked,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const getDisplayText = (ayah: any) => {
    switch (language) {
      case 'arabic':
        return ayah.arabicText || ayah.text;
      case 'bangla':
        return ayah.banglaText || 'বাংলা অনুবাদ লোড করা হচ্ছে...';
      default:
        return ayah.englishText || ayah.text;
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

  const playAyah = async (ayahIndex: number) => {
    if (audioRef.current) {
      const ayah = surah.ayahs[ayahIndex];
      const audioUrl = getAudioUrl(surah.number, ayah.numberInSurah);
      
      audioRef.current.src = audioUrl;
      audioRef.current.volume = isMuted ? 0 : volume;
      
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setCurrentAyah(ayahIndex);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAyah(currentAyah);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const handleBookmarkAyah = (ayah: any) => {
    const quote = {
      id: `${surah.number}-${ayah.numberInSurah}`,
      arabic: ayah.arabicText || ayah.text,
      english: ayah.englishText || ayah.text,
      bangla: ayah.banglaText || 'বাংলা অনুবাদ লোড করা হচ্ছে...',
      reference: `${surah.englishName} ${ayah.numberInSurah}`,
      surah: surah.englishName,
      ayah: ayah.numberInSurah
    };

    const quoteId = quote.id;
    if (isBookmarked(quoteId)) {
      onRemoveBookmark(quoteId);
    } else {
      onBookmark(quote);
    }
  };

  const resetToBeginning = () => {
    setCurrentAyah(0);
    pauseAudio();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        // Auto-play next ayah
        if (currentAyah < surah.ayahs.length - 1) {
          setTimeout(() => {
            playAyah(currentAyah + 1);
          }, 1000);
        }
      };

      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, [currentAyah, surah.ayahs.length]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <audio ref={audioRef} preload="none" />
      
      {/* Audio Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-emerald-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="flex items-center justify-center w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors duration-200"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button
              onClick={resetToBeginning}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors duration-200"
            >
              <RotateCcw size={16} />
            </button>
            
            <div className="text-sm text-gray-600">
              Ayah {currentAyah + 1} of {surah.ayahs.length}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 accent-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Bismillah */}
      {surah.number !== 1 && surah.number !== 9 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-emerald-100">
          <div className="text-center">
            <div className="text-3xl text-emerald-700 mb-2" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <div className="text-gray-600">
              In the name of Allah, the Entirely Merciful, the Especially Merciful
            </div>
          </div>
        </div>
      )}

      {/* Ayahs */}
      <div className="space-y-6">
        {surah.ayahs.map((ayah: any, index: number) => (
          <div
            key={ayah.numberInSurah}
            className={`bg-white rounded-xl shadow-sm p-6 border transition-all duration-200 ${
              currentAyah === index && isPlaying
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-emerald-100 hover:border-emerald-200'
            }`}
          >
            {/* Ayah Number */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                  {ayah.numberInSurah}
                </div>
                <button
                  onClick={() => playAyah(index)}
                  className="flex items-center justify-center w-8 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors duration-200"
                >
                  <Play size={14} />
                </button>
              </div>
              
              <button
                onClick={() => handleBookmarkAyah(ayah)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg font-medium transition-colors duration-200 ${
                  isBookmarked(`${surah.number}-${ayah.numberInSurah}`)
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isBookmarked(`${surah.number}-${ayah.numberInSurah}`) ? (
                  <BookmarkCheck size={16} />
                ) : (
                  <Bookmark size={16} />
                )}
              </button>
            </div>

            {/* Ayah Text */}
            <div
              className={`${getFontSize()} leading-relaxed text-gray-800 mb-4`}
              dir={getTextDirection()}
              style={{
                fontFamily: language === 'arabic' ? 'serif' : 'inherit',
                lineHeight: language === 'arabic' ? '1.8' : '1.6',
              }}
            >
              {getDisplayText(ayah)}
            </div>

            {/* Show Arabic if not in Arabic mode */}
            {language !== 'arabic' && (
              <div className="pt-4 border-t border-gray-100">
                <div
                  className="text-xl md:text-2xl text-gray-600 leading-relaxed"
                  dir="rtl"
                  style={{ fontFamily: 'serif', lineHeight: '1.8' }}
                >
                  {ayah.arabicText || ayah.text}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion Message */}
      <div className="text-center mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
        <h3 className="text-xl font-bold text-emerald-800 mb-2">
          صَدَقَ اللَّهُ الْعَظِيمُ
        </h3>
        <p className="text-emerald-700">
          Allah Almighty has spoken the truth
        </p>
        <p className="text-sm text-emerald-600 mt-2">
          You have completed reading {surah.englishName}
        </p>
      </div>
    </div>
  );
};

export default SurahReader;