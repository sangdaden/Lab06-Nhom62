# Top 3 failure modes - VinMec AI Health Assistant

**Project**: AI Health Assistant - Hỗ trợ người cao tuổi đặt lại lịch tái khám
**Người thực hiện**: Trần Đình Minh Vương (2A202600495)

> "Failure mode nào user KHÔNG BIẾT bị sai? Đó là cái nguy hiểm nhất."

---

## Template đầy đủ

| # | Trigger | Hậu quả | Mitigation |
|---|---------|---------|------------|
| 1 | AI hiểu sai thời gian (VD: "chiều thứ 6" → gợi ý sáng) | User đặt nhầm → đến sai giờ → mất slot | Confirm lại thời gian, hiển thị rõ "sáng/chiều" |
| 2 | AI nhắc sai người/lịch sử (nhắc lịch đã hủy) | User bối rối, mất niềm tin → không dùng app | Verify patient ID, log reminder để audit |
| 3 | Người cao tuổi không dùng được app (UI phức tạp) | User bỏ qua nhắc → missed appointment vẫn xảy ra | Caregiver mode, multi-channel (SMS/Zalo) |

---

## Chi tiết từng failure mode

### Failure Mode 1: AI hiểu sai thời gian

**Trigger**: User nói "chiều thứ 6" hoặc "2 giờ" (không rõ sáng/chiều)

**Hậu quả**:
- User KHÔNG BIẾT bị sai ngay - AI gợi ý sáng khi user muốn chiều
- Phát hiện muộn khi nhận SMS hoặc đến bệnh viện sai giờ
- Severity: HIGH

**Mitigation**:
1. Clarification: "Anh muốn 2 giờ sáng hay chiều?"
2. Confirmation: Hiển thị rõ "14:00 CHIỀU thứ 6 ngày 18/4"

**Đã phát hiện trong test**:
- Bug #1: "chiều thứ 6" → gợi ý 08:00, 09:00 (sáng)
- Bug #2: "2 giờ" → đặt 07:00 (không liên quan)

---

### Failure Mode 2: AI nhắc sai người/lịch sử

**Trigger**: Database có nhiều bệnh nhân cùng tên, lịch đã hủy nhưng AI vẫn nhắc

**Hậu quả**:
- User KHÔNG BIẾT bị sai ngay - nhận nhắc về lịch không phải của mình
- Phát hiện muộn khi gọi hotline hoặc đến bệnh viện
- Severity: HIGH

**Mitigation**:
1. Verify patient ID và appointment status trước khi gửi
2. Personalized content: "Chị Trần Thị Bình, mã lịch #APT12345"
3. Audit log tất cả reminder
4. User feedback: "Không phải lịch của tôi"

---

### Failure Mode 3: Người cao tuổi không dùng được app

**Trigger**: UI phức tạp, font nhỏ, không quen chat, không có smartphone

**Hậu quả**:
- User BIẾT nhưng không làm được
- Phát hiện muộn sau 2-3 ngày không phản hồi
- Severity: MEDIUM

**Mitigation**:
1. Caregiver mode: Gửi cho người thân
2. Multi-channel: App → SMS → Zalo → Phone call
3. Hotline fallback: Luôn có nút "Gọi tổng đài"
4. Simple UI: Font ≥ 18px, button ≥ 48px, tối đa 3 bước

**Đã chuẩn bị**:
- UI đơn giản, button lớn, flow 3 bước
- Chưa có: Caregiver mode, multi-channel

---

## Severity × Likelihood matrix

```
            Likelihood thấp          Likelihood cao
          ┌────────────────────┬────────────────────┐
Severity  │                    │  FAILURE MODE 1    │
cao       │                    │  (AI hiểu sai      │
          │                    │   thời gian)       │
          │                    │  → FIX NGAY        │
          ├────────────────────┼────────────────────┤
          │                    │  FAILURE MODE 2    │
          │                    │  (Nhắc sai người)  │
          │                    │  → Monitor + plan  │
          ├────────────────────┼────────────────────┤
Severity  │                    │  FAILURE MODE 3    │
thấp      │                    │  (User không dùng  │
          │                    │   được app)        │
          │                    │  → Fix khi có TG   │
          └────────────────────┴────────────────────┘
```

**Ưu tiên**:
1. FM1 (HIGH + HIGH): Đã phát hiện 2 bugs → fix trước demo
2. FM2 (HIGH + MEDIUM): Chưa xảy ra nhưng nguy hiểm → có plan
3. FM3 (MEDIUM + HIGH): Ảnh hưởng adoption → fix sau feedback

---

## Cascade failure

```
FM1 (AI hiểu sai thời gian)
  ↓
User đặt nhầm lịch (sáng thay vì chiều)
  ↓
Đến bệnh viện sai giờ → slot hết
  ↓
Phải đặt lại (gọi hotline)
  ↓
Tăng tải hotline + mất niềm tin
  ↓
User không dùng app nữa
  ↓
Mục tiêu giảm missed appointment THẤT BẠI
```

Chuỗi dài 7 bước → cần phòng tránh ở bước đầu (confirmation).

---

## Adversarial scenarios

| Scenario | Hậu quả | Phòng tránh |
|----------|---------|-------------|
| User spam request | Tăng cost API, server overload | Rate limit: 10 requests/phút |
| Prompt injection | AI leak thông tin bệnh nhân | Sanitize input, không cho AI truy cập raw DB |
| User đặt rồi không đến | Lãng phí slot | Blacklist sau 3 lần no-show |

---

## Câu hỏi mở rộng

### 1. Failure nào xuất hiện ở scale lớn?
FM2 (nhắc sai người) nghiêm trọng hơn ở production với 500K lượt/năm: bệnh nhân cùng tên, đổi SĐT, chuyển bệnh viện, database sync issues.

### 2. Failure nào tệ dần theo thời gian?
FM1 (AI hiểu sai) vì model drift - user dùng ngôn ngữ mới, thói quen đổi theo mùa, không có feedback loop. Cần monitoring + retraining 3-6 tháng/lần.

### 3. Automation vs augmentation?
Augmentation an toàn hơn:
- FM1: User thấy gợi ý sai → không chọn (vs AI đặt sai → không biết)
- FM2: User thấy thông tin sai → báo lỗi
- FM3: User có hotline fallback

---

## Tổng kết

**Top 3 theo ưu tiên**:
1. FM1: AI hiểu sai thời gian (HIGH + HIGH) → FIX NGAY
2. FM2: Nhắc sai người/lịch sử (HIGH + MEDIUM) → Monitor + plan
3. FM3: User không dùng được app (MEDIUM + HIGH) → Fix khi có thời gian

**Mitigation đã có**: Confirmation step, Simple UI, Audit log plan

**Cần bổ sung**: Clarification questions (FM1), Patient ID verification (FM2), Multi-channel (FM3)
