export const AGENT_CONFIG = {
  model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  maxSteps: 12,
  temperature: 0.3,
} as const;
