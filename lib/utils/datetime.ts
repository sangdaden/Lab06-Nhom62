// Giờ làm việc tính theo giờ VN (UTC+7): 8h-11h, 13h-16h
const SLOT_HOURS_VN = [8, 9, 10, 11, 13, 14, 15, 16];
// UTC offset của VN
const VN_UTC_OFFSET = 7;

/**
 * Generate các slot khám trong ngày theo giờ Việt Nam (UTC+7).
 * Dùng setUTCHours để tránh phụ thuộc timezone của server.
 */
export function generateSlots(date: Date): Date[] {
  return SLOT_HOURS_VN.map((hourVN) => {
    const slot = new Date(date);
    // Lấy ngày theo VN (UTC+7)
    const vnDate = new Date(date.getTime() + VN_UTC_OFFSET * 3600 * 1000);
    const year = vnDate.getUTCFullYear();
    const month = vnDate.getUTCMonth();
    const day = vnDate.getUTCDate();
    // Set slot theo UTC tương ứng với giờ VN
    slot.setUTCFullYear(year, month, day);
    slot.setUTCHours(hourVN - VN_UTC_OFFSET, 0, 0, 0);
    return slot;
  });
}

export function formatVNDateTime(d: Date): string {
  // Chuyển sang giờ VN (UTC+7) để hiển thị
  const vnTime = new Date(d.getTime() + VN_UTC_OFFSET * 3600 * 1000);
  const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const dayName = days[vnTime.getUTCDay()];
  const dd = String(vnTime.getUTCDate()).padStart(2, "0");
  const mm = String(vnTime.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = vnTime.getUTCFullYear();
  const hh = String(vnTime.getUTCHours()).padStart(2, "0");
  const min = String(vnTime.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${min}, ${dayName} ${dd}/${mm}/${yyyy}`;
}

export function addDays(d: Date, n: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + n);
  return result;
}

export function isSameSlot(a: Date, b: Date): boolean {
  // So sánh theo UTC để tránh phụ thuộc timezone server
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate() &&
    a.getUTCHours() === b.getUTCHours()
  );
}
