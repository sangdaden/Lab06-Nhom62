# Eval metrics + threshold - VinMec AI Health Assistant

**Project**: AI Health Assistant - Hỗ trợ người cao tuổi đặt lại lịch tái khám
**Người thực hiện**: Trần Đình Minh Vương (2A202600495)

---

## Precision hay recall?

**Chọn: Recall** — tìm được hết những cái cần tìm (ít false negative)

**Tại sao?** 
Bỏ sót lịch tái khám (false negative) nguy hiểm hơn nhắc thừa (false positive). Nếu AI không nhắc → bệnh nhân quên → bỏ lỡ tái khám → ảnh hưởng sức khỏe.

**Nếu sai ngược lại thì sao?** 
Optimize precision → AI chỉ nhắc khi "chắc chắn 100%" → nhiều bệnh nhân không được nhắc → missed appointment vẫn cao.

**Trade-off:**
- Chấp nhận: Gửi nhắc thừa 1-2 lần → bệnh nhân bỏ qua
- Không chấp nhận: Bỏ sót nhắc nhở → bệnh nhân bỏ lỡ tái khám

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

## Giải thích từng metric

### 1. Reminder response rate
% bệnh nhân phản hồi sau khi nhận nhắc nhở. Đo "reach" - AI có tiếp cận đúng người đúng lúc không.

**Cách đo**: (Số user phản hồi / Tổng số nhắc gửi) × 100%

**Threshold**: ≥ 40% OK, < 20% red flag

---

### 2. Slot acceptance rate
% user chấp nhận slot AI gợi ý. Đo "relevance" - AI có hiểu đúng ràng buộc thời gian không.

**Cách đo**: (Số lần user chọn slot AI gợi ý / Tổng số lần gợi ý) × 100%

**Threshold**: ≥ 70% tốt, < 50% red flag

**Hiện trạng**: 60% từ test → cần cải thiện

---

### 3. Rebooking completion rate
% user hoàn tất flow từ nhận nhắc → chọn slot → xác nhận. Metric quan trọng nhất vì đo conversion thực tế.

**Cách đo**: (Số user hoàn tất / Số user nhận nhắc) × 100%

**Threshold**: ≥ 60% OK, < 40% red flag

**Funnel**: 100 nhận nhắc → 40 phản hồi → 28 chọn slot → 24 hoàn tất

---

## User-facing vs internal metrics

| Metric | User thấy? | Dùng để làm gì |
|--------|-----------|-----------------|
| Reminder response rate | Không | Theo dõi hiệu quả nhắc nhở |
| Slot acceptance rate | Không | Cải thiện thuật toán gợi ý |
| Rebooking completion rate | Không | Đo conversion, tìm bottleneck |
| AI response time | Có (gián tiếp) | User thấy loading nếu > 2s |
| Booking confirmation code | Có | Mã xác nhận để tracking |

User cao tuổi không quan tâm số liệu, chỉ cần trải nghiệm mượt.

---

## Offline vs online eval

| Loại | Khi nào | Đo gì |
|------|---------|-------|
| Offline | Trước deploy | Intent accuracy, slot matching |
| Online | Sau deploy | Response rate, acceptance rate, completion rate |

**Hiện trạng**:
- Offline: Intent accuracy 93.75% (8 test cases)
- Online: Chưa có data thật

**Khi deploy**: Theo dõi online metrics tuần 1-2, nếu thấp hơn offline → investigate user behavior

---

## A/B test design

| Test | Variant A | Variant B | Kết quả mong đợi |
|------|-----------|-----------|-------------------|
| Timing nhắc nhở | Trước 7 ngày | Trước 3 ngày | 3 ngày → response cao hơn |
| Channel | App only | App + SMS | SMS → response cao hơn (người cao tuổi) |
| Số slot gợi ý | 3 slots | 5 slots | 3 slots → ít choice paradox |

---

## Câu hỏi mở rộng

### 1. Metric nào đo được sớm nhất?
- Sớm nhất: AI response time, intent accuracy (ngày 1)
- Cần thời gian: Response rate, completion rate (tuần/tháng)

### 2. Nếu chỉ chọn 1 metric?
**Rebooking completion rate** - metric end-to-end phản ánh mục tiêu cuối (giảm missed appointment). Nếu cao → các bước trước OK, nếu thấp → drill down tìm bottleneck.

### 3. Metric có bị "game" không?

| Metric | Cách game | Phòng tránh |
|--------|-----------|-------------|
| Response rate | Spam nhắc nhiều lần | Giới hạn 2 nhắc/tuần |
| Acceptance rate | Chỉ gợi ý slot "chắc chắn" | Đo thêm slot diversity |
| Completion rate | Flow quá đơn giản, không confirm | Bắt buộc confirm cuối |

---

## Kết luận

**Chiến lược**:
1. Primary KPI: Rebooking completion rate (≥ 60%)
2. Secondary KPIs: Response rate (≥ 40%), Slot acceptance rate (≥ 70%)
3. Health metrics: AI response time (< 3s), Intent accuracy (≥ 85%)

Ưu tiên recall vì bỏ sót nguy hiểm hơn nhắc thừa.

**Next steps**: Deploy với tracking → thu thập metrics 2 tuần → điều chỉnh threshold
