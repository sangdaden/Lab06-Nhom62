export const EMPTY_STATE_SUGGESTIONS: string[] = [
  "Tôi bị đau bụng 3 ngày, nên khám khoa nào?",
  "Đặt lịch khám tim mạch tuần sau giúp tôi",
  "Chuẩn bị gì khi đi nội soi dạ dày?",
  "Chi phí khám tổng quát bao nhiêu?",
  "Vinmec có chấp nhận BHYT không?",
  "Tìm chi nhánh Vinmec gần Times City",
];

export const FOLLOWUP_POOL: string[] = [
  "Cho tôi xem các bác sĩ khác",
  "Còn khung giờ nào khác không?",
  "Cần chuẩn bị gì trước khi khám?",
  "Chi phí khám là bao nhiêu?",
  "Có thể thanh toán bằng BHYT không?",
  "Chi nhánh nào gần nhất với tôi?",
  "Xem lịch sử khám của tôi",
  "Tôi muốn đổi sang bác sĩ khác",
  "Đặt lịch tái khám sau 1 tuần",
  "Cho tôi số điện thoại tổng đài",
];

// Simple rule-based picker: tránh gợi ý trùng với câu user vừa gửi, random 3 từ pool
export function pickFollowups(lastUserText: string, count = 3): string[] {
  const normalized = lastUserText.toLowerCase();
  const candidates = FOLLOWUP_POOL.filter(
    (q) => !normalized.includes(q.toLowerCase().slice(0, 10))
  );
  // shuffle + take
  return [...candidates].sort(() => Math.random() - 0.5).slice(0, count);
}
