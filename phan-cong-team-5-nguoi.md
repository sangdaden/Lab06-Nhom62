# Phân công công việc cho team 5 người

## Mục tiêu chung
Trong ngày hackathon, team cần hoàn thành:
- `spec-final.md`
- `prototype-readme.md`
- prototype ở mức **mock** hoặc **working**
- poster/slides demo
- demo script 2 phút

> Lưu ý: **mỗi người phải có output rõ và tự giải thích được phần mình làm**.

---

## Phân vai đề xuất cho 5 người

| Người | Vai trò chính | Việc phải chốt | Output rõ ràng |
|------|---------------|----------------|----------------|
| **Sang** | Planner | Chốt problem statement, narrative, canvas | `spec-final.md` phần problem, canvas, demo story |
| **Người 2** | UX / Prototype design | Vẽ flow, wireframe, mock UI | Figma / sketch / mock screens |
| **Người 3** | AI / Prompt engineer | Viết prompt, test LLM, logic agent | prompt test log, system prompt, sample outputs |
| **Người 4** | Frontend / Integration | Build app/demo flow, nối UI với data mock/LLM | prototype chạy được |
| **Người 5** | Eval / QA / Demo ops | Metrics, failure modes, ROI, test cases, backup demo | bảng metrics, failure modes, ROI, video/screenshot backup |

---

## Công việc chi tiết theo từng người

### 1) Người 1 — Planner
**Phụ trách:**
- chốt 1 câu problem statement
- đảm bảo solution bám đúng đề VinMec
- quyết định rõ: **augmentation-first**
- gom nội dung vào `spec-final.md`
- dẫn dắt demo script và phân ai nói gì

**Checklist:**
- [ ] Viết problem statement 1 câu
- [ ] Điền `Value / Trust / Feasibility`
- [ ] Chốt 3 feature chính
- [ ] Viết phần opening cho demo 2 phút
- [ ] Kiểm tra mọi người có hiểu phần mình

---

### 2) Người 2 — UX / Prototype design
**Phụ trách:**
- vẽ user flow end-to-end
- làm sketch ban đầu trên giấy
- dựng mock UI bằng `Figma`, `Canva`, `v0`, hoặc HTML
- chuẩn bị poster/screenshots cho demo

**Màn hình gợi ý:**
1. Màn **Nhắc lịch tái khám**
2. Màn **AI chat hỗ trợ chọn slot**
3. Màn **Xác nhận lịch + chọn kênh nhắc**

**Checklist:**
- [ ] Có sketch trên giấy trước
- [ ] Có ít nhất 3 màn hình chính
- [ ] Flow click được hoặc ảnh rõ để demo
- [ ] Export screenshot cho poster/slides

---

### 3) Người 3 — AI / Prompt engineer
**Phụ trách:**
- chọn `Gemini`, `OpenAI`, hoặc `Claude`
- viết system prompt cho agent
- test các case: happy / low-confidence / failure / correction
- thiết kế feedback loop

**Prompt nhiệm vụ mẫu cho agent:**
- hiểu intent đặt lịch của bệnh nhân
- trích xuất ràng buộc thời gian
- trả lời dễ hiểu cho người cao tuổi
- nếu không chắc thì hỏi lại, không tự đoán

**Checklist:**
- [ ] Có system prompt rõ role/context/task/constraints/output
- [ ] Test ít nhất 5 câu input thật
- [ ] Log các case fail và cách sửa prompt
- [ ] Chuẩn bị 2–3 sample output đẹp để demo

---

### 4) Người 4 — Frontend / Integration
**Phụ trách:**
- dựng prototype chạy được
- nối UI với data mock hoặc API LLM
- làm flow `input → AI → output`
- chuẩn bị fallback nếu mạng/API lỗi

**Flow tối thiểu cần chạy:**
1. User nhập yêu cầu tự nhiên
2. Hệ thống gọi LLM
3. Trả về 2–3 slot gợi ý
4. User chọn và xác nhận thành công

**Checklist:**
- [ ] Prototype mở lên chạy được
- [ ] Có ít nhất 1 flow live demo
- [ ] Có dữ liệu slot giả nếu backend thật chưa xong
- [ ] Có video/screenshot backup nếu app lỗi

---

### 5) Người 5 — Eval / QA / Demo ops
**Phụ trách:**
- viết phần `eval metrics + threshold`
- viết `top 3 failure modes`
- viết `ROI 3 scenarios`
- test demo nhiều lần, bắt bug nhỏ
- chuẩn bị backup video, script, và file nộp

**Metrics gợi ý:**
- Reminder response rate
- Slot acceptance rate
- Rebooking completion rate

**Checklist:**
- [ ] Có 3 metrics + threshold rõ ràng
- [ ] Có 3 failure modes + mitigation
- [ ] Có ROI conservative / realistic / optimistic
- [ ] Dry run demo ít nhất 2 lần

---

## Timeline làm việc trong ngày

### 9:00 - 9:30
- Người 1 + 5 chốt Canvas
- Người 2 vẽ flow + sketch
- Người 3 viết prompt đầu tiên
- Người 4 tạo khung prototype

### 9:30 - 11:00
- Người 2 + 4 hoàn thiện **mock prototype**
- Người 3 test LLM thật
- Người 1 hoàn thiện narrative
- Người 5 viết metrics/failure modes/ROI

### 11:00 checkpoint
**Mục tiêu tối thiểu:** có cái để show:
- mock UI,
- 1 AI call thật,
- mỗi người nói được mình đang làm gì.

### 11:15 - 13:00
- Nối LLM vào flow demo
- Fix prompt / fix UI
- Gom nội dung vào `spec-final.md`

### 14:00 - 15:30
- polish demo
- làm poster/slides
- viết `prototype-readme.md`
- bấm giờ demo 2 phút

### 15:30 - 16:00
- dry run lần cuối
- mở sẵn app/demo/video backup
- phân người ở lại bàn demo và người đi review team khác

---

## Phân chia ai nói gì trong demo 2 phút

| Phần | Người phù hợp |
|------|---------------|
| **Problem** | Người 1 |
| **Solution + tại sao dùng LLM** | Người 3 |
| **Live demo** | Người 4 + Người 2 |
| **Failure mode + feedback loop + impact** | Người 5 |

---

## Nguyên tắc để không mất điểm cá nhân

- Mỗi người phải có **commit hoặc output rõ ràng**
- Mỗi người phải tự trả lời được:
  - `Auto hay aug?`
  - `Failure mode chính là gì?`
  - `Phần mình làm gì?`
- Không nên để 1 người làm hết rồi 4 người còn lại không giải thích được

---

## Chốt scope khuyến nghị

Nếu thời gian gấp, team chỉ cần làm thật tốt **1 flow chính**:

**AI nhắc tái khám → user trả lời bằng ngôn ngữ tự nhiên → AI gợi ý slot → user xác nhận → hệ thống nhắc lại đa kênh**

Flow này là đủ để:
- đúng bài toán,
- có LLM,
- có prototype,
- có demo rõ,
- có feedback loop để lấy bonus.
