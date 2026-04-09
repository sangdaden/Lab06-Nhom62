import { tool } from "ai";
import { z } from "zod";
import { prisma } from "@/lib/db/client";

export default tool({
  description: "Đổi lịch hẹn đã đặt sang thời gian mới.",
  inputSchema: z.object({
    appointmentId: z.string().describe("ID của lịch hẹn cần đổi"),
    newScheduledAt: z
      .string()
      .describe("Thời gian khám mới, định dạng ISO 8601"),
  }),
  execute: async ({ appointmentId, newScheduledAt }) => {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true, department: true },
    });

    if (!appointment) {
      throw new Error(`Không tìm thấy lịch hẹn: ${appointmentId}`);
    }
    if (!["booked", "rescheduled"].includes(appointment.status)) {
      throw new Error(
        `Lịch hẹn có trạng thái "${appointment.status}" không thể đổi lịch. Chỉ có thể đổi lịch "booked" hoặc "rescheduled".`
      );
    }

    const newSlot = new Date(newScheduledAt);

    // Check new slot conflict
    const conflict = await prisma.appointment.findFirst({
      where: {
        doctorId: appointment.doctorId,
        scheduledAt: newSlot,
        status: { in: ["booked", "rescheduled"] },
        NOT: { id: appointmentId },
      },
    });
    if (conflict) {
      throw new Error(
        `Khung giờ ${newScheduledAt} của bác sĩ ${appointment.doctor.name} đã được đặt. Vui lòng chọn giờ khác.`
      );
    }

    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { scheduledAt: newSlot, status: "rescheduled" },
    });

    return {
      appointmentId: updated.id,
      doctorName: appointment.doctor.name,
      departmentName: appointment.department.name,
      oldScheduledAt: appointment.scheduledAt.toISOString(),
      newScheduledAt: updated.scheduledAt.toISOString(),
      status: updated.status,
    };
  },
});
