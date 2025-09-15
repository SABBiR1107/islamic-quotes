import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || '');

const SYSTEM_INSTRUCTIONS = `You are an assistant focused on Islam. Answer respectfully and concisely.
- Always answer in Bangla (বাংলা), regardless of the user's language.
- If the user's question is in English or romanized Bangla (Banglish), first interpret it correctly and then answer fully in Bangla.
- Use authentic, mainstream sources when referencing concepts.
- If asked for rulings, present diverse scholarly views when relevant and advise consulting local scholars.
- Avoid political agitation, hate, personal attacks, or harmful advice.
- If the question is outside Islamic knowledge or inappropriate, politely refuse and steer back to Islamic topics — in Bangla.
- When citing Qur'an, include Surah and Ayah numbers if known, in Bangla.
`;

export async function askIslam(question: string): Promise<string> {
  try {
    if (!GEMINI_API_KEY) {
      return 'কনফিগারেশন অনুপস্থিত: VITE_GEMINI_API_KEY সেট করা নেই। দয়া করে .env ফাইলে কী যুক্ত করুন।';
    }
    if (!question || question.trim().length === 0) {
      return 'অনুগ্রহ করে একটি প্রশ্ন লিখুন।';
    }

    const safety = [
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    ];

    const generationConfig = {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1024,
    } as const;

    const runOnce = async (modelName: string) => {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTIONS,
      });
      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              { text: `ব্যবহারকারীর প্রশ্ন: ${question}\n\nউত্তর সবসময় বাংলায় দিন।` },
            ],
          },
        ],
        safetySettings: safety,
        generationConfig,
      });
      return result.response.text();
    };

    try {
      const text = await runOnce('gemini-1.5-flash');
      return text?.trim() || 'দুঃখিত, আমি উত্তর তৈরি করতে পারিনি।';
    } catch (inner) {
      const text = await runOnce('gemini-1.5-flash-8b');
      return text?.trim() || 'দুঃখিত, আমি উত্তর তৈরি করতে পারিনি।';
    }
  } catch (error) {
    console.error('Gemini error:', error);
    return 'দুঃখিত, এখনই আপনার প্রশ্নটি প্রক্রিয়া করা সম্ভব নয়। একটু পরে আবার চেষ্টা করুন।';
  }
}


