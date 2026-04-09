import { tool } from "ai";
import { z } from "zod";
import { prisma } from "@/lib/db/client";

const STATUS_OPTIONS = ["booked", "rescheduled", "cancelled", "completed", "all"] as const;

export default tool({
  description: "Lấy lịch sử và các lịch hẹn hiện tại của user.",
  inputSchema: z.object({
    userId: z.string().describe("ID của user"),
    status: z
      .enum(STATUS_OPTIONS)
      .default("all")
      .describe("Lọc theo trạng thái lịch hẹn"),
  }),
  execute: async ({ userId, status }) => {
    const where =
      status === "all"
        ? { userId }
        : { userId, status };

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        doctor: true,
        department: true,
      },
      orderBy: { scheduledAt: "desc" },
    });

    return appointments.map((a) => ({
      id: a.id,
      doctorName: a.doctor.name,
      doctorTitle: a.doctor.title,
      departmentName: a.department.name,
      scheduledAt: a.scheduledAt.toISOString(),
      status: a.status,
      reason: a.reason,
      notes: a.notes,
      createdAt: a.createdAt.toISOString(),
    }));
  },
});
