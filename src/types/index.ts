export interface Quote {
  id: string;
  arabic: string;
  english: string;
  bangla: string;
  reference: string;
  surah: string;
  ayah: number;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export type Language = 'english' | 'bangla' | 'arabic';

export interface ApiResponse {
  code: number;
  status: string;
  data: {
    number: number;
    text: string;
    surah: {
      number: number;
      name: string;
      englishName: string;
      englishNameTranslation: string;
    };
    numberInSurah: number;
  };
}

export interface SurahApiResponse {
  code: number;
  status: string;
  data: SurahData;
}

export interface SurahListApiResponse {
  code: number;
  status: string;
  data: Surah[];
}