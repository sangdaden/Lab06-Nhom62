import { tool } from "ai";
import { z } from "zod";
import { prisma } from "@/lib/db/client";

const CATEGORIES = ["complaint", "suggestion", "compliment", "other"] as const;

export default tool({
  description:
    "Ghi lại phản hồi hoặc ghi chú đặc biệt của user về trải nghiệm khám. KHÔNG dùng để lưu rating thumbs up/down (rating được lưu qua UI riêng).",
  inputSchema: z.object({
    userId: z.string().describe("ID của user"),
    note: z.string().describe("Nội dung phản hồi hoặc ghi chú"),
    category: z
      .enum(CATEGORIES)
      .describe("Loại phản hồi: complaint, suggestion, compliment, other"),
  }),
  execute: async ({ userId, note, category }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error(`Không tìm thấy user: ${userId}`);

    await prisma.feedback.create({
      data: {
        userId,
        messageId: `note-${Date.now()}`,
        rating: "note",
        query: category,
        response: note,
        toolsUsed: [],
      },
    });

    return { saved: true };
  },
});
