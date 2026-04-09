import { tool } from "ai";
import { z } from "zod";
import { prisma } from "@/lib/db/client";

export default tool({
  description: "Hủy một lịch hẹn đã đặt.",
  inputSchema: z.object({
    appointmentId: z.string().describe("ID của lịch hẹn cần hủy"),
    reason: z.string().optional().describe("Lý do hủy lịch (tùy chọn)"),
  }),
  execute: async ({ appointmentId, reason }) => {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      throw new Error(`Không tìm thấy lịch hẹn: ${appointmentId}`);
    }
    if (appointment.status === "cancelled") {
      throw new Error(`Lịch hẹn ${appointmentId} đã bị hủy trước đó.`);
    }
    if (appointment.status === "completed") {
      throw new Error(`Không thể hủy lịch hẹn đã hoàn thành.`);
    }

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: "cancelled",
        notes: reason ? `Lý do hủy: ${reason}` : appointment.notes,
      },
    });

    return { success: true, appointmentId };
  },
});
