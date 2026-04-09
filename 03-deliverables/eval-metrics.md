# Eval metrics + threshold - VinMec AI Health Assistant

**Project**: AI Health Assistant - Hỗ trợ người cao tuổi đặt lại lịch tái khám
**Người thực hiện**: Trần Đình Minh Vương (2A202600495)

---

## Precision hay recall?

☑ **Recall** — tìm được hết những cái cần tìm (ít false negative)

**Tại sao?** 
Trong bài toán đặt lịch tái khám cho người cao tuổi, việc BỎ SÓT một lịch tái khám quan trọng (false negative) nguy hiểm hơn việc gửi nhắc nhở thừa (false positive). Nếu AI không nhắc nhở → bệnh nhân quên → bỏ lỡ tái khám → ảnh hưởng sức khỏe.

**Nếu sai ngược lại thì sao?** 
Nếu optimize precision (ít false positive) → AI sẽ chỉ nhắc khi "chắc chắn 100%" → nhiều bệnh nhân không được nhắc → tỷ lệ missed appointment vẫn cao → mục tiêu giảm missed appointment thất bại.

**Trade-off chấp nhận được:**
- ✅ Chấp nhận: Gửi nhắc nhở thừa 1-2 lần (false positive) → bệnh nhân chỉ cần bỏ qua
- ❌ KHÔNG chấp nhận: Bỏ sót nhắc nhở (false negative) → bệnh nhân bỏ lỡ tái khám quan trọng

---

## Metrics table

| Metric | Threshold | Red flag (dừng khi) |
|--------|-----------|---------------------|
| **Reminder response rate** (% user phản hồi sau khi nhận nhắc) | ≥ 40% | < 20% trong 1 tuần → user không thấy hữu ích |
| **Slot acceptance rate** (% user chấp nhận slot AI đề xuất) | ≥ 70% | < 50% trong 2 tuần → AI gợi ý không phù hợp |
| **Rebooking completion rate** (% user hoàn tất flow đặt lại lịch) | ≥ 60% | < 40% trong 1 tuần → flow quá phức tạp hoặc AI không hiểu |

### Metrics phụ (theo dõi nhưng không phải KPI chính)

| Metric | Mục tiêu | Lý do theo dõi |
|--------|----------|----------------|
| **AI response time** | < 3 giây | User cao tuổi không kiên nhẫn chờ lâu |
| **Intent accuracy** | ≥ 85% | Đo xem AI hiểu đúng yêu cầu user bao nhiêu % |
| **Multi-turn success rate** | ≥ 75% | Đo khả năng AI xử lý hội thoại nhiều lượt |

---

## Giải thích chi tiết từng metric

### 1. Reminder response rate (Recall-focused)

**Định nghĩa**: % bệnh nhân phản hồi (click vào app, trả lời tin nhắn) sau khi nhận nhắc nhở tái khám.

**Tại sao quan trọng**: 
- Metric này đo "reach" - AI có tiếp cận được đúng người đúng lúc không
- Nếu response rate thấp → nhắc nhở không hiệu quả → missed appointment vẫn cao

**Cách đo**:
```
Response rate = (Số user phản hồi / Tổng số nhắc nhở gửi) × 100%
```

**Threshold logic**:
- ≥ 40%: Chấp nhận được (4/10 người phản hồi)
- < 20%: Red flag (chỉ 2/10 người phản hồi → nhắc nhở không hiệu quả)

**Offline eval**: Mock 100 nhắc nhở, đếm bao nhiêu người click vào
**Online eval**: Theo dõi click rate thật trên production

---

### 2. Slot acceptance rate (Precision-focused trong gợi ý)

**Định nghĩa**: % user chấp nhận slot mà AI gợi ý (không phải tự tìm slot khác).

**Tại sao quan trọng**:
- Metric này đo "relevance" - AI có hiểu đúng ràng buộc thời gian của user không
- Nếu acceptance rate thấp → AI gợi ý sai → user phải tìm lại → mất thời gian → trải nghiệm tệ

**Cách đo**:
```
Acceptance rate = (Số lần user chọn slot AI gợi ý / Tổng số lần AI gợi ý) × 100%
```

**Threshold logic**:
- ≥ 70%: Tốt (7/10 lần AI gợi ý đúng)
- < 50%: Red flag (chỉ 5/10 lần đúng → AI không hiểu user)

**Hiện trạng**: 60% (từ test results) → cần cải thiện

---

### 3. Rebooking completion rate (End-to-end success)

**Định nghĩa**: % user hoàn tất toàn bộ flow từ nhận nhắc → chọn slot → xác nhận đặt lịch.

**Tại sao quan trọng**:
- Metric này đo "conversion" - bao nhiêu % user thực sự đặt lại lịch thành công
- Đây là metric quan trọng nhất vì liên quan trực tiếp đến mục tiêu giảm missed appointment

**Cách đo**:
```
Completion rate = (Số user hoàn tất đặt lịch / Số user nhận nhắc nhở) × 100%
```

**Threshold logic**:
- ≥ 60%: Chấp nhận được (6/10 người hoàn tất)
- < 40%: Red flag (chỉ 4/10 hoàn tất → có vấn đề lớn trong flow)

**Funnel breakdown**:
```
100 user nhận nhắc
  → 40 user phản hồi (40% response rate)
    → 28 user chọn slot (70% acceptance rate)
      → 24 user hoàn tất (60% completion rate)
```

---

## User-facing metrics vs internal metrics

| Metric | User thấy? | Dùng để làm gì |
|--------|-----------|-----------------|
| **Reminder response rate** | ☐ Không | Internal: theo dõi hiệu quả nhắc nhở, điều chỉnh timing/channel |
| **Slot acceptance rate** | ☐ Không | Internal: cải thiện thuật toán gợi ý slot |
| **Rebooking completion rate** | ☐ Không | Internal: đo conversion, tìm điểm rớt trong funnel |
| **AI response time** | ☑ Có (gián tiếp) | User thấy loading state nếu > 2 giây |
| **Booking confirmation code** | ☑ Có | User thấy mã xác nhận (VD: BB47RQ) để tracking |

**Lý do không show metrics cho user**:
- User cao tuổi không quan tâm đến số liệu
- Chỉ cần trải nghiệm mượt mà, không cần biết "AI đúng 85%"

---

## Offline eval vs online eval

| Loại | Khi nào | Đo gì | Ví dụ |
|------|---------|-------|-------|
| **Offline** | Trước khi deploy | Intent accuracy, slot matching accuracy | Chạy 100 câu hỏi mẫu, đo xem AI hiểu đúng bao nhiêu % |
| **Online** | Sau khi deploy | Response rate, acceptance rate, completion rate | Theo dõi hành vi user thật: có click không? Có chọn slot không? Có hoàn tất không? |

**Hiện trạng**:
- ✅ Offline eval: Intent accuracy 93.75% (từ 8 test cases)
- ⚠️ Online eval: Chưa có data thật (chỉ có prototype test)

**Khi deploy production**:
- Tuần 1-2: Theo dõi online metrics hàng ngày
- Nếu online metrics thấp hơn offline → investigate nguyên nhân (user behavior khác test cases)

---

## A/B test design (nếu có thời gian)

Nếu đưa product ra thật, sẽ A/B test gì đầu tiên?

| Test | Variant A | Variant B | Metric theo dõi | Kết quả mong đợi |
|------|-----------|-----------|------------------|-------------------|
| **Timing nhắc nhở** | Nhắc trước 7 ngày | Nhắc trước 3 ngày | Response rate, completion rate | 3 ngày → response rate cao hơn (gần hơn, nhớ rõ hơn) |
| **Channel nhắc nhở** | Chỉ app notification | App + SMS | Response rate | App + SMS → response rate cao hơn (người cao tuổi check SMS nhiều hơn) |
| **Số slot gợi ý** | Gợi ý 3 slots | Gợi ý 5 slots | Acceptance rate, decision time | 3 slots → acceptance rate cao hơn (ít choice paradox) |

---

## Câu hỏi mở rộng

### 1. Metric nào đo được sớm nhất? Metric nào cần thời gian?

- **Sớm nhất (ngày 1)**: AI response time, intent accuracy → đo ngay khi có prototype
- **Cần thời gian (tuần/tháng)**: Response rate, completion rate → cần user thật dùng trong thời gian dài

### 2. Nếu chỉ được chọn 1 metric duy nhất, chọn gì?

**Chọn: Rebooking completion rate**

**Tại sao**: 
- Đây là metric end-to-end, phản ánh mục tiêu cuối cùng (giảm missed appointment)
- Nếu completion rate cao → tất cả các bước trước đó (response, acceptance) đều OK
- Nếu completion rate thấp → có thể drill down để tìm bottleneck

### 3. Metric có bị "game" được không?

**Có thể bị game**:

| Metric | Cách game | Hậu quả | Phòng tránh |
|--------|-----------|---------|-------------|
| **Response rate** | Gửi nhắc nhở spam nhiều lần | User bực → uninstall app | Giới hạn tối đa 2 nhắc/tuần |
| **Acceptance rate** | AI chỉ gợi ý slot "chắc chắn" (VD: chỉ slot sáng thứ 2) | User không có lựa chọn linh hoạt | Đo thêm "slot diversity" |
| **Completion rate** | Làm flow quá đơn giản (1 click = done) nhưng không confirm | User đặt nhầm lịch | Bắt buộc có bước confirm cuối |

**Cách phòng tránh**: Theo dõi nhiều metrics cùng lúc, không optimize 1 metric đơn lẻ.

---

## Kết luận

**Chiến lược metrics**:
1. **Primary KPI**: Rebooking completion rate (≥ 60%)
2. **Secondary KPIs**: Response rate (≥ 40%), Slot acceptance rate (≥ 70%)
3. **Health metrics**: AI response time (< 3s), Intent accuracy (≥ 85%)

**Ưu tiên recall over precision** vì bỏ sót nhắc nhở nguy hiểm hơn nhắc thừa.

**Next steps**:
- Deploy prototype với tracking code
- Thu thập online metrics trong 2 tuần đầu
- Điều chỉnh threshold dựa trên data thật
