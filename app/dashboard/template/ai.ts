"use server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function runAiTextModel(prompToGenerate: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = prompToGenerate;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}
