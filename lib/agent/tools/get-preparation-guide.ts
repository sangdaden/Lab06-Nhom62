import { tool } from "ai";
import { z } from "zod";
import { preparationGuides } from "@/lib/data";

const EXAM_TYPES = [
  "general",
  "blood-test",
  "endoscopy",
  "mri",
  "ct-scan",
  "ultrasound",
  "cardiology",
  "pediatric",
  "gynecology",
  "surgery-pre",
] as const;

export default tool({
  description:
    "Lấy hướng dẫn chuẩn bị trước khi đi khám theo loại xét nghiệm hoặc loại khám.",
  inputSchema: z.object({
    examType: z
      .enum(EXAM_TYPES)
      .describe(
        "Loại khám hoặc xét nghiệm cần hướng dẫn chuẩn bị"
      ),
  }),
  execute: async ({ examType }) => {
    const guide = preparationGuides.find((g) => g.examType === examType);
    if (!guide) throw new Error(`Không tìm thấy hướng dẫn cho loại khám: ${examType}`);
    return {
      title: guide.title,
      instructions: guide.instructions,
      duration: guide.duration,
      notes: guide.notes ?? null,
    };
  },
});
