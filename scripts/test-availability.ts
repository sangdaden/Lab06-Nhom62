import { generateSlots, formatVNDateTime } from "../lib/utils/datetime";

async function main() {
  const now = new Date();
  console.log("now (UTC):", now.toISOString());
  console.log("now (VN):", formatVNDateTime(now));

  console.log("\n=== Slots cho 09/04 (ngày mai) ===");
  const tomorrow = new Date("2026-04-09T00:00:00.000Z");
  const slots = generateSlots(tomorrow);
  slots.forEach((s) => {
    const isPast = s <= now;
    console.log(" -", formatVNDateTime(s), "| ISO:", s.toISOString(), "| past?", isPast);
  });

  // Import và test tool
  const toolModule = await import("../lib/agent/tools/check-availability");
  const actualTool = (toolModule.default as any).default ?? toolModule.default;

  console.log("\n=== check-availability với fromDate=2026-04-09 ===");
  const result = await actualTool.execute(
    { doctorId: "bs-pham-quoc-tuan", fromDate: "2026-04-09", days: 7 },
    { messages: [], toolCallId: "test" }
  );
  console.log("Total slots:", result.slots.length);
  result.slots.forEach((s: { datetime: string }) => {
    console.log(" -", formatVNDateTime(new Date(s.datetime)));
  });
}

main().catch(console.error);
