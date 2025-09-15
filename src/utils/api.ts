import { Quote, ApiResponse, Surah, SurahData, SurahApiResponse, SurahListApiResponse } from '../types';

const API_BASE_URL = 'https://api.alquran.cloud/v1';

// Sample Bangla translations for demonstration
const banglaTranslations: { [key: string]: string } = {
  "In the name of Allah, the Entirely Merciful, the Especially Merciful.": "পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে।",
  "And Allah is the best of planners.": "এবং আল্লাহ হলেন সর্বোত্তম পরিকল্পনাকারী।",
  "And it is He who created the heavens and earth in truth. And the day He says, \"Be,\" and it is, His word is the truth.": "আর তিনিই সত্যসহ আসমান ও জমিন সৃষ্টি করেছেন। আর যেদিন তিনি বলবেন, 'হয়ে যাও', তখনই তা হয়ে যাবে। তাঁর কথাই সত্য।",
  "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.": "আর যে আল্লাহর উপর ভরসা করে, তার জন্য তিনিই যথেষ্ট। নিশ্চয় আল্লাহ তাঁর কাজ সম্পন্ন করবেন।",
  "All praise is due to Allah, Lord of the worlds.": "সমস্ত প্রশংসা আল্লাহর জন্য যিনি সকল জগতের রব।",
  "The Entirely Merciful, the Especially Merciful.": "পরম করুণাময়, অসীম দয়ালু।",
  "Sovereign of the Day of Recompense.": "বিচার দিনের মালিক।",
  "It is You we worship and You we ask for help.": "আমরা কেবল তোমারই ইবাদত করি এবং কেবল তোমারই সাহায্য প্রার্থনা করি।",
  "Guide us to the straight path": "আমাদেরকে সরল পথ দেখাও",
  "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.": "তাদের পথ, যাদের উপর তুমি অনুগ্রহ করেছ। তাদের পথ নয়, যাদের উপর তোমার গজব নেমেছে এবং যারা পথভ্রষ্ট।"
};

// Get Bangla translation for English text
const getBanglaTranslation = (englishText: string): string => {
  return banglaTranslations[englishText] || "বাংলা অনুবাদ লোড করা হচ্ছে...";
};

export const fetchAllSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah`);
    const data: SurahListApiResponse = await response.json();
    
    if (data.code === 200) {
      return data.data;
    }
    
    throw new Error('Failed to fetch surahs');
  } catch (error) {
    // Fallback list of surahs
    return [
      { number: 1, name: 'الفاتحة', englishName: 'Al-Fatihah', englishNameTranslation: 'The Opening', numberOfAyahs: 7, revelationType: 'Meccan' },
      { number: 2, name: 'البقرة', englishName: 'Al-Baqarah', englishNameTranslation: 'The Cow', numberOfAyahs: 286, revelationType: 'Medinan' },
      { number: 3, name: 'آل عمران', englishName: 'Ali \'Imran', englishNameTranslation: 'Family of Imran', numberOfAyahs: 200, revelationType: 'Medinan' },
      { number: 4, name: 'النساء', englishName: 'An-Nisa', englishNameTranslation: 'The Women', numberOfAyahs: 176, revelationType: 'Medinan' },
      { number: 5, name: 'المائدة', englishName: 'Al-Ma\'idah', englishNameTranslation: 'The Table Spread', numberOfAyahs: 120, revelationType: 'Medinan' }
    ];
  }
};

export const fetchSurah = async (surahNumber: number, edition: string = 'en.asad'): Promise<SurahData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${edition}`);
    const data: SurahApiResponse = await response.json();
    
    if (data.code === 200) {
      return data.data;
    }
    
    throw new Error('Failed to fetch surah');
  } catch (error) {
    // Fallback for Al-Fatihah
    return {
      number: 1,
      name: 'الفاتحة',
      englishName: 'Al-Fatihah',
      englishNameTranslation: 'The Opening',
      numberOfAyahs: 7,
      ayahs: [
        { number: 1, text: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', numberInSurah: 1, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 2, text: 'All praise is due to Allah, Lord of the worlds.', numberInSurah: 2, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 3, text: 'The Entirely Merciful, the Especially Merciful.', numberInSurah: 3, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 4, text: 'Sovereign of the Day of Recompense.', numberInSurah: 4, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 5, text: 'It is You we worship and You we ask for help.', numberInSurah: 5, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 6, text: 'Guide us to the straight path', numberInSurah: 6, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 7, text: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', numberInSurah: 7, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false }
      ]
    };
  }
};

export const fetchSurahWithTranslations = async (surahNumber: number) => {
  try {
    const [arabicData, englishData, banglaData] = await Promise.all([
      fetchSurah(surahNumber, 'ar.alafasy'),
      fetchSurah(surahNumber, 'en.asad'),
      // Real Bangla translation
      fetchSurah(surahNumber, 'bn.bengali')
    ]);

    // Combine Arabic, English and Bangla
    const combinedAyahs = arabicData.ayahs.map((arabicAyah, index) => {
      const englishAyah = englishData.ayahs[index];
      const bnAyah = banglaData.ayahs[index];
      return {
        ...arabicAyah,
        arabicText: arabicAyah.text,
        englishText: englishAyah?.text || '',
        banglaText: bnAyah?.text || getBanglaTranslation(englishAyah?.text || ''),
      };
    });

    return {
      ...arabicData,
      ayahs: combinedAyahs
    };
  } catch (error) {
    console.error('Error fetching surah with translations:', error);
    // Fallback to Arabic + English and mapped Bangla
    try {
      const [arabicData, englishData] = await Promise.all([
        fetchSurah(surahNumber, 'ar.alafasy'),
        fetchSurah(surahNumber, 'en.asad')
      ]);
      const combinedAyahs = arabicData.ayahs.map((arabicAyah, index) => {
        const englishAyah = englishData.ayahs[index];
        return {
          ...arabicAyah,
          arabicText: arabicAyah.text,
          englishText: englishAyah?.text || '',
          banglaText: getBanglaTranslation(englishAyah?.text || ''),
        };
      });
      return {
        ...arabicData,
        ayahs: combinedAyahs
      };
    } catch (innerError) {
      return await fetchSurah(surahNumber);
    }
  }
};

export const getAudioUrl = (surahNumber: number, ayahNumber?: number): string => {
  const surahStr = surahNumber.toString().padStart(3, '0');
  
  if (ayahNumber) {
    const ayahStr = ayahNumber.toString().padStart(3, '0');
    // Working ayah audio CDN (Alafasy)
    return `https://everyayah.com/data/Alafasy_128kbps/${surahStr}${ayahStr}.mp3`;
  }
  
  // Full surah audio (Mishary Rashid Alafasy)
  return `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${surahStr}.mp3`;
};

export const fetchRandomQuote = async (): Promise<Quote> => {
  try {
    // Generate random verse number (1-6236 are total verses in Quran)
    const randomVerse = Math.floor(Math.random() * 6236) + 1;
    
    const [enRes, arRes, bnRes] = await Promise.all([
      fetch(`${API_BASE_URL}/ayah/${randomVerse}/en.asad`),
      fetch(`${API_BASE_URL}/ayah/${randomVerse}`),
      fetch(`${API_BASE_URL}/ayah/${randomVerse}/bn.bengali`)
    ]);
    const data: ApiResponse = await enRes.json();
    const arabicData: ApiResponse = await arRes.json();
    const banglaApi: ApiResponse = await bnRes.json();
    
    if (data.code === 200) {
      const englishText = data.data.text;
      const banglaText = banglaApi.code === 200
        ? banglaApi.data.text
        : getBanglaTranslation(englishText);
      
      return {
        id: `${data.data.surah.number}-${data.data.numberInSurah}`,
        arabic: arabicData.data.text,
        english: englishText,
        bangla: banglaText,
        reference: `${data.data.surah.englishName} ${data.data.numberInSurah}`,
        surah: data.data.surah.englishName,
        ayah: data.data.numberInSurah
      };
    }
    
    throw new Error('Failed to fetch quote');
  } catch (error) {
    // Fallback quotes in case API fails
    const fallbackQuotes: Quote[] = [
      {
        id: '1-1',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        bangla: 'পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে।',
        reference: 'Al-Fatihah 1',
        surah: 'Al-Fatihah',
        ayah: 1
      },
      {
        id: '3-54',
        arabic: 'وَمَكَرُوا وَمَكَرَ اللَّهُ وَاللَّهُ خَيْرُ الْمَاكِرِينَ',
        english: 'And Allah is the best of planners.',
        bangla: 'এবং আল্লাহ হলেন সর্বোত্তম পরিকল্পনাকারী।',
        reference: 'Ali \'Imran 54',
        surah: 'Ali \'Imran',
        ayah: 54
      },
      {
        id: '65-3',
        arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ',
        english: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
        bangla: 'আর যে আল্লাহর উপর ভরসা করে, তার জন্য তিনিই যথেষ্ট। নিশ্চয় আল্লাহ তাঁর কাজ সম্পন্ন করবেন।',
        reference: 'At-Talaq 3',
        surah: 'At-Talaq',
        ayah: 3
      }
    ];
    
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }
};

export const fetchQuoteById = async (surahNumber: number, ayahNumber: number): Promise<Quote> => {
  try {
    const [enRes, arRes, bnRes] = await Promise.all([
      fetch(`${API_BASE_URL}/ayah/${surahNumber}:${ayahNumber}/en.asad`),
      fetch(`${API_BASE_URL}/ayah/${surahNumber}:${ayahNumber}`),
      fetch(`${API_BASE_URL}/ayah/${surahNumber}:${ayahNumber}/bn.bengali`)
    ]);
    const data: ApiResponse = await enRes.json();
    const arabicData: ApiResponse = await arRes.json();
    const banglaApi: ApiResponse = await bnRes.json();
    
    if (data.code === 200) {
      const englishText = data.data.text;
      const banglaText = banglaApi.code === 200
        ? banglaApi.data.text
        : getBanglaTranslation(englishText);
      
      return {
        id: `${surahNumber}-${ayahNumber}`,
        arabic: arabicData.data.text,
        english: englishText,
        bangla: banglaText,
        reference: `${data.data.surah.englishName} ${ayahNumber}`,
        surah: data.data.surah.englishName,
        ayah: ayahNumber
      };
    }
    
    throw new Error('Failed to fetch quote');
  } catch (error) {
    return await fetchRandomQuote();
  }
};