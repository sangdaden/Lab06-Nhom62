# Ngày 6 — Hackathon: SPEC → Prototype → Demo

> Không có lecture mới. Hôm nay = chứng minh. SPEC là hypothesis, Prototype là evidence, Demo là convince.

---

## Tổng quan

```text
SÁNG (9:00-13:00)              CHIỀU (14:00-16:00)            DEMO DAY (16:00-18:00)
┌────────────────────┐        ┌────────────────────┐         ┌────────────────────┐
│   BUILD PROTOTYPE   │        │   POLISH + PREP     │         │  GALLERY WALK +     │
│                     │        │                     │         │  DEMO ROUND         │
│  M1: Canvas check   │        │  Polish prototype    │         │  60 phút             │
│  Build              │   →    │  Viết demo script    │    →    ├────────────────────┤
│  M2: Show 1 thứ     │        │  M4: Dry run + setup │         │  TOP TEAMS PRESENT  │
│  Build tiếp         │        │                     │         │  + TRAO GIẢI         │
│  M3: SPEC final     │        │                     │         │                     │
└────────────────────┘        └────────────────────┘         └────────────────────┘
```

---

## Timeline

| Giờ | Milestone | Nội dung | Ghi chú |
|-----|-----------|----------|---------|
| 9:00 | **M1** | Canvas check + SPEC draft review | Chưa có Canvas → bổ sung trước 9:30 |
| 9:15 | | **Build Prototype** | GV đi vòng: "Đang build gì? Stuck ở đâu?" |
| 11:00 | **M2** | **"Show ít nhất mock prototype"** — GV check từng nhóm | Chưa có → simplify scope / dùng tool mock nhanh |
| 11:15 | | Build tiếp | |
| 13:00 | **M3** | **SPEC final + demo flow draft** | Trước nghỉ trưa — chiều chỉ polish |
| 13:00–14:00 | | Nghỉ trưa | |
| 14:00 | | Polish + chuẩn bị demo | 15:00: "1h nữa Demo. Freeze code, focus narrative." |
| 15:30 | **M4** | Demo prep done + dry run | Mỗi nhóm 1 bàn: laptop + poster/slides |
| **16:00** | **M5** | **Gallery walk + demo round (60 phút)** | 2-3 ở lại trình bày + 2-3 đi xem + feedback form |
| **17:00** | **M6** | **Top teams present + trao giải + closing** | |

---

## Deliverables

| # | Deliverable | Loại | Deadline |
|---|-------------|------|----------|
| 1 | **SPEC final** — Canvas + 6 phần đầy đủ | Nhóm | 23h59 09/04/2026 |
| 2 | **Prototype** — link/file + mô tả + supported links | Nhóm | 23h59 09/04/2026 |
| 3 | **Demo** — poster/slides | Nhóm | 23h59 09/04/2026 |
| 4 | **Feedback** — đánh giá các team khác trong zone | Cá nhân | 23h59 09/04/2026 |
| 5 | **Reflection** — role + đóng góp + reflection | Cá nhân | 23h59 09/04/2026 |

---

## Prototype — 3 levels

| Level | Mô tả | Ví dụ | Điểm |
|-------|-------|-------|------|
| **Sketch** | Vẽ/draft flow trên giấy, slides, whiteboard. Chưa build gì. | Vẽ user journey trên giấy: user mở app → nhập triệu chứng → AI gợi ý khoa → user chọn → đặt lịch | Đủ điểm |
| **Mock prototype** | UI/flow build được (HTML, app) nhưng chưa gắn AI thật. Dùng tools: Antigravity, Claude, v0, Figma... | App HTML có form nhập triệu chứng, hiện kết quả mẫu, flow click được — nhưng chưa gọi API AI | Đủ điểm |
| **Working prototype** | Có AI chạy thật. Input → AI xử lý → output. Demo live được. | App gọi Gemini API: user nhập triệu chứng → AI phân tích → trả gợi ý khoa + confidence score | **Bonus điểm** |

**Checkpoint M2 (11:00):** mỗi nhóm phải có ít nhất **mock prototype**. Chưa có → simplify scope hoặc dùng tool mock nhanh (Antigravity, Claude, Figma).

**Lưu ý:**
- Sketch + Mock: vẫn phải có ít nhất 1 prompt/AI call chạy thật kèm theo (chạy riêng, show bên cạnh)
- Working prototype: dùng vibe-coding tools (Cursor, Claude Code, Replit Agent...) hoàn toàn OK
- Mọi level: mỗi người giải thích được phần mình làm. Không hiểu = 0 điểm demo

Xem chi tiết tools: [`02-tools-guide/prototyping-tools.md`](02-tools-guide/prototyping-tools.md)

---

## SPEC — 6 phần

Dùng template: [`01-templates/spec-template.md`](01-templates/spec-template.md)

| # | Phần | Yêu cầu |
|---|------|---------|
| 1 | **AI Product Canvas** | 3 cột Value / Trust / Feasibility + learning signal. Auto hay aug? Data gì, loại gì, có marginal value? |
| 2 | **User Stories 4 paths** | 2–3 features × 4 paths: happy / low-confidence / failure / correction |
| 3 | **Eval metrics + threshold** | 3 metrics + threshold + red flag. Precision hay recall? Tại sao? |
| 4 | **Top 3 failure modes** | Mỗi failure: trigger → hậu quả → mitigation |
| 5 | **ROI 3 kịch bản** | Conservative / realistic / optimistic + kill criteria |
| 6 | **Mini AI spec** | 1 trang tóm tắt: giải gì, cho ai, auto/aug, quality, risk, data flywheel |

---

## Demo round (M5, 60 phút)

**Cách chơi:**

1. Mỗi nhóm cử 2-3 người **ở lại demo** tại bàn, 2-3 người **đi xem** nhóm khác
2. Đi xem + feedback **đủ** các team trong zone
3. Mỗi lần xem: nghe demo (~3-4 phút) + điền feedback form (~1-2 phút)

**3 tiêu chí feedback (chấm 1-5):**

| # | Tiêu chí | Hỏi |
|---|----------|-----|
| 1 | Problem-solution fit | Bài toán rõ? Giải pháp logic? |
| 2 | AI product thinking | Auto/aug rõ? Failure modes? Eval metrics? |
| 3 | Demo quality | Chạy được? Narrative rõ? |

Thêm: 1 điều làm tốt + 1 gợi ý cải thiện.

**Nộp đủ feedback** — chấm cả chất lượng review.

---

## Checklist trước demo (M4, 15:30)

- [ ] Prototype ready (ít nhất mock)
- [ ] Demo script 2 phút: ai nói gì, show gì, thứ tự nào
- [ ] Poster/slides tóm tắt: Problem → Solution → Auto/Aug → Demo
- [ ] Mỗi người trả lời được: "Auto hay aug?", "Failure mode chính?", "Phần mình làm gì?"
- [ ] Feedback forms nhận đủ

---

## Nộp bài

**Deadline:** 23h59 09/04/2026 | **Nộp lên:** LMS | **Mỗi người nộp 1 zip riêng**

```
MaHocVien-HoTen-Day06.zip
│
├── canhan/
│   ├── feedback.md                ← Feedback cho các nhóm đã xem trong demo round
│   └── reflection.md              ← Role + đóng góp + reflection cá nhân
│
└── NhomXX-Room/                   ← VD: Nhom01-403
    ├── spec-final.md              ← SPEC 6 phần (file nhóm, mỗi người nộp giống nhau)
    ├── prototype-readme.md        ← Mô tả prototype + link + supported links
    └── demo-slides.pdf            ← Poster hoặc slides dùng khi present
```

**prototype-readme.md** gồm: mô tả prototype (2-3 câu), level (sketch/mock/working), link prototype (repo GitHub / Figma / deployed app / video nếu có), supported links (API, tools, data source), phân công ai làm gì.

**feedback.md** gồm: với mỗi nhóm đã xem — 3 tiêu chí × 1-5 + 1 điều tốt + 1 gợi ý.

**reflection.md** gồm: role, phần phụ trách cụ thể, SPEC mạnh/yếu nhất, đóng góp, 1 điều học được, nếu làm lại đổi gì, AI giúp/sai gì.

---

## Scoring (chung Day 5 + Day 6 = 100 điểm)

| Hạng mục | Điểm | Loại | Khi nào |
|----------|------|------|---------|
| SPEC milestone | 25 | Nhóm + cá nhân | 23h59 09/04/2026 |
| Prototype milestone | 15 | Nhóm + cá nhân | 23h59 09/04/2026 |
| Demo Day | 25 | Nhóm | Present 16:00, nộp file 23h59 09/04 |
| UX exercise | 10 | Cá nhân + bonus | UX workshop sáng D5 |
| Individual reflection | 25 | Cá nhân | 23h59 09/04/2026 |
| **Tổng** | **100** | | |

---

## Tài liệu trong repo này

### Templates — [`01-templates/`](01-templates/)

| File | Dùng cho |
|------|----------|
| [`spec-template.md`](01-templates/spec-template.md) | SPEC 6 phần — template chính |
| [`canvas-template.md`](01-templates/canvas-template.md) | AI Product Canvas |
| [`user-stories-4path.md`](01-templates/user-stories-4path.md) | User stories × 4 paths |
| [`eval-metrics.md`](01-templates/eval-metrics.md) | Eval metrics + threshold |
| [`failure-modes.md`](01-templates/failure-modes.md) | Top 3 failure modes |
| [`roi-3-scenarios.md`](01-templates/roi-3-scenarios.md) | ROI 3 kịch bản |
| [`demo-script.md`](01-templates/demo-script.md) | Demo script 2 phút |
| [`poster-layout.md`](01-templates/poster-layout.md) | Poster/slides layout |

### Hướng dẫn công cụ — [`02-tools-guide/`](02-tools-guide/)

| File | Nội dung |
|------|----------|
| [`api-cheatsheet.md`](02-tools-guide/api-cheatsheet.md) | API key setup, model nào cho gì |
| [`prototyping-tools.md`](02-tools-guide/prototyping-tools.md) | Tools theo level prototype + hướng dẫn từng tool |
| [`prompt-engineering-tips.md`](02-tools-guide/prompt-engineering-tips.md) | Prompt tips cho hackathon |

### Tham khảo — [`03-reference/`](03-reference/)

| File | Nội dung |
|------|----------|
| [`day5-cheatsheet.md`](03-reference/day5-cheatsheet.md) | Recap 1 trang các framework Day 5 |
| [`canvas-example.md`](03-reference/canvas-example.md) | Ví dụ Canvas hoàn chỉnh (AI Email Triage) |

### Luật chơi — [`04-rules/`](04-rules/)

| File | Nội dung |
|------|----------|
| [`hackathon-rules.md`](04-rules/hackathon-rules.md) | Rules, timeline, milestones, scoring, demo round |

---

*Ngày 6 — VinUni A20 — AI Thực Chiến · 2026*
