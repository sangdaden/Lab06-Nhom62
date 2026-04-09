# ROI 3 kịch bản - VinMec AI Health Assistant

**Project**: AI Health Assistant - Hỗ trợ người cao tuổi đặt lại lịch tái khám
**Người thực hiện**: Trần Đình Minh Vương (2A202600495)

---

## Template

|   | Conservative | Realistic | Optimistic |
|---|-------------|-----------|------------|
| **Assumption** | AI giảm missed appointment từ 15% → 12% (giảm 3%), áp dụng cho 30% bệnh nhân | AI giảm missed appointment từ 15% → 10% (giảm 5%), áp dụng cho 50% bệnh nhân | AI giảm missed appointment từ 15% → 8% (giảm 7%), áp dụng cho 70% bệnh nhân |
| **Cost** | 200 triệu VNĐ/năm (API + infra + maintenance) | 200 triệu VNĐ/năm | 200 triệu VNĐ/năm |
| **Benefit** | 4,500 appointments được cứu × 500,000 VNĐ = 2.25 tỷ VNĐ/năm | 12,500 appointments được cứu × 500,000 VNĐ = 6.25 tỷ VNĐ/năm | 24,500 appointments được cứu × 500,000 VNĐ = 12.25 tỷ VNĐ/năm |
| **Net** | 2.25 tỷ − 0.2 tỷ = **+2.05 tỷ VNĐ/năm (10x ROI)** | 6.25 tỷ − 0.2 tỷ = **+6.05 tỷ VNĐ/năm (30x ROI)** | 12.25 tỷ − 0.2 tỷ = **+12.05 tỷ VNĐ/năm (60x ROI)** |

**Kill criteria:** 
- Reminder response rate < 20% sau 1 tháng
- Slot acceptance rate < 50% sau 2 tuần
- Rebooking completion rate < 40% sau 1 tháng
- Cost > benefit trong 2 tháng liên tục

---

## Giả định chung

- VinMec có ~500,000 lượt tái khám/năm
- Tỷ lệ missed appointment hiện tại: 15%
- Chi phí mỗi missed appointment: 500,000 VNĐ (mất slot, tái lập lịch, hotline)
- Chi phí vận hành AI: 200 triệu VNĐ/năm (infra + maintenance)

---

## Scenario 1: Conservative (Thận trọng)

### Assumption
- AI giảm missed appointment từ 15% → 12% (giảm 3%)
- Chỉ áp dụng cho 30% bệnh nhân (người cao tuổi)
- Adoption rate: 50% (chỉ một nửa user thực sự dùng)

### Tính toán
- Số lượt tái khám áp dụng: 500,000 × 30% = 150,000
- Số appointment được cứu: 150,000 × 3% = 4,500
- Tiết kiệm: 4,500 × 500,000 = **2.25 tỷ VNĐ/năm**
- Chi phí: 200 triệu VNĐ/năm
- **ROI: 2.05 tỷ VNĐ/năm (10x)**

### Tại sao conservative?
- Chỉ target người cao tuổi (30% user)
- Giả định adoption thấp (50%)
- Chỉ giảm 3% missed appointment (thấp nhất)

---

## Scenario 2: Realistic (Thực tế)

### Assumption
- AI giảm missed appointment từ 15% → 10% (giảm 5%)
- Áp dụng cho 50% bệnh nhân
- Adoption rate: 70%

### Tính toán
- Số lượt tái khám áp dụng: 500,000 × 50% = 250,000
- Số appointment được cứu: 250,000 × 5% = 12,500
- Tiết kiệm: 12,500 × 500,000 = **6.25 tỷ VNĐ/năm**
- Chi phí: 200 triệu VNĐ/năm
- **ROI: 6.05 tỷ VNĐ/năm (30x)**

### Bonus
- Giảm tải hotline: ~20% cuộc gọi về đặt lịch
- Tăng patient satisfaction score
- Tăng slot utilization (fill các slot trống)

### Tại sao realistic?
- Target rộng hơn (50% user)
- Adoption rate hợp lý (70%)
- Giảm 5% missed appointment (có thể đạt được)

---

## Scenario 3: Optimistic (Lạc quan)

### Assumption
- AI giảm missed appointment từ 15% → 8% (giảm 7%)
- Áp dụng cho 70% bệnh nhân
- Adoption rate: 85%
- Có feedback loop → cải thiện liên tục

### Tính toán
- Số lượt tái khám áp dụng: 500,000 × 70% = 350,000
- Số appointment được cứu: 350,000 × 7% = 24,500
- Tiết kiệm: 24,500 × 500,000 = **12.25 tỷ VNĐ/năm**
- Chi phí: 200 triệu VNĐ/năm
- **ROI: 12.05 tỷ VNĐ/năm (60x)**

### Bonus
- Tăng revenue từ slot được fill
- Tăng patient retention (user quay lại VinMec)
- Giảm chi phí marketing để re-engage patient
- Data flywheel: càng dùng → AI càng tốt → càng nhiều user

### Tại sao optimistic?
- Target rộng nhất (70% user)
- Adoption rate cao (85%)
- Giảm 7% missed appointment (tốt nhất)
- Có feedback loop để cải thiện liên tục

---

## Cost breakdown chi tiết

| Hạng mục | Cách tính | Ước lượng (VNĐ/năm) |
|----------|-----------|---------------------|
| API inference (Gemini/OpenAI) | ~$0.01/call × 500,000 calls/năm | 120 triệu |
| Infrastructure (hosting, DB) | Cloud hosting + database | 50 triệu |
| Nhân lực maintain/monitor | 2 giờ/tuần × 500,000 VNĐ/giờ × 52 tuần | 52 triệu |
| Data labeling / correction | Minimal (user feedback tự động) | 0 |
| **Tổng cost/năm** | | **~200 triệu VNĐ** |

**Lưu ý**: Cost inference giảm nhanh (~100x trong 2 năm) → worst case hôm nay ≠ worst case 6 tháng sau

---

## Benefit không quy đổi được ra tiền

Không phải benefit nào cũng là tiền — nhưng vẫn có giá trị:

| Benefit | Đo bằng gì | Tại sao quan trọng |
|---------|-----------|-------------------|
| **User experience tốt hơn** | NPS, satisfaction score | Retention dài hạn, user quay lại VinMec |
| **Data thu được từ user interaction** | Số correction/ngày, signal quality | Competitive moat — càng dùng càng tốt, competitor khó bắt kịp |
| **Brand perception** | Social media sentiment, PR coverage | Khách hàng coi VinMec là innovative, tech-forward |
| **Giảm stress cho nhân viên hotline** | Employee satisfaction | Giảm turnover, tăng productivity |

---

## Time-to-value

Mất bao lâu từ khi deploy đến khi thấy benefit?

```
Tuần 1-2: Onboarding, user học cách dùng → chưa thấy benefit rõ
          - Gửi tutorial video
          - Hotline hỗ trợ 24/7
          - Reminder response rate: ~20%

Tuần 3-4: User quen → bắt đầu tiết kiệm thời gian
          - Reminder response rate: ~35%
          - Slot acceptance rate: ~60%
          - Bắt đầu thấy giảm missed appointment

Tháng 2+:  Data flywheel kick in → AI chính xác hơn → benefit tăng dần
          - Reminder response rate: ~40%+
          - Slot acceptance rate: ~70%+
          - Rebooking completion rate: ~60%+
          - ROI bắt đầu rõ ràng
```

**Stakeholder cần kiên nhẫn**: 1-2 tháng để thấy benefit rõ ràng

---

## Competitive moat

Product có tạo được lợi thế cạnh tranh theo thời gian không?

### Có moat ✅
- **Network effect**: Càng nhiều user → càng nhiều data → AI càng tốt → càng nhiều user
- **Data unique**: Dữ liệu tương tác user với VinMec (thói quen đặt lịch, preference) là độc quyền
- **Switching cost**: User đã quen flow → khó chuyển sang competitor

### Không moat ❌
- Competitor có thể copy UI/UX
- LLM API (Gemini/OpenAI) ai cũng dùng được

**Kết luận**: Product có moat vừa phải. Data là lợi thế chính.

---

## Câu hỏi mở rộng

### 1. Nếu API cost giảm 10x trong 6 tháng, kịch bản nào thay đổi nhiều nhất?

**Trả lời**: Cả 3 kịch bản đều tăng ROI, nhưng **Optimistic** thay đổi nhiều nhất vì:
- Cost giảm từ 200 triệu → 80 triệu VNĐ/năm
- ROI tăng từ 60x → 150x
- Có thể mở rộng sang nhiều use case khác (đặt lịch khám mới, tư vấn sức khỏe)

### 2. Product có cần đạt critical mass (số user tối thiểu) để benefit kick in không?

**Trả lời**: Có, cần ít nhất **50,000 user active** (10% của 500,000 lượt tái khám) để:
- Data đủ lớn để train/improve AI
- Cost per user hợp lý (economies of scale)
- Network effect bắt đầu kick in

### 3. Kill criteria hiện tại có quá aggressive hay quá lỏng?

**Trả lời**: **Hợp lý**. Kill criteria dựa trên:
- Reminder response rate < 20% → user không thấy hữu ích
- Slot acceptance rate < 50% → AI gợi ý sai
- Rebooking completion rate < 40% → flow quá phức tạp

Nếu đạt các threshold này sau 1-2 tháng → nên pivot hoặc dừng.

**Ai quyết định "dừng"?** Product Owner + Stakeholder (VinMec leadership)

---

## So sánh với benchmark

| Metric | VinMec AI Assistant | Industry benchmark (Healthcare AI) |
|--------|---------------------|-----------------------------------|
| ROI (realistic) | 30x | 10-20x |
| Time-to-value | 1-2 tháng | 3-6 tháng |
| Adoption rate | 70% (target) | 40-60% |
| Missed appointment reduction | 5% (realistic) | 3-7% |

**Kết luận**: VinMec AI Assistant có ROI cao hơn benchmark, time-to-value nhanh hơn.

---

## Kết luận

### Có đáng build không?

**CÓ** - vì:
1. ✅ Conservative scenario đã có ROI 10x (2.05 tỷ VNĐ/năm)
2. ✅ Realistic scenario có ROI 30x (6.05 tỷ VNĐ/năm)
3. ✅ Time-to-value nhanh (1-2 tháng)
4. ✅ Có competitive moat (data unique)
5. ✅ Kill criteria rõ ràng (biết khi nào nên dừng)

### Next steps

1. **MVP (tháng 1)**: Deploy cho 10% user (50,000 lượt tái khám)
2. **Measure (tháng 2)**: Đo metrics thật (response rate, acceptance rate, completion rate)
3. **Scale (tháng 3+)**: Nếu metrics đạt threshold → scale lên 50% user
4. **Optimize (tháng 6+)**: Feedback loop, improve AI, thêm features

**Rủi ro lớn nhất**: User không adopt (response rate < 20%) → cần có plan B (multi-channel, caregiver mode)
