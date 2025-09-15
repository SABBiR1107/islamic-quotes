import React from 'react';
import { Globe, Info, Heart } from 'lucide-react';
import { Language } from '../types';

interface SettingsPageProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  language,
  onLanguageChange,
}) => {
  const languages = [
    { code: 'english', name: 'English', nativeName: 'English' },
    { code: 'bangla', name: 'Bangla', nativeName: 'বাংলা' },
    { code: 'arabic', name: 'Arabic', nativeName: 'العربية' },
  ];

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          Settings
        </h1>
        <p className="text-emerald-600">
          Customize your reading experience
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Language Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="text-emerald-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">
              Language Preference
            </h2>
          </div>
          
          <div className="space-y-3">
            {languages.map((lang) => (
              <label
                key={lang.code}
                className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <input
                  type="radio"
                  name="language"
                  value={lang.code}
                  checked={language === lang.code}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="flex-1">
                  <span className="font-medium text-gray-800">
                    {lang.name}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({lang.nativeName})
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="text-emerald-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">
              About This App
            </h2>
          </div>
          
          <div className="text-gray-600 space-y-2">
            <p>
              This app provides inspiring Islamic quotes from the Quran in multiple languages.
              All quotes are sourced from the Al-Quran Cloud API.
            </p>
            <p>
              Features include random quote generation, multi-language support, 
              and the ability to bookmark your favorite verses.
            </p>
          </div>
        </div>

        {/* Credits */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="text-red-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">
              Credits
            </h2>
          </div>
          
          <div className="text-gray-600 space-y-2">
            <p>
              <strong>API:</strong> Al-Quran Cloud API
            </p>
            <p>
              <strong>Translations:</strong> Muhammad Asad (English)
            </p>
            <p className="text-sm text-gray-500 mt-4">
              May Allah accept this humble effort and make it beneficial for all Muslims.
            </p>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Islamic Quotes App v1.0.0
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;