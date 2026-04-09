import { tool } from "ai";
import { z } from "zod";
import { faq } from "@/lib/data";
import { normalize, tokenize } from "@/lib/utils/text";

export default tool({
  description:
    "Tìm kiếm FAQ bệnh viện theo câu hỏi của user. Dùng khi user hỏi về quy trình, chi phí, bảo hiểm, giờ mở cửa, đặt lịch...",
  inputSchema: z.object({
    query: z.string().describe("Câu hỏi hoặc từ khóa cần tìm"),
    topK: z.number().default(3).describe("Số kết quả trả về (mặc định 3)"),
  }),
  execute: async ({ query, topK }) => {
    const queryTokens = tokenize(query);

    const scored = faq.map((item) => {
      const normalizedKeywords = item.keywords.map(normalize);
      const normalizedQuestion = normalize(item.question);
      const normalizedAnswer = normalize(item.answer);

      let score = 0;

      for (const token of queryTokens) {
        // Match in keywords array
        for (const kw of normalizedKeywords) {
          if (kw.includes(token) || token.includes(kw)) {
            score += 1;
          }
        }
        // Match in question (weight x2)
        if (normalizedQuestion.includes(token)) score += 2;
        // Match in answer (weight x1)
        if (normalizedAnswer.includes(token)) score += 1;
      }

      return { item, score };
    });

    const results = scored
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    // If no matches, return most relevant general FAQs
    if (results.length === 0) {
      return faq.slice(0, topK).map((item) => ({
        question: item.question,
        answer: item.answer,
        category: item.category,
        score: 0,
      }));
    }

    return results.map(({ item, score }) => ({
      question: item.question,
      answer: item.answer,
      category: item.category,
      score,
    }));
  },
});
