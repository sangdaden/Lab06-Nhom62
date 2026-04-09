# Vương - Chi tiết công việc cần làm

## NHIỆM VỤ 1: Hoàn thiện Eval Metrics (9:15-9:45)

### Câu hỏi cần trả lời trong demo:

**Q: Tại sao chọn Precision-first?**
A: Vì trong bài toán y tế, AI đặt SAI lịch (false positive) nguy hiểm hơn là không gợi ý được (false negative). Người cao tuổi tin AI → nếu đặt sai → đi khám sai ngày → ảnh hưởng sức khỏe + mất niềm tin.

**Q: Làm sao đo được metrics này trong demo?**
A: 
- Mock 10 test cases với kết quả mong đợi
- Chạy live 3-5 cases trong demo
- Log kết quả và tính %

### Bảng metrics đầy đủ (copy vào spec-final.md)

```markdown
| Metric | Định nghĩa | Threshold | Red flag | Cách đo |
|--------|-----------|-----------|----------|---------|
| **Reminder response rate** | % user phản hồi sau khi nhận nhắc | ≥ 40% | < 20% | Log: sent_reminders / responded_reminders |
| **Slot acceptance rate** | % user chấp nhận slot AI đề xuất | ≥ 70% | < 50% | Log: suggested_slots / accepted_slots |
| **Rebooking completion rate** | % user hoàn tất flow đặt lại lịch | ≥ 60% | < 40% | Log: started_rebooking / completed_rebooking |
| **AI response time** | Thời gian từ input đến output | < 3s | > 5s | Measure API latency |
| **Intent accuracy** | % AI hiểu đúng ý định user | ≥ 85% | < 70% | Manual review 20 samples |
```

---

## NHIỆM VỤ 2: Hoàn thiện Failure Modes (9:45-10:30)

### Failure Mode 1: AI hiểu sai thời gian

**Severity × Likelihood:**
- Severity: **HIGH** (đặt sai lịch → ảnh hưởng sức khỏe)
- Likelihood: **MEDIUM** (LLM thường hiểu tốt thời gian, nhưng vẫn có edge cases)

**Test cases cần chạy:**
```
1. "Đặt giúp mẹ chiều thứ 6 tuần sau" → AI phải hiểu đúng tuần sau, không phải tuần này
2. "Đặt lịch 3 ngày nữa" → AI phải tính đúng ngày
3. "Đặt buổi sáng thứ 2" → AI phải hỏi lại: thứ 2 tuần nào?
4. "Đặt lúc 2 giờ" → AI phải hỏi: 2 giờ sáng hay chiều?
5. "Đặt cuối tuần" → AI phải hỏi: thứ 7 hay chủ nhật?
```

**Mitigation checklist:**
- [ ] AI confirm lại ngày/giờ cụ thể trước khi gợi ý slot
- [ ] Hiển thị rõ "Thứ 6, 26/4/2025" thay vì "thứ 6 tuần sau"
- [ ] Nếu AI confidence < 80% → hỏi lại thay vì đoán

---

### Failure Mode 2: AI nhắc sai người / sai lịch sử

**Severity × Likelihood:**
- Severity: **HIGH** (mất niềm tin hoàn toàn)
- Likelihood: **LOW** (nếu có patient ID validation)

**Test cases cần chạy:**
```
1. Patient A có lịch khám tim mạch → AI không được nhắc lịch khám da liễu
2. Patient B đã hủy lịch → AI không được nhắc lịch đã hủy
3. Patient C đã đặt lại lịch → AI không được nhắc lịch cũ
```

**Mitigation checklist:**
- [ ] Validate patient ID trước khi gửi nhắc
- [ ] Check appointment status (active/cancelled/completed)
- [ ] Log tất cả reminders để audit

---

### Failure Mode 3: Người cao tuổi không phản hồi được

**Severity × Likelihood:**
- Severity: **MEDIUM** (không nguy hiểm, nhưng mất mục đích)
- Likelihood: **HIGH** (người cao tuổi thường khó dùng app)

**Test cases cần chạy:**
```
1. UI có font đủ lớn không? (≥ 16px)
2. Button có đủ lớn để bấm không? (≥ 44x44px)
3. Có quá nhiều bước không? (tối đa 3 bước)
4. Có fallback option không? (gọi hotline, nhắc người thân)
```

**Mitigation checklist:**
- [ ] UI đơn giản, font lớn, button rõ ràng
- [ ] Có caregiver mode: gửi nhắc cho người thân
- [ ] Có multi-channel: SMS, Zalo nếu không phản hồi trên app
- [ ] Có hotline fallback: nút "Gọi tổng đài"

---

## NHIỆM VỤ 3: Tính ROI 3 Scenarios (10:30-11:00)

### Giả định cần validate với team:

**Hỏi Người 1 (Sang):**
- VinMec có bao nhiêu lượt tái khám/năm? → Giả định: 500,000
- Tỷ lệ missed appointment hiện tại? → Giả định: 15%
- Chi phí mỗi missed appointment? → Giả định: 500,000 VNĐ

**Hỏi Người 3 (AI Engineer):**
- Dùng LLM nào? → Gemini 2.0 Flash / GPT-4o mini
- Chi phí API/call? → Ước lượng: 100 VNĐ/call
- Số call/ngày? → Ước lượng: 1,000 calls/ngày

### Tính toán chi tiết:

**Cost breakdown:**
```
1. API cost: 100 VNĐ/call × 1,000 calls/ngày × 365 ngày = 36.5 triệu VNĐ/năm
2. Infrastructure: 50 triệu VNĐ/năm (server, database)
3. Maintenance: 2 người × 20 triệu/tháng × 12 tháng = 480 triệu VNĐ/năm (part-time)
4. TỔNG COST: ~200 triệu VNĐ/năm
```

**Benefit calculation:**

**Scenario 1: Conservative**
- Giảm missed appointment: 15% → 12% (giảm 3%)
- Áp dụng: 30% bệnh nhân
- Số appointment cứu được: 500,000 × 30% × 3% = 4,500
- Tiết kiệm: 4,500 × 500,000 = 2.25 tỷ VNĐ
- ROI: (2.25 tỷ - 0.2 tỷ) / 0.2 tỷ = **10x**

**Scenario 2: Realistic**
- Giảm missed appointment: 15% → 10% (giảm 5%)
- Áp dụng: 50% bệnh nhân
- Số appointment cứu được: 500,000 × 50% × 5% = 12,500
- Tiết kiệm: 12,500 × 500,000 = 6.25 tỷ VNĐ
- ROI: (6.25 tỷ - 0.2 tỷ) / 0.2 tỷ = **30x**

**Scenario 3: Optimistic**
- Giảm missed appointment: 15% → 8% (giảm 7%)
- Áp dụng: 70% bệnh nhân
- Số appointment cứu được: 500,000 × 70% × 7% = 24,500
- Tiết kiệm: 24,500 × 500,000 = 12.25 tỷ VNĐ
- ROI: (12.25 tỷ - 0.2 tỷ) / 0.2 tỷ = **60x**

**Kill criteria:**
- Nếu sau 3 tháng, reminder response rate < 20% → dừng
- Nếu cost > benefit trong 2 quý liên tục → dừng
- Nếu user satisfaction < 3/5 trong 1 tháng → pivot

---

## NHIỆM VỤ 4: Test Prototype (11:00-13:00)

### QA Checklist:

**Technical QA:**
- [ ] Prototype mở được trên laptop demo
- [ ] Internet/API key hoạt động
- [ ] Test 5 happy path cases:
  1. User nhận nhắc → trả lời "giữ lịch" → success
  2. User nhận nhắc → trả lời "đặt lại chiều thứ 6" → AI gợi ý slot → user chọn → success
  3. User nhập "đặt lúc 2 giờ" → AI hỏi lại "2 giờ sáng hay chiều?" → user trả lời → success
  4. User nhập "đặt cuối tuần" → AI hỏi "thứ 7 hay chủ nhật?" → user trả lời → success
  5. User không phản hồi → AI gửi nhắc cho người thân → success

- [ ] Test 3 edge cases:
  1. User nhập "đặt ngày 30/2" → AI phát hiện ngày không hợp lệ → hỏi lại
  2. User nhập "đặt lúc 3 giờ sáng" → AI phát hiện ngoài giờ làm việc → gợi ý giờ khác
  3. User nhập "đặt cho bố tôi" → AI hỏi thông tin bố → success

**Content QA:**
- [ ] Metrics table đã có trong spec-final.md
- [ ] Failure modes đã có trong spec-final.md
- [ ] ROI đã có trong spec-final.md
- [ ] Demo script dưới 2 phút

**Demo Ops QA:**
- [ ] Record video backup (60 giây)
- [ ] Screenshot 3 màn hình chính
- [ ] Export slides/poster thành PDF
- [ ] Zip file nộp đúng format

---

## NHIỆM VỤ 5: Chuẩn bị Demo (14:00-15:30)

### Demo script cho Vương (20s cuối):

**Phần 1: Failure modes (10s)**
```
"Failure mode lớn nhất là AI có thể hiểu sai thời gian - ví dụ nhầm tuần này 
thành tuần sau. Vì vậy bọn em có confirm step: AI sẽ hỏi lại 'Em hiểu là 
thứ 6 ngày 26/4, đúng không ạ?' trước khi gợi ý slot. Ngoài ra, nếu người 
cao tuổi không phản hồi được trên app, hệ thống sẽ gửi nhắc qua SMS, Zalo 
hoặc cho người thân."
```

**Phần 2: Impact + ROI (10s)**
```
"Với conservative estimate, giải pháp này có thể giảm 3% missed appointment, 
tiết kiệm hơn 2 tỷ đồng mỗi năm cho VinMec. Hệ thống còn có feedback loop: 
ghi nhận user thích nhắc qua kênh nào, thích nhắc buổi sáng hay chiều, để 
lần sau nhắc chính xác hơn."
```

### Backup plan:

**Plan A: Live demo** (ưu tiên)
- Mở prototype thật
- Chạy 1 flow: nhắc lịch → user trả lời → AI gợi ý → user chọn → success

**Plan B: Video backup** (nếu mạng lỗi)
- Play video 60 giây đã record sẵn

**Plan C: Screenshot walkthrough** (nếu video lỗi)
- Show 3 màn hình: nhắc lịch → chat AI → xác nhận

**Plan D: Verbal + vẽ** (worst case)
- Giải thích flow bằng lời
- Vẽ trên giấy/whiteboard

---

## NHIỆM VỤ 6: Dry Run (15:30-16:00)

### Checklist dry run:

- [ ] Bấm giờ: tổng demo ≤ 2 phút
- [ ] Phân công:
  - Người 1 (Sang): Problem (20s)
  - Người 3: Solution + LLM (20s)
  - Người 4 + 2: Live demo (60s)
  - Người 5 (Vương): Failure modes + ROI (20s)

- [ ] Test chuyển tiếp giữa các người
- [ ] Test backup plan nếu tech fail
- [ ] Chuẩn bị trả lời Q&A

---

## CHECKLIST CUỐI CÙNG

### File cần nộp:
- [ ] spec-final.md (có metrics, failure modes, ROI)
- [ ] prototype-readme.md
- [ ] Prototype link/code
- [ ] Demo video/slides
- [ ] Flow diagram (bonus)

### Câu trả lời Q&A chuẩn bị sẵn:

**Q1: Làm sao đo metrics này?**
A: Mock 10 test cases, chạy live 3-5 cases, log kết quả. Production sẽ có analytics dashboard.

**Q2: Nếu AI sai thì sao?**
A: 3 lớp safety: (1) AI confirm lại, (2) user xác nhận cuối, (3) hotline fallback.

**Q3: ROI có realistic không?**
A: Em dùng conservative estimate: chỉ giảm 3% missed appointment, chỉ áp dụng 30% user. Nếu scale rộng hơn thì ROI còn cao hơn.

**Q4: Tại sao không automation?**
A: Vì bài toán y tế, AI tự đặt sai lịch thì ảnh hưởng sức khỏe. Augmentation an toàn hơn.

---

**Good luck, Vương! 🚀**
