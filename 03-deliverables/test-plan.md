# Test Plan - 2 Ưu Tiên Chính

**Người thực hiện**: Trần Đình Minh Vương (2A202600495)
**Mục tiêu**: Test và verify 2 failure modes ưu tiên cao

---

## ƯU TIÊN #1: Fix Bug AI hiểu sai thời gian

### Hiện trạng:
- ✅ Đã phát hiện 2 bugs trong test:
  - Bug #1: User yêu cầu "chiều thứ 6" → AI gợi ý slot 08:00, 09:00 (sáng)
  - Bug #2: User nói "2 giờ" → AI đặt lịch 07:00 (không liên quan)

### Test Cases cần chạy:

#### Test Case 1.1: Thời gian không rõ ràng (AM/PM)
**Mục tiêu**: Verify AI có hỏi lại khi thời gian không rõ AM/PM

| # | Input | Expected Behavior | Pass/Fail |
|---|-------|-------------------|-----------|
| 1 | "Đặt lúc 2 giờ" | AI hỏi: "2 giờ sáng hay 2 giờ chiều ạ?" | [ ] |
| 2 | "Đặt lúc 8 giờ" | AI hỏi: "8 giờ sáng hay 8 giờ tối ạ?" | [ ] |
| 3 | "Đặt lúc 10 giờ" | AI hỏi: "10 giờ sáng hay 10 giờ tối ạ?" | [ ] |
| 4 | "Đặt lúc 3 giờ" | AI hỏi: "3 giờ sáng hay 3 giờ chiều ạ?" | [ ] |

**Cách test**:
1. F5 refresh app
2. Chọn bệnh nhân Trần Thị Bình
3. Nhập từng câu input ở trên
4. Ghi lại AI response
5. Check xem AI có hỏi lại không

**Kết quả mong đợi**: AI phải hỏi lại 100% (4/4 cases)

---

#### Test Case 1.2: Thời gian có chỉ định buổi (sáng/chiều/tối)
**Mục tiêu**: Verify AI gợi ý đúng slot theo buổi user yêu cầu

| # | Input | Expected Slots | Pass/Fail |
|---|-------|----------------|-----------|
| 1 | "Đặt chiều thứ 6" | Chỉ slot 13:00-17:00 | [ ] |
| 2 | "Đặt sáng thứ 2" | Chỉ slot 07:00-11:00 | [ ] |
| 3 | "Đặt tối thứ 4" | Chỉ slot 17:00-20:00 | [ ] |
| 4 | "Đặt trưa thứ 3" | Slot 11:00-13:00 | [ ] |

**Cách test**:
1. F5 refresh app
2. Chọn bệnh nhân
3. Nhập từng câu input
4. Xem danh sách slot AI gợi ý
5. Check xem có slot ngoài buổi yêu cầu không

**Kết quả mong đợi**: 
- AI chỉ gợi ý slot trong buổi user yêu cầu
- Không có slot sáng khi user yêu cầu chiều

---

#### Test Case 1.3: Thời gian cụ thể (có giờ rõ ràng)
**Mục tiêu**: Verify AI đặt đúng giờ khi user chỉ định cụ thể

| # | Input | Expected Time | Pass/Fail |
|---|-------|---------------|-----------|
| 1 | "Đặt lúc 2 giờ chiều" | 14:00 | [ ] |
| 2 | "Đặt lúc 8 giờ sáng" | 08:00 | [ ] |
| 3 | "Đặt lúc 14h" | 14:00 | [ ] |
| 4 | "Đặt lúc 9h30 sáng" | 09:30 | [ ] |

**Cách test**:
1. F5 refresh app
2. Chọn bệnh nhân
3. Nhập từng câu input
4. Xem lịch AI đặt
5. Check xem giờ có đúng không

**Kết quả mong đợi**: 
- AI đặt đúng 100% giờ user yêu cầu
- Không đặt giờ ngẫu nhiên như 07:00

---

#### Test Case 1.4: Confirmation step
**Mục tiêu**: Verify AI có hiển thị rõ thời gian trước khi confirm

| # | Input | Expected Confirmation | Pass/Fail |
|---|-------|----------------------|-----------|
| 1 | "Đặt chiều thứ 6" | Hiển thị: "14:00 CHIỀU, thứ 6 ngày XX/XX" | [ ] |
| 2 | "Đặt sáng thứ 2" | Hiển thị: "08:00 SÁNG, thứ 2 ngày XX/XX" | [ ] |

**Cách test**:
1. Đặt lịch theo input
2. Xem màn hình confirmation
3. Check xem có hiển thị rõ SÁNG/CHIỀU/TỐI không
4. Check xem có button [Xác nhận] [Đổi lại] không

**Kết quả mong đợi**: 
- Hiển thị rõ buổi (SÁNG/CHIỀU/TỐI) bằng chữ IN HOA
- Có 2 button để user confirm hoặc đổi lại

---

### Tổng kết Test Ưu tiên #1:

**Tổng số test cases**: 14
- Test Case 1.1: 4 cases (thời gian không rõ AM/PM)
- Test Case 1.2: 4 cases (thời gian có buổi)
- Test Case 1.3: 4 cases (thời gian cụ thể)
- Test Case 1.4: 2 cases (confirmation step)

**Pass criteria**: 
- ≥ 90% pass (13/14 cases) → Bug đã fix
- < 90% pass → Cần fix thêm

**Time estimate**: 30-45 phút

---

## ƯU TIÊN #2: Monitor nhắc sai người

### Hiện trạng:
- ⚠️ Chưa phát hiện bug này trong test
- ⚠️ Nhưng nguy hiểm vì user KHÔNG BIẾT bị sai
- ⚠️ Cần test để verify mitigation có hoạt động không

### Test Cases cần chạy:

#### Test Case 2.1: Patient ID verification
**Mục tiêu**: Verify hệ thống có verify đúng patient ID trước khi gửi nhắc

| # | Scenario | Expected Behavior | Pass/Fail |
|---|----------|-------------------|-----------|
| 1 | Chọn bệnh nhân A, xem lịch của bệnh nhân A | Hiển thị đúng lịch của A, không hiển thị lịch của B/C | [ ] |
| 2 | Chọn bệnh nhân B, xem lịch của bệnh nhân B | Hiển thị đúng lịch của B, không hiển thị lịch của A/C | [ ] |
| 3 | Chọn bệnh nhân C, xem lịch của bệnh nhân C | Hiển thị đúng lịch của C, không hiển thị lịch của A/B | [ ] |

**Cách test**:
1. F5 refresh app
2. Chọn "Nguyễn Văn An" (32+ Nam)
3. Xem thông tin hiển thị
4. Check: Tên, tuổi, giới tính, tiền sử bệnh có đúng không?
5. Lặp lại với "Trần Thị Bình" và "Lê Minh Cường"

**Kết quả mong đợi**: 
- Mỗi bệnh nhân chỉ thấy thông tin của mình
- Không có thông tin bị lẫn lộn

---

#### Test Case 2.2: Appointment history verification
**Mục tiêu**: Verify hệ thống chỉ hiển thị lịch active, không hiển thị lịch đã hủy

| # | Scenario | Expected Behavior | Pass/Fail |
|---|----------|-------------------|-----------|
| 1 | Bệnh nhân có lịch active | Hiển thị lịch, cho phép đổi lịch | [ ] |
| 2 | Bệnh nhân không có lịch | Hiển thị "Chưa có lịch hẹn", gợi ý đặt mới | [ ] |
| 3 | Bệnh nhân có lịch đã hủy | KHÔNG hiển thị lịch đã hủy | [ ] |

**Cách test**:
1. Chọn bệnh nhân Trần Thị Bình (có lịch)
2. Hỏi: "Nhắc tôi lịch tái khám"
3. Xem AI response
4. Check: AI có hiển thị lịch không? Lịch có đúng không?

**Kết quả mong đợi**: 
- Nếu có lịch active → hiển thị đúng thông tin
- Nếu không có lịch → nói rõ "chưa có lịch"
- Không hiển thị lịch đã hủy hoặc đã qua

---

#### Test Case 2.3: Personalized reminder content
**Mục tiêu**: Verify reminder có đủ thông tin để user xác nhận đúng người

| # | Element | Expected | Pass/Fail |
|---|---------|----------|-----------|
| 1 | Tên bệnh nhân | Hiển thị đầy đủ họ tên | [ ] |
| 2 | Thông tin lịch | Khoa, bác sĩ, thời gian, mã lịch | [ ] |
| 3 | Fallback option | Có số hotline để gọi nếu sai | [ ] |

**Cách test**:
1. Đặt lịch thành công
2. Xem màn hình confirmation
3. Check xem có đủ thông tin:
   - Tên bệnh nhân
   - Khoa khám
   - Bác sĩ
   - Thời gian
   - Mã xác nhận
   - Số hotline (nếu có)

**Kết quả mong đợi**: 
- Hiển thị đầy đủ thông tin để user verify
- Có mã xác nhận để tracking
- Có hotline để user gọi nếu thấy sai

---

#### Test Case 2.4: User feedback mechanism
**Mục tiêu**: Verify user có thể báo "không phải lịch của tôi"

| # | Scenario | Expected Behavior | Pass/Fail |
|---|----------|-------------------|-----------|
| 1 | User thấy lịch đúng | Có button "Xác nhận" | [ ] |
| 2 | User thấy lịch sai | Có button "Không phải lịch của tôi" hoặc "Đã hủy rồi" | [ ] |
| 3 | User click "Không phải lịch của tôi" | Hệ thống log lại và gợi ý gọi hotline | [ ] |

**Cách test**:
1. Xem màn hình hiển thị lịch
2. Check xem có button nào để user báo sai không
3. Nếu có, click thử và xem response

**Kết quả mong đợi**: 
- Có cách để user báo lỗi
- Hệ thống phản hồi khi user báo lỗi
- Có gợi ý gọi hotline

---

#### Test Case 2.5: Edge cases - Bệnh nhân cùng tên
**Mục tiêu**: Verify hệ thống phân biệt được bệnh nhân cùng tên

| # | Scenario | Expected Behavior | Pass/Fail |
|---|----------|-------------------|-----------|
| 1 | 2 bệnh nhân cùng tên "Nguyễn Văn A" | Hệ thống dùng thêm: tuổi, giới tính, SĐT để phân biệt | [ ] |
| 2 | Mẹ và con dùng chung SĐT | Hệ thống hỏi: "Đặt lịch cho ai?" | [ ] |

**Cách test** (nếu có data):
1. Tạo 2 bệnh nhân cùng tên (nếu có quyền)
2. Thử đặt lịch cho từng người
3. Check xem hệ thống có nhầm lẫn không

**Lưu ý**: Test case này khó test với prototype, cần test trên production data.

---

### Tổng kết Test Ưu tiên #2:

**Tổng số test cases**: 12
- Test Case 2.1: 3 cases (patient ID verification)
- Test Case 2.2: 3 cases (appointment history)
- Test Case 2.3: 3 cases (personalized content)
- Test Case 2.4: 3 cases (user feedback)
- Test Case 2.5: 2 cases (edge cases) - optional

**Pass criteria**: 
- ≥ 90% pass (11/12 cases) → Mitigation đã có
- < 90% pass → Cần bổ sung mitigation

**Time estimate**: 30-45 phút

---

## TỔNG KẾT TEST PLAN

### Timeline:

| Thời gian | Nhiệm vụ | Output |
|-----------|----------|--------|
| **30 phút** | Test Ưu tiên #1 (14 cases) | Checklist với Pass/Fail |
| **30 phút** | Test Ưu tiên #2 (12 cases) | Checklist với Pass/Fail |
| **15 phút** | Tổng hợp kết quả | Report summary |
| **15 phút** | Báo team bugs cần fix | Bug list ưu tiên |

**Tổng thời gian**: 90 phút (1.5 giờ)

---

### Report Template:

```markdown
# Test Results - 2 Ưu Tiên Chính

## Ưu tiên #1: Fix Bug AI hiểu sai thời gian
- Tổng test cases: 14
- Pass: ___/14
- Fail: ___/14
- Pass rate: ___%

**Bugs tìm thêm**:
1. _______________
2. _______________

**Recommendation**: 
- [ ] Ready for demo
- [ ] Need fix: _______________

---

## Ưu tiên #2: Monitor nhắc sai người
- Tổng test cases: 12
- Pass: ___/12
- Fail: ___/12
- Pass rate: ___%

**Bugs tìm thêm**:
1. _______________
2. _______________

**Recommendation**: 
- [ ] Mitigation đã đủ
- [ ] Need more: _______________

---

## Action Items cho Team:

### Urgent (trước demo):
1. _______________
2. _______________

### Important (trước production):
1. _______________
2. _______________
```

---

## CHECKLIST TRƯỚC KHI BẮT ĐẦU TEST:

- [ ] App đang chạy: https://nhom62-lab6-vinmec-hvan-it.com/chat
- [ ] Có 3 tài khoản demo để test
- [ ] Có file này để ghi kết quả
- [ ] Có 90 phút để test
- [ ] Đã đọc kỹ expected behavior của từng test case

**LET'S GO! 🚀**
