"use server";
import db from "@/utils/db";
import Query from "@/models/query";

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

export async function saveQuery(
  template: object,
  email: string,
  query: string,
  content: string
) {
  try {
    await db();

    const newQuery = new Query({
      template,
      email,
      query,
      content,
    });

    await newQuery.save();

    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
}

export async function getQueries(
  email: string,
  page: number,
  pageSize: number
) {
  try {
    await db();

    const skip = (page - 1) * pageSize;
    const totalQueries = await Query.countDocuments({ email });

    const queries = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return {
      queries,
      totalQueries: Math.ceil(totalQueries / pageSize),
    };
  } catch (error) {
    return { ok: false };
  }
}

export async function usageCount(email: string) {
  try {
    await db();

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const result = await Query.aggregate([
      {
        $match: {
          email,
          $expr: {
            $and: [
              { $eq: [{ $year: "$createdAt" }, currentYear] },
              { $eq: [{ $month: "$createdAt" }, currentMonth] },
            ],
          },
        },
      },
      {
        $project: {
          wordCount: {
            $size: {
              $split: [{ $trim: { input: "$content" } }, " "],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalWords: { $sum: "$wordCount" },
        },
      },
    ]);

    return result.length > 0 ? result[0].totalWords : 0;
  } catch (error) {
    // Retorne 0 em caso de erro, garantindo que sempre retorne um número
    console.error("Error fetching usage count:", error);
    return 0;
  }
}
