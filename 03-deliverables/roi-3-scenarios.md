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

- VinMec: ~500K lượt tái khám/năm
- Missed appointment hiện tại: 15%
- Chi phí mỗi missed: 500K VNĐ (mất slot, tái lập lịch, hotline)
- Chi phí vận hành AI: 200M VNĐ/năm

---

## Scenario 1: Conservative

### Assumption
- Giảm missed appointment 15% → 12% (giảm 3%)
- Chỉ áp dụng 30% bệnh nhân (người cao tuổi)
- Adoption rate: 50%

### Tính toán
- Lượt áp dụng: 500K × 30% = 150K
- Appointment được cứu: 150K × 3% = 4,500
- Tiết kiệm: 4,500 × 500K = **2.25 tỷ/năm**
- Chi phí: 200M/năm
- **ROI: 2.05 tỷ/năm (10x)**

---

## Scenario 2: Realistic

### Assumption
- Giảm missed appointment 15% → 10% (giảm 5%)
- Áp dụng 50% bệnh nhân
- Adoption rate: 70%

### Tính toán
- Lượt áp dụng: 500K × 50% = 250K
- Appointment được cứu: 250K × 5% = 12,500
- Tiết kiệm: 12,500 × 500K = **6.25 tỷ/năm**
- Chi phí: 200M/năm
- **ROI: 6.05 tỷ/năm (30x)**

### Bonus
- Giảm tải hotline ~20%
- Tăng patient satisfaction
- Tăng slot utilization

---

## Scenario 3: Optimistic

### Assumption
- Giảm missed appointment 15% → 8% (giảm 7%)
- Áp dụng 70% bệnh nhân
- Adoption rate: 85%
- Có feedback loop

### Tính toán
- Lượt áp dụng: 500K × 70% = 350K
- Appointment được cứu: 350K × 7% = 24,500
- Tiết kiệm: 24,500 × 500K = **12.25 tỷ/năm**
- Chi phí: 200M/năm
- **ROI: 12.05 tỷ/năm (60x)**

### Bonus
- Tăng revenue từ slot được fill
- Tăng patient retention
- Giảm cost marketing
- Data flywheel: càng dùng → AI càng tốt

---

## Cost breakdown

| Hạng mục | Cách tính | VNĐ/năm |
|----------|-----------|---------|
| API inference | $0.01/call × 500K calls | 120M |
| Infrastructure | Cloud + DB | 50M |
| Maintain/monitor | 2h/tuần × 500K/h × 52 tuần | 52M |
| Data labeling | User feedback tự động | 0 |
| **Tổng** | | **~200M** |

Lưu ý: Cost inference giảm nhanh (~100x trong 2 năm).

---

## Benefit không quy đổi ra tiền

| Benefit | Đo bằng gì | Tại sao quan trọng |
|---------|-----------|-------------------|
| User experience tốt hơn | NPS, satisfaction | Retention dài hạn |
| Data từ interaction | Số correction/ngày | Competitive moat |
| Brand perception | Social sentiment | VinMec = innovative |
| Giảm stress nhân viên | Employee satisfaction | Giảm turnover |

---

## Time-to-value

```
Tuần 1-2: Onboarding, user học dùng
          Response rate: ~20%

Tuần 3-4: User quen → bắt đầu tiết kiệm
          Response: ~35%, Acceptance: ~60%

Tháng 2+:  Data flywheel → AI chính xác hơn
          Response: ~40%+, Acceptance: ~70%+, Completion: ~60%+
```

Stakeholder cần kiên nhẫn 1-2 tháng.

---

## Competitive moat

### Có moat
- Network effect: Nhiều user → nhiều data → AI tốt hơn
- Data unique: Thói quen đặt lịch của user VinMec là độc quyền
- Switching cost: User quen flow → khó chuyển competitor

### Không moat
- Competitor copy được UI/UX
- LLM API ai cũng dùng được

Kết luận: Moat vừa phải, data là lợi thế chính.

---

## Câu hỏi mở rộng

### 1. Nếu API cost giảm 10x?
Optimistic thay đổi nhiều nhất: Cost 200M → 80M, ROI 60x → 150x. Có thể mở rộng sang use case khác (đặt lịch mới, tư vấn sức khỏe).

### 2. Cần critical mass không?
Cần ít nhất 50K user active (10% của 500K) để data đủ lớn train AI, cost per user hợp lý, network effect kick in.

### 3. Kill criteria có hợp lý?
Hợp lý. Dựa trên response < 20%, acceptance < 50%, completion < 40%. Nếu đạt threshold sau 1-2 tháng → pivot hoặc dừng. Product Owner + VinMec leadership quyết định.

---

## So sánh benchmark

| Metric | VinMec AI | Industry (Healthcare AI) |
|--------|-----------|--------------------------|
| ROI (realistic) | 30x | 10-20x |
| Time-to-value | 1-2 tháng | 3-6 tháng |
| Adoption rate | 70% (target) | 40-60% |
| Missed appointment giảm | 5% (realistic) | 3-7% |

---

## Kết luận

### Có đáng build?

CÓ - vì:
1. Conservative đã ROI 10x (2.05 tỷ/năm)
2. Realistic ROI 30x (6.05 tỷ/năm)
3. Time-to-value nhanh (1-2 tháng)
4. Có competitive moat (data unique)
5. Kill criteria rõ ràng

### Next steps

1. MVP (tháng 1): Deploy 10% user (50K lượt)
2. Measure (tháng 2): Đo metrics thật
3. Scale (tháng 3+): Nếu đạt threshold → scale 50%
4. Optimize (tháng 6+): Feedback loop, improve AI

Rủi ro lớn nhất: User không adopt (response < 20%) → cần plan B (multi-channel, caregiver mode)
