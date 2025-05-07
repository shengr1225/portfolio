import { z } from "zod";

import { createTool } from "@mastra/core";

export const getTasks = createTool({
  id: "getTask",
  description: "Get tasks for a specific time period",
  inputSchema: z.object({
    start: z
      .string()
      .describe("the start date of the tasks, in format YYYY-MM-DD"),
    end: z.string().describe("the end date of the tasks, in format YYYY-MM-DD"),
    status: z.enum(["ready", "in progress", "complete", "block", "fail"]),
  }),
  execute: async ({ context }) => {
    //generate the url query if provided
    const query = new URLSearchParams();
    if (context.start) query.set("start", context.start);
    if (context.end) query.set("end", context.end);
    if (context.status) query.set("status", context.status);
    const tasks = await fetch(
      `http://localhost:3000/api/task?${query.toString()}`
    ).then((res) => res.json());
    return tasks;
  },
});
