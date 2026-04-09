/**
 * Smoke test — run with: npx tsx lib/agent/tools/__tests__/smoke.ts
 * Requires DB running with seeded data.
 */
import "dotenv/config";
import { tools } from "../index";

const USER_ID = "user-an";
const DEPT_ID = "tieu-hoa";
const DOCTOR_ID = "bs-pham-quoc-tuan";

type ToolResult = Record<string, unknown> | unknown[] | unknown;

async function run(name: string, fn: () => Promise<ToolResult>) {
  process.stdout.write(`\n[${name}] ... `);
  try {
    const result = await fn();
    const preview = JSON.stringify(result).substring(0, 200);
    console.log("OK →", preview);
    return result;
  } catch (e) {
    console.error("FAIL →", e instanceof Error ? e.message : e);
    return null;
  }
}

async function main() {
  console.log("=== SMOKE TEST ===\n");

  // 1. get_current_user
  await run("get_current_user", () =>
    tools.get_current_user.execute({ userId: USER_ID }, {} as never)
  );

  // 2. recommend_department
  const deptResult = await run("recommend_department", () =>
    tools.recommend_department.execute(
      { symptoms: "đau bụng buồn nôn tiêu chảy", userAge: 32 },
      {} as never
    )
  );
  // SC3 check
  if (Array.isArray(deptResult) && deptResult.length > 0) {
    const top = deptResult[0] as { id: string; matchScore: number };
    const sc3 = top.id === "tieu-hoa" && top.matchScore > 0;
    console.log(`  → SC3 recommend tieu-hoa: ${sc3 ? "PASS ✅" : "FAIL ❌"} (got: ${top.id}, score: ${top.matchScore})`);
  }

  // 3. list_doctors
  await run("list_doctors", () =>
    tools.list_doctors.execute({ departmentId: DEPT_ID }, {} as never)
  );

  // 4. check_availability
  const today = new Date();
  const fromDate = today.toISOString().split("T")[0];
  await run("check_availability", () =>
    tools.check_availability.execute(
      { doctorId: DOCTOR_ID, fromDate, days: 3 },
      {} as never
    )
  );

  // 5. book_appointment
  const futureSlot = new Date();
  futureSlot.setDate(futureSlot.getDate() + 7);
  futureSlot.setHours(9, 0, 0, 0);
  const bookResult = await run("book_appointment", () =>
    tools.book_appointment.execute(
      {
        userId: USER_ID,
        doctorId: DOCTOR_ID,
        departmentId: DEPT_ID,
        scheduledAt: futureSlot.toISOString(),
        reason: "Đau bụng, khó tiêu",
      },
      {} as never
    )
  );

  // SC4 check
  if (bookResult && typeof bookResult === "object") {
    const r = bookResult as { appointmentId?: string; confirmationCode?: string };
    const sc4 = r.appointmentId && r.confirmationCode?.length === 6;
    console.log(`  → SC4 book + confirmCode: ${sc4 ? "PASS ✅" : "FAIL ❌"} (code: ${r.confirmationCode})`);
  }

  // 6. get_user_appointments
  const apptResult = await run("get_user_appointments", () =>
    tools.get_user_appointments.execute(
      { userId: USER_ID, status: "all" },
      {} as never
    )
  );

  // Extract appointmentId for reschedule/cancel tests
  let appointmentId: string | null = null;
  if (Array.isArray(apptResult) && apptResult.length > 0) {
    const first = apptResult[0] as { id: string; status: string };
    if (first.status === "booked" || first.status === "rescheduled") {
      appointmentId = first.id;
    }
  }

  // 7. reschedule_appointment
  if (appointmentId) {
    const rescheduleDate = new Date(futureSlot);
    rescheduleDate.setDate(rescheduleDate.getDate() + 1);
    await run("reschedule_appointment", () =>
      tools.reschedule_appointment.execute(
        { appointmentId: appointmentId!, newScheduledAt: rescheduleDate.toISOString() },
        {} as never
      )
    );
  } else {
    console.log("\n[reschedule_appointment] SKIP (no booked appointment)");
  }

  // 8. get_preparation_guide
  await run("get_preparation_guide", () =>
    tools.get_preparation_guide.execute({ examType: "blood-test" }, {} as never)
  );

  // 9. search_hospital_faq
  const faqResult = await run("search_hospital_faq", () =>
    tools.search_hospital_faq.execute({ query: "bảo hiểm y tế", topK: 3 }, {} as never)
  );
  // SC5 check
  if (Array.isArray(faqResult) && faqResult.length > 0) {
    const top = faqResult[0] as { category: string; score: number };
    const sc5 = top.category === "insurance" && top.score > 0;
    console.log(`  → SC5 faq insurance: ${sc5 ? "PASS ✅" : "FAIL ❌"} (cat: ${top.category}, score: ${top.score})`);
  }

  // 10. find_nearest_branch — SC6: Times City coords
  const branchResult = await run("find_nearest_branch", () =>
    tools.find_nearest_branch.execute({ lat: 21.007, lng: 105.861 }, {} as never)
  );
  // SC6 check
  if (Array.isArray(branchResult) && branchResult.length > 0) {
    const top = branchResult[0] as { id: string; distanceKm: number };
    const sc6 = top.id === "times-city" && top.distanceKm < 5;
    console.log(`  → SC6 nearest branch: ${sc6 ? "PASS ✅" : "FAIL ❌"} (id: ${top.id}, dist: ${top.distanceKm}km)`);
  }

  // 11. schedule_followup — skip if no appointment booked
  if (bookResult && typeof bookResult === "object") {
    const r = bookResult as { appointmentId?: string };
    if (r.appointmentId) {
      await run("schedule_followup", () =>
        tools.schedule_followup.execute(
          { originalAppointmentId: r.appointmentId!, daysLater: 30 },
          {} as never
        )
      );
    }
  }

  // 12. save_feedback_note
  await run("save_feedback_note", () =>
    tools.save_feedback_note.execute(
      { userId: USER_ID, note: "Bác sĩ rất tận tâm, phòng khám sạch sẽ", category: "compliment" },
      {} as never
    )
  );

  // 13. cancel_appointment — cancel the re-scheduled one
  if (appointmentId) {
    await run("cancel_appointment", () =>
      tools.cancel_appointment.execute(
        { appointmentId: appointmentId!, reason: "Smoke test cleanup" },
        {} as never
      )
    );
  }

  // SC7 check
  const toolCount = Object.keys(tools).length;
  console.log(`\n→ SC7 tools count: ${toolCount === 13 ? "PASS ✅" : "FAIL ❌"} (got: ${toolCount})`);

  console.log("\n=== SMOKE TEST DONE ===");
}

main().catch(console.error);
