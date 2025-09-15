import React, { useState } from 'react';
import { Search, BookOpen, MapPin } from 'lucide-react';
import { Surah } from '../types';

interface SurahListProps {
  surahs: Surah[];
  onSurahSelect: (surah: Surah) => void;
  loading: boolean;
}

const SurahList: React.FC<SurahListProps> = ({ surahs, onSurahSelect, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = surahs.filter(surah =>
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.number.toString().includes(searchTerm)
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search Surahs by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm"
        />
      </div>

      {/* Surahs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSurahs.map((surah) => (
          <button
            key={surah.number}
            onClick={() => onSurahSelect(surah)}
            disabled={loading}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-left border border-emerald-100 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                  {surah.number}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors duration-200">
                    {surah.englishName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {surah.englishNameTranslation}
                  </p>
                </div>
              </div>
              <BookOpen className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={20} />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{surah.revelationType}</span>
              </div>
              <span>{surah.numberOfAyahs} Ayahs</span>
            </div>

            {/* Arabic Name */}
            <div className="mt-3 text-right">
              <span className="text-xl text-emerald-700 font-arabic" dir="rtl">
                {surah.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {filteredSurahs.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-600">No Surahs found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default SurahList;