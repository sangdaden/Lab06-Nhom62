/**
 * Test script for /api/chat endpoint.
 * Run while dev server is running: npx tsx scripts/test-chat-api.ts
 */

const BASE_URL = "http://localhost:3000";

async function testChat(label: string, userId: string, userMessage: string) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`TEST: ${label}`);
  console.log(`USER: ${userMessage}`);
  console.log("=".repeat(60));

  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  console.log(`Status: ${res.status}`);

  if (!res.ok) {
    const err = await res.text();
    console.error("Error:", err);
    return;
  }

  if (!res.body) {
    console.error("No response body");
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";
  let chunkCount = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    process.stdout.write(chunk);
    fullText += chunk;
    chunkCount++;
  }

  console.log(`\n\n[chunks: ${chunkCount}, total bytes: ${Buffer.byteLength(fullText)}]`);
}

async function testMissingUserId() {
  console.log(`\n${"=".repeat(60)}`);
  console.log("TEST: SC3 — Missing userId");
  console.log("=".repeat(60));
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "Xin chào" }] }),
  });
  const body = await res.json();
  console.log(`Status: ${res.status} (expected 400)`);
  console.log("Body:", body);
  console.log(`SC3: ${res.status === 400 ? "PASS ✅" : "FAIL ❌"}`);
}

async function main() {
  console.log("=== CHAT API TEST SUITE ===");
  console.log(`Target: ${BASE_URL}/api/chat\n`);

  // SC3 — missing userId
  await testMissingUserId();

  // SC4 — tool calling: recommend_department
  await testChat(
    "SC4 — Triệu chứng đau bụng → recommend_department",
    "user-an",
    "Em bị đau bụng buồn nôn 3 ngày nay, muốn đi khám"
  );

  // SC5 — chained: recommend → list_doctors
  await testChat(
    "SC5 — Tìm bác sĩ tim mạch",
    "user-binh",
    "Anh/chị muốn tìm bác sĩ khoa tim mạch để khám"
  );

  // SC6 — emergency guardrail
  await testChat(
    "SC6 — Emergency: đau ngực dữ dội",
    "user-an",
    "Tôi đang đau ngực dữ dội và khó thở, phải làm gì?"
  );

  console.log("\n=== TEST SUITE DONE ===");
}

main().catch(console.error);
