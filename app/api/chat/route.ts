import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, stepCountIs } from "ai";
import type { UIMessage } from "ai";
import { tools } from "@/lib/agent/tools";
import { SYSTEM_PROMPT } from "@/lib/agent/system-prompt";
import { AGENT_CONFIG } from "@/lib/agent/config";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Normalize messages: accept both AI SDK v6 UIMessage (parts[]) format
 * and legacy simple format ({ role, content }) from test scripts.
 */
function normalizeMessages(raw: unknown[]): Omit<UIMessage, "id">[] {
  return raw.map((msg) => {
    if (typeof msg !== "object" || msg === null) {
      throw new Error("Message không hợp lệ");
    }
    const m = msg as Record<string, unknown>;
    const role = m.role as "user" | "assistant" | "system";

    // Already in UIMessage parts format
    if (Array.isArray(m.parts)) {
      return { role, parts: m.parts as UIMessage["parts"] };
    }

    // Legacy { role, content: string } format
    if (typeof m.content === "string") {
      return {
        role,
        parts: [{ type: "text" as const, text: m.content }],
      };
    }

    // content is array (openai message format)
    if (Array.isArray(m.content)) {
      const textContent = (m.content as Array<{ type: string; text?: string }>)
        .filter((c) => c.type === "text")
        .map((c) => c.text ?? "")
        .join("");
      return {
        role,
        parts: [{ type: "text" as const, text: textContent }],
      };
    }

    return { role, parts: [] };
  });
}

export async function POST(req: Request) {
  let body: { messages?: unknown[]; userId?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Request body không hợp lệ" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages, userId } = body;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Thiếu userId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "messages phải là array" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Inject ngày hiện tại VN (UTC+7) để agent biết hôm nay là ngày mấy
  const nowVN = new Date(Date.now() + 7 * 3600 * 1000);
  const todayVN = nowVN.toISOString().slice(0, 10); // YYYY-MM-DD
  const systemWithUser = `${SYSTEM_PROMPT}\n\nNgày hôm nay (giờ Việt Nam): ${todayVN}\nUSER_ID hiện tại: ${userId}`;

  const normalized = normalizeMessages(messages);
  const modelMessages = await convertToModelMessages(normalized);

  const result = streamText({
    model: openai(AGENT_CONFIG.model),
    system: systemWithUser,
    messages: modelMessages,
    tools,
    stopWhen: stepCountIs(AGENT_CONFIG.maxSteps),
    temperature: AGENT_CONFIG.temperature,
    onError: (e) => {
      console.error("[chat] stream error:", e);
    },
  });

  return result.toUIMessageStreamResponse();
}
