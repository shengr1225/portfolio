import { createFireworks, FireworksProvider } from "@ai-sdk/fireworks";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";

import {
  wrapLanguageModel,
  extractReasoningMiddleware,
  LanguageModelV1,
} from "ai";

let fireworks: FireworksProvider;
let enhancedModel: LanguageModelV1;

export function getEnhancedModel() {
  if (!fireworks) {
    fireworks = createFireworks({
      apiKey: process.env.FIREWORK_API_KEY,
    });
  }
  if (!enhancedModel) {
    enhancedModel = wrapLanguageModel({
      model: fireworks("accounts/fireworks/models/deepseek-r1"),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    });
  }
  return enhancedModel;
}

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
export const geminiModel = google("gemini-2.0-flash-exp");
export const claudeModel = anthropic("claude-3-5-sonnet-latest");
