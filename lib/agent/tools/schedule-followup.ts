import { tool } from "ai";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { addDays } from "@/lib/utils/datetime";

function randomConfirmCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default tool({
  description:
    "Đặt lịch tái khám sau một số ngày nhất định dựa trên lịch hẹn gốc.",
  inputSchema: z.object({
    originalAppointmentId: z
      .string()
      .describe("ID của lịch hẹn gốc"),
    daysLater: z
      .number()
      .describe("Số ngày sau lần khám gốc để đặt tái khám"),
  }),
  execute: async ({ originalAppointmentId, daysLater }) => {
    const original = await prisma.appointment.findUnique({
      where: { id: originalAppointmentId },
      include: { doctor: true, department: true },
    });

    if (!original) {
      throw new Error(`Không tìm thấy lịch hẹn gốc: ${originalAppointmentId}`);
    }

    const newDate = addDays(original.scheduledAt, daysLater);

    // Check conflict
    const conflict = await prisma.appointment.findFirst({
      where: {
        doctorId: original.doctorId,
        scheduledAt: newDate,
        status: { in: ["booked", "rescheduled"] },
      },
    });
    if (conflict) {
      throw new Error(
        `Khung giờ tái khám ${newDate.toISOString()} của bác sĩ ${original.doctor.name} đã bị đặt. Vui lòng chọn ngày khác.`
      );
    }

    const followup = await prisma.appointment.create({
      data: {
        userId: original.userId,
        doctorId: original.doctorId,
        departmentId: original.departmentId,
        scheduledAt: newDate,
        status: "booked",
        reason: "Tái khám theo chỉ định",
        notes: `Tái khám từ lịch hẹn #${originalAppointmentId}`,
      },
    });

    return {
      appointmentId: followup.id,
      confirmationCode: randomConfirmCode(),
      doctorName: original.doctor.name,
      departmentName: original.department.name,
      scheduledAt: followup.scheduledAt.toISOString(),
      daysAfterOriginal: daysLater,
      status: followup.status,
    };
  },
});
