import { task } from "@/schema";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import z from "zod";

export const generateTasks = async (input: string) => {
  const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyAarvKr-1fcLoXoNnegD0pUifURNqlgvJE",
  });
  const model = google("gemini-2.0-flash-001");
  const response = await generateObject({
    model,
    prompt: `Generate a list of tasks based on the following input: ${input}, if the task is a coding task or system design task, provide specific Leetcode's problems to the name of the task, separate each coding problem as a new task`,
    schema: z.array(task),
  });
  return response.object;
};
