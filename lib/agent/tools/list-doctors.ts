import { tool } from "ai";
import { z } from "zod";
import { prisma } from "@/lib/db/client";

export default tool({
  description: "Lấy danh sách bác sĩ của một khoa khám.",
  inputSchema: z.object({
    departmentId: z.string().describe("ID của khoa khám (slug, ví dụ: 'tieu-hoa')"),
  }),
  execute: async ({ departmentId }) => {
    const doctors = await prisma.doctor.findMany({
      where: { departmentId },
      include: { department: true },
    });
    if (doctors.length === 0) {
      throw new Error(`Không tìm thấy bác sĩ nào thuộc khoa: ${departmentId}`);
    }
    return doctors.map((d) => ({
      id: d.id,
      name: d.name,
      title: d.title,
      specialty: d.specialty,
      experience: d.experience,
      bio: d.bio,
      departmentName: d.department.name,
    }));
  },
});
