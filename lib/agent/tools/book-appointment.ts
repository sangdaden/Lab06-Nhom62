import { tool } from "ai";
import { z } from "zod";
import { prisma } from "@/lib/db/client";

function randomConfirmCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default tool({
  description:
    "Đặt lịch khám cho user. Yêu cầu đã xác nhận với user trước khi gọi tool này.",
  inputSchema: z.object({
    userId: z.string().describe("ID của user"),
    doctorId: z.string().describe("ID của bác sĩ"),
    departmentId: z.string().describe("ID của khoa"),
    scheduledAt: z
      .string()
      .describe("Thời gian khám, định dạng ISO 8601 (ví dụ: 2026-04-15T08:00:00.000Z)"),
    reason: z.string().describe("Lý do khám"),
  }),
  execute: async ({ userId, doctorId, departmentId, scheduledAt, reason }) => {
    // Verify entities exist
    const [user, doctor, department] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.doctor.findUnique({ where: { id: doctorId } }),
      prisma.department.findUnique({ where: { id: departmentId } }),
    ]);
    if (!user) throw new Error(`Không tìm thấy user: ${userId}`);
    if (!doctor) throw new Error(`Không tìm thấy bác sĩ: ${doctorId}`);
    if (!department) throw new Error(`Không tìm thấy khoa: ${departmentId}`);

    const slotDate = new Date(scheduledAt);

    // Check slot conflict
    const conflict = await prisma.appointment.findFirst({
      where: {
        doctorId,
        scheduledAt: slotDate,
        status: { in: ["booked", "rescheduled"] },
      },
    });
    if (conflict) {
      throw new Error(
        `Khung giờ ${scheduledAt} của bác sĩ ${doctor.name} đã được đặt. Vui lòng chọn giờ khác.`
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId,
        doctorId,
        departmentId,
        scheduledAt: slotDate,
        status: "booked",
        reason,
      },
    });

    const confirmationCode = randomConfirmCode();

    return {
      appointmentId: appointment.id,
      confirmationCode,
      doctorName: doctor.name,
      departmentName: department.name,
      scheduledAt: appointment.scheduledAt.toISOString(),
      status: appointment.status,
    };
  },
});
