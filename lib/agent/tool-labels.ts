export const TOOL_LABELS: Record<string, { running: string; done: string }> = {
  get_current_user: {
    running: "Đang lấy thông tin tài khoản...",
    done: "Đã lấy thông tin tài khoản",
  },
  recommend_department: {
    running: "Đang tìm khoa khám phù hợp...",
    done: "Đã gợi ý khoa khám",
  },
  list_doctors: {
    running: "Đang tra cứu bác sĩ...",
    done: "Đã tra cứu bác sĩ",
  },
  check_availability: {
    running: "Đang kiểm tra lịch trống...",
    done: "Đã kiểm tra lịch trống",
  },
  book_appointment: {
    running: "Đang đặt lịch hẹn...",
    done: "Đã đặt lịch hẹn thành công",
  },
  reschedule_appointment: {
    running: "Đang đổi lịch hẹn...",
    done: "Đã đổi lịch hẹn thành công",
  },
  cancel_appointment: {
    running: "Đang hủy lịch hẹn...",
    done: "Đã hủy lịch hẹn",
  },
  get_user_appointments: {
    running: "Đang tra cứu lịch sử khám...",
    done: "Đã tra cứu lịch sử khám",
  },
  get_preparation_guide: {
    running: "Đang lấy hướng dẫn chuẩn bị...",
    done: "Đã lấy hướng dẫn chuẩn bị",
  },
  search_hospital_faq: {
    running: "Đang tìm trong kho câu hỏi thường gặp...",
    done: "Đã tra cứu câu hỏi thường gặp",
  },
  schedule_followup: {
    running: "Đang đặt lịch tái khám...",
    done: "Đã đặt lịch tái khám",
  },
  find_nearest_branch: {
    running: "Đang tìm chi nhánh gần nhất...",
    done: "Đã tìm chi nhánh gần nhất",
  },
  save_feedback_note: {
    running: "Đang lưu ghi chú phản hồi...",
    done: "Đã lưu ghi chú",
  },
};

export function getToolLabel(
  toolName: string,
  state: "running" | "done"
): string {
  // Strip "tool-" prefix if present (from part.type format)
  const normalized = toolName.startsWith("tool-")
    ? toolName.slice(5)
    : toolName;
  return (
    TOOL_LABELS[normalized]?.[state] ??
    (state === "running"
      ? `Đang thực hiện ${normalized}...`
      : `Đã thực hiện ${normalized}`)
  );
}
