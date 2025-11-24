import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("API Key is missing. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface HypeAnalysisResult {
  score: number;
  reaction: string;
}

export const analyzeFanHype = async (comment: string, username: string): Promise<HypeAnalysisResult> => {
  if (!apiKey) {
    // Graceful fallback if no key is present
    return new Promise(resolve => setTimeout(() => resolve({
      score: Math.floor(Math.random() * 50) + 50,
      reaction: "缺少 API Key，模拟回复✨"
    }), 1000));
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `User ${username} commented: "${comment}"`,
      config: {
        systemInstruction: `You are a hype-man/judge for a K-Pop forum event. 
        Analyze the fan's comment for enthusiasm, authenticity, and "stan" energy.
        Return a hype score (0-100) and a short, witty, 1-sentence reaction (max 10 words) in Chinese (using K-pop fan slang/lingo like 绝了, 大发, 只有i人懂, 搞到真的了 etc).
        Be generous but vary the scores. 
        If the comment is very short or generic (e.g. "good"), give a lower score.
        If it has emojis, caps, and specific references, give a high score.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Hype score from 0 to 100",
            },
            reaction: {
              type: Type.STRING,
              description: "Short reaction text in Chinese",
            },
          },
          required: ["score", "reaction"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as HypeAnalysisResult;
  } catch (error) {
    console.error("Error analyzing hype:", error);
    // Fallback if API fails
    return {
      score: Math.floor(Math.random() * 50) + 50,
      reaction: "大发！✨"
    };
  }
};