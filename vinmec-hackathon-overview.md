# VinMec — Tổng quan định hướng hackathon

## 1) Chốt hướng theo tài liệu trong folder

Sau khi rà các file `README.md`, `02-templates/*`, `03-tools-guide/*`, `04-reference/*`, `05-rules/hackathon-rules.md`, có thể chốt như sau:

- **Bài toán phải rất rõ:** ai gặp vấn đề gì, hiện đang xử lý ra sao, và AI giúp tốt hơn điểm nào.
- **Checkpoint quan trọng:** trước **11:00** nên có ít nhất **mock prototype**; nếu có **working prototype với AI chạy thật** sẽ có bonus.
- **Prototype nên chia 3 level rõ ràng:**
  1. **Sketch** — vẽ flow trên giấy/whiteboard.
  2. **Mock prototype** — UI/flow click được, chưa cần AI thật.
  3. **Working prototype** — có **LLM chạy thật**, `input → AI xử lý → output`.
- **Bắt buộc phải có LLM**, không chỉ làm mô hình ML truyền thống hoặc rule-based thuần túy.
- **Bonus nếu có feedback loop**: user xác nhận / đổi lịch / bỏ qua / phản hồi lý do → hệ thống học dần cách nhắc, thời điểm nhắc, kênh nhắc phù hợp hơn.

---

## 2) Problem statement gợi ý cho đề tài VinMec

**Người cao tuổi và bệnh nhân cần tái khám thường gặp khó khăn khi dùng app MyVinMec để theo dõi, đặt lịch lại và không được nhắc nhở đủ thông minh/cá nhân hóa, dẫn đến tỷ lệ bỏ lỡ lịch tái khám cao hơn trung bình.**

**Giải pháp:** một **AI health assistant agent** giúp:
- chủ động nhắc lịch tái khám đúng thời điểm,
- hiểu nhu cầu bằng ngôn ngữ tự nhiên,
- kiểm tra slot khả dụng,
- đề xuất khung giờ phù hợp,
- hỗ trợ đặt lịch sau khi người dùng xác nhận,
- nhắc lại qua nhiều kênh như app / SMS / Zalo / cuộc gọi nhắc tự động.

---

## 3) Nên chọn Automation hay Augmentation?

### Khuyến nghị: **Augmentation-first**

Với bối cảnh y tế và nhóm người dùng lớn tuổi, không nên demo kiểu AI tự quyết hoàn toàn ngay từ đầu.

**Luồng phù hợp:**
- AI **chủ động gợi ý** và nhắc nhở,
- AI **đề xuất** slot tốt nhất,
- nhưng **người bệnh / người thân xác nhận** trước khi đặt lịch.

**Lý do:**
- sai lịch tái khám có thể ảnh hưởng sức khỏe,
- người dùng cần cảm giác kiểm soát,
- demo sẽ thuyết phục hơn khi cho thấy AI hỗ trợ thông minh nhưng vẫn an toàn.

---

## 4) Vì sao phải là LLM, không phải ML truyền thống?

Để bám đúng yêu cầu hackathon, hãy cho thấy phần **không thể làm tốt nếu chỉ dùng rule-based/ML cổ điển**:

- hiểu các câu nói tự nhiên như: *“Tuần sau con rảnh chiều thứ 4, đặt giúp mẹ nhé”*
- cá nhân hóa lời nhắc theo độ tuổi, lịch sử, thói quen phản hồi
- tóm tắt ngắn gọn: lịch tái khám nào sắp tới, khoa nào, bác sĩ nào
- trả lời hội thoại đa lượt: đổi lịch, hỏi lại, xác nhận, nhắc người thân
- sinh nội dung nhắc đa kênh với giọng điệu phù hợp

> Nếu có thêm heuristic/logic kiểm tra slot thì vẫn ổn, nhưng **trung tâm sản phẩm phải là LLM agent**.

---

## 5) Prototype scope đề xuất

### A. Sketch prototype
- Vẽ tay user journey:
  1. bệnh nhân sắp đến hạn tái khám,
  2. hệ thống gửi nhắc,
  3. bệnh nhân trả lời bằng ngôn ngữ tự nhiên,
  4. AI gợi ý slot,
  5. bệnh nhân xác nhận,
  6. hệ thống nhắc lại trước giờ khám.

### B. Mock prototype
Nên có ít nhất 3 màn hình:
1. **Dashboard tái khám sắp đến hạn**
2. **Chat/assistant đề xuất lịch phù hợp**
3. **Màn xác nhận đặt lịch + chọn kênh nhắc**

Có thể build bằng `Figma`, `Claude Artifacts`, `v0`, hoặc HTML đơn giản.

### C. Working prototype
Nên demo **1 flow chính chạy thật**:
1. Hệ thống phát hiện bệnh nhân sắp đến hạn tái khám.
2. Agent gửi nhắc nhở cá nhân hóa.
3. User nhập yêu cầu bằng ngôn ngữ tự nhiên.
4. LLM phân tích ý định + ràng buộc thời gian.
5. Backend giả / JSON giả trả về slot trống.
6. Agent đề xuất 2–3 slot.
7. User xác nhận → hệ thống “book” thành công.
8. Hệ thống lưu preference để nhắc tốt hơn lần sau.

---

## 6) 3 feature chính nên tập trung

### Feature 1 — Smart follow-up reminder
- Nhắc tái khám đúng thời điểm
- Nội dung nhắc cá nhân hóa theo hồ sơ và lịch sử
- Có thể nhắc luôn cho người thân/caregiver

### Feature 2 — AI slot checking + booking copilot
- User nói tự nhiên: *“Đặt giúp tôi chiều thứ 6 tuần này”*
- AI hiểu intent, lọc slot phù hợp
- Gợi ý 2–3 lựa chọn và xin xác nhận

### Feature 3 — Multi-channel reminder + feedback loop
- App push / SMS / Zalo / email
- Ghi nhận: user mở tin, đổi lịch, bỏ qua, hủy, xác nhận
- Từ đó tối ưu giờ nhắc và nội dung nhắc lần sau

---

## 7) Gợi ý điền SPEC

### 7.1 AI Product Canvas
**Value**
- Giảm tỷ lệ bỏ lỡ lịch tái khám
- Giảm thao tác khó trên app cho người cao tuổi
- Giảm tải cho hotline/chăm sóc khách hàng

**Trust**
- AI không đưa lời khuyên chẩn đoán
- AI chỉ hỗ trợ nhắc và đặt lịch
- Luôn có bước xác nhận trước khi chốt lịch
- Nếu AI không chắc → chuyển sang lựa chọn thủ công hoặc hotline

**Feasibility**
- Dùng `Gemini 2.0 Flash`, `GPT-4o mini`, hoặc `Claude` cho prototype
- Slot backend có thể mock bằng JSON/API giả
- Latency mục tiêu: dưới 3 giây cho bước tư vấn slot

### 7.2 Eval metrics + threshold
- **Reminder response rate** ≥ 40%
- **Slot acceptance rate** ≥ 70%
- **Rebooking completion rate** ≥ 60%

**Red flag:**
- user nhận nhắc nhưng không hiểu hoặc không hoàn tất flow,
- AI gợi ý lịch sai ngữ cảnh quá thường xuyên,
- quá nhiều case phải fallback thủ công.

### 7.3 Top failure modes
1. **AI hiểu sai yêu cầu thời gian** → đặt nhầm ngày/giờ
2. **AI nhắc sai người / sai lịch sử** → mất niềm tin
3. **Người cao tuổi không phản hồi được trên app** → phải có fallback sang người thân/hotline

### 7.4 Feedback loop
Nên nêu rõ dữ liệu học được:
- user bấm xác nhận hay bỏ qua,
- thích nhắc buổi sáng hay tối,
- thích SMS hay app push,
- hay đổi sang cuối tuần / buổi chiều,
- lý do bỏ lỡ lịch nếu có.

---

## 8) Demo 2 phút nên kể như thế nào

### Problem (20s)
“Người cao tuổi dùng MyVinMec thường bỏ lỡ lịch tái khám vì flow đặt lịch lại chưa đủ đơn giản và thiếu nhắc nhở chủ động.”

### Solution (20s)
“Bọn em xây một **LLM-based AI health assistant** giúp nhắc lịch, hiểu nhu cầu tự nhiên, kiểm tra slot, gợi ý giờ phù hợp và đặt lịch sau khi người dùng xác nhận.”

### Live demo (60s)
- Show user nhận nhắc nhở
- User nhập: *“Đặt giúp mẹ tôi chiều thứ 6 tuần sau”*
- AI đề xuất 2–3 slot
- User chọn 1 slot
- Hệ thống xác nhận + chọn kênh nhắc lại

### Lessons (20s)
- Failure mode lớn nhất: user lớn tuổi có thể bỏ qua hoặc hiểu nhầm lời nhắc
- Cách xử lý: multi-channel + caregiver mode + fallback hotline

---

## 9) Kết luận ngắn gọn

Để bám sát rubric trong folder, team nên đi theo hướng:
- **Augmentation-first**
- **LLM agent bắt buộc chạy thật**
- **Ít nhất có mock prototype trước 11:00**
- **Tốt nhất có 1 working flow: reminder → hiểu intent → gợi ý slot → xác nhận đặt lịch**
- **Có feedback loop để lấy bonus và thể hiện AI product thinking**
