# Sang Phan — Planner

File này là bản **làm sẵn** cho Người 1 để có thể copy nhanh vào `spec-final.md` và dùng luôn khi demo.

---

## 1) Problem statement (1 câu)

**Bệnh nhân VinMec, đặc biệt là người cao tuổi, thường gặp khó khăn khi theo dõi và đặt lại lịch tái khám trên MyVinMec, dẫn đến tỷ lệ bỏ lỡ lịch cao; nhóm đề xuất một `LLM-based AI health assistant` chủ động nhắc lịch, hiểu nhu cầu tự nhiên, kiểm tra slot phù hợp và hỗ trợ đặt lịch đa kênh sau khi người dùng xác nhận.**

---

## 2) Product direction chốt

- **Track:** `VinMec`
- **Product type:** `AI health assistant for follow-up appointment`
- **Approach:** `Augmentation-first`
- **Why:** AI hỗ trợ thông minh nhưng người bệnh/người thân vẫn là người xác nhận cuối cùng để đảm bảo an toàn.

---

## 3) AI Product Canvas

### Value
- **User chính:** bệnh nhân cần tái khám định kỳ, đặc biệt là người cao tuổi; ngoài ra còn có người thân/caregiver hỗ trợ đặt lịch.
- **Pain hiện tại:**
  - dễ quên lịch tái khám,
  - thao tác trong app chưa thân thiện với người lớn tuổi,
  - thiếu nhắc nhở chủ động và cá nhân hóa,
  - phải tự dò slot và đặt lại lịch khá mất thời gian.
- **Giá trị AI mang lại:**
  - nhắc đúng thời điểm,
  - hỗ trợ bằng ngôn ngữ tự nhiên,
  - đề xuất slot phù hợp,
  - giảm tỷ lệ bỏ lỡ lịch và giảm thao tác thủ công.

### Trust
- **Khi AI sai, rủi ro là gì?**
  - gợi ý sai ngày/giờ,
  - nhắc chưa đúng ngữ cảnh,
  - user mất niềm tin nếu flow quá rối.
- **User biết AI sai bằng cách nào?**
  - luôn hiện rõ lịch được đề xuất trước khi xác nhận,
  - có bước review cuối,
  - nếu AI không chắc sẽ hỏi lại thay vì tự quyết.
- **User sửa bằng cách nào?**
  - đổi slot,
  - chọn lại ngày giờ,
  - chuyển sang hotline/người thân hỗ trợ.
- **Chốt:** không để AI tự đặt lịch hoàn toàn trong demo; phải có bước xác nhận để giữ an toàn.

### Feasibility
- **LLM dùng cho prototype:** `Gemini 2.0 Flash` / `GPT-4o mini` / `Claude`
- **Data/logic phụ trợ:** dùng JSON giả hoặc dữ liệu mock cho slot khám.
- **Latency mục tiêu:** dưới 3 giây cho đề xuất slot.
- **Rủi ro chính:** hiểu sai intent thời gian, slot mock không hợp lý, người lớn tuổi khó thao tác nếu UI phức tạp.

---

## 4) Automation hay Augmentation?

**Chọn: `Augmentation`**

### Justification
Với bối cảnh y tế, nếu AI tự động đặt sai lịch mà user không nhận ra thì hậu quả lớn hơn nhiều so với việc AI chỉ đề xuất để user xác nhận. Vì vậy, nhóm chọn hướng **AI chủ động nhắc và đề xuất, nhưng user/người thân xác nhận cuối**.

---

## 5) 3 feature chính cần chốt

### Feature 1 — Smart re-exam reminder
- AI chủ động nhắc bệnh nhân khi sắp đến hạn tái khám.
- Nội dung nhắc được cá nhân hóa theo hồ sơ và lịch sử.
- Có thể gửi cho cả caregiver/người thân nếu cần.

### Feature 2 — AI slot suggestion and booking copilot
- User nói bằng ngôn ngữ tự nhiên như: `Đặt giúp mẹ tôi chiều thứ 6 tuần sau`.
- AI hiểu ý định, lọc ràng buộc thời gian và đề xuất 2–3 slot phù hợp.
- User chọn một slot và xác nhận đặt lịch.

### Feature 3 — Multi-channel reminder + feedback loop
- Gửi nhắc qua app, SMS, Zalo hoặc email.
- Ghi nhận user phản hồi: xác nhận, đổi lịch, bỏ qua, muốn đổi kênh nhắc.
- Hệ thống dùng dữ liệu này để nhắc đúng giờ hơn vào lần sau.

---

## 6) Learning signal / feedback loop

### Product sẽ thu các tín hiệu sau
- user bấm `xác nhận lịch`,
- user `đổi lịch` hoặc từ chối slot,
- user thích nhận nhắc qua `app / SMS / Zalo`,
- user hay phản hồi tốt hơn vào buổi sáng hay chiều,
- lý do bỏ lỡ lịch nếu có.

### Ý nghĩa
Đây là phần giúp team có **bonus về feedback loop** và cho thấy sản phẩm không chỉ demo một lần mà còn có khả năng **cải thiện dần theo hành vi người dùng**.

---

## 7) 3 câu chốt để align cả team

Người 1 có thể dùng 3 câu này để chốt hướng với cả nhóm:

1. **Bọn mình không làm ML truyền thống, mà làm một `LLM-based assistant` có hội thoại và cá nhân hóa.**
2. **Flow demo chỉ cần làm thật tốt 1 luồng chính: nhắc lịch → hiểu nhu cầu → gợi ý slot → xác nhận.**
3. **AI chỉ hỗ trợ thông minh, không tự quyết hoàn toàn, để đảm bảo trust trong bài toán y tế.**

---

## 8) Opening cho demo 2 phút

### Bản ngắn 20 giây
`Người cao tuổi và bệnh nhân cần tái khám ở VinMec thường bỏ lỡ lịch vì thiếu nhắc nhở chủ động và khó thao tác đặt lại lịch trên app. Nhóm em xây một AI health assistant dùng LLM để nhắc lịch thông minh, hiểu yêu cầu tự nhiên, đề xuất slot phù hợp và hỗ trợ đặt lịch đa kênh.`

### Bản tự nhiên hơn để nói
`Bài toán bọn em chọn là tình trạng bệnh nhân, đặc biệt là người cao tuổi, dễ bỏ lỡ lịch tái khám vì app hiện tại chưa đủ chủ động và cá nhân hóa. Vì vậy nhóm em xây một AI health assistant có thể nhắc lịch đúng lúc, hiểu người dùng nói tự nhiên, gợi ý khung giờ phù hợp và hỗ trợ đặt lịch lại một cách đơn giản hơn.`

---

## 9) Phần Người 1 nói trong demo

### Problem (20s)
- Ai gặp vấn đề? `Bệnh nhân tái khám, nhất là người cao tuổi`
- Pain là gì? `quên lịch, khó đặt lại lịch, thiếu nhắc thông minh`
- Tại sao quan trọng? `bỏ lỡ tái khám ảnh hưởng chất lượng chăm sóc`

### Solution handoff (10s)
- `Nhóm em dùng LLM để biến flow đặt lại lịch từ bị động thành chủ động và cá nhân hóa hơn.`
- Sau đó chuyền cho Người 3 hoặc Người 4 vào phần demo.

---

## 10) Nội dung có thể copy vào `spec-final.md`

### Problem statement
Bệnh nhân VinMec, đặc biệt là người cao tuổi, thường gặp khó khăn trong việc theo dõi và đặt lại lịch tái khám trên MyVinMec, dẫn đến tỷ lệ bỏ lỡ lịch cao; giải pháp của nhóm là một trợ lý sức khỏe AI dùng LLM để chủ động nhắc lịch, hiểu nhu cầu tự nhiên, kiểm tra slot phù hợp và hỗ trợ đặt lịch sau khi người dùng xác nhận.

### Canvas summary
- **Value:** giảm missed follow-up, giảm thao tác khó, tăng chủ động chăm sóc.
- **Trust:** AI không chẩn đoán y khoa; luôn có xác nhận trước khi đặt; nếu không chắc thì hỏi lại hoặc fallback sang hotline.
- **Feasibility:** prototype dùng LLM + mock slot data; demo được một flow thật trong 2 phút.

---

## 11) Checklist cuối cho Người 1

- [ ] Chốt đúng 1 câu problem statement
- [ ] Cả team thống nhất `augmentation-first`
- [ ] Cả team thống nhất 3 feature chính
- [ ] Viết xong phần `Value / Trust / Feasibility`
- [ ] Chuẩn bị opening 20 giây để nói trơn tru
- [ ] Kiểm tra từng người trả lời được `phần mình làm gì`

---

## 12) Chốt scope nếu thời gian quá gấp

Nếu không kịp làm rộng, chỉ cần bám đúng flow này:

**AI nhắc lịch tái khám → bệnh nhân trả lời bằng ngôn ngữ tự nhiên → AI đề xuất 2–3 slot → user xác nhận → hệ thống nhắc lại qua kênh phù hợp**

Đây là scope đủ tốt để:
- đúng đề VinMec,
- có LLM,
- có prototype,
- có trust thinking,
- có feedback loop để lấy bonus.
