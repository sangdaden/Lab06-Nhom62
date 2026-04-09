import { tool } from "ai";
import { z } from "zod";
import { departments } from "@/lib/data";
import { normalize, tokenize } from "@/lib/utils/text";

export default tool({
  description:
    "Gợi ý khoa khám phù hợp dựa trên triệu chứng hoặc lý do khám của người dùng. Dùng khi user mô tả triệu chứng.",
  inputSchema: z.object({
    symptoms: z.string().describe("Mô tả triệu chứng bằng tiếng Việt"),
    userAge: z.number().optional().describe("Tuổi của user (nếu có)"),
  }),
  execute: async ({ symptoms, userAge }) => {
    const queryTokens = tokenize(symptoms);

    const scored = departments.map((dept) => {
      const normalizedKeywords = dept.symptoms.map(normalize);
      const matchedKeywords: string[] = [];
      let score = 0;

      for (const token of queryTokens) {
        for (const kw of normalizedKeywords) {
          if (kw.includes(token) || token.includes(kw)) {
            if (!matchedKeywords.includes(kw)) {
              matchedKeywords.push(kw);
              score += 1;
            }
          }
        }
      }

      // Boost nhi khoa for children
      if (userAge !== undefined && userAge < 16 && dept.id === "nhi-khoa") {
        score += 5;
      }

      return { dept, score, matchedKeywords };
    });

    const sorted = scored.sort((a, b) => b.score - a.score);
    const top3 = sorted.slice(0, 3);

    const hasMatch = top3[0].score > 0;

    if (!hasMatch) {
      // Return fallback popular departments
      const fallbackIds = ["noi-tong-quat", "tieu-hoa", "tim-mach"];
      const fallback = fallbackIds.map((id) => {
        const d = departments.find((dep) => dep.id === id)!;
        return {
          id: d.id,
          name: d.name,
          description: d.description,
          matchScore: 0,
          matchedKeywords: [],
          note: "Không tìm thấy khoa chính xác theo triệu chứng mô tả. Đây là các khoa phổ biến.",
        };
      });
      return fallback;
    }

    return top3.map(({ dept, score, matchedKeywords }) => ({
      id: dept.id,
      name: dept.name,
      description: dept.description,
      matchScore: score,
      matchedKeywords,
    }));
  },
});
