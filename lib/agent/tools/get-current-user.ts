import { tool } from "ai";
import { z } from "zod";
import { prisma } from "@/lib/db/client";

export default tool({
  description:
    "Lấy thông tin user đang đăng nhập. Gọi đầu session để biết tên, tuổi, giới tính, tiền sử bệnh của user.",
  inputSchema: z.object({
    userId: z.string().describe("ID của user hiện tại"),
  }),
  execute: async ({ userId }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error(`Không tìm thấy user với ID: ${userId}`);
    return {
      id: user.id,
      name: user.name,
      age: user.age,
      gender: user.gender,
      medicalNotes: user.medicalNotes,
    };
  },
});
