import { Mastra } from "@mastra/core";
import { personalAgent } from "./agents/personal";
export const mastra = new Mastra({
  agents: {
    personalAgent,
  },
});
