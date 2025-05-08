import { mastra } from "@/mastra";
import { NextResponse } from "next/server";
import { taskSummaryArray } from "@/schema";
import { z } from "zod";
// Simple in-memory cache
const cache = new Map<
  string,
  { data: z.infer<typeof taskSummaryArray>; timestamp: number }
>();
const CACHE_TTL = 1 * 60 * 1000; // 1 minutes

const getMessage = (type: string) => {
  if (type === "today") {
    return (
      "Summary the completed tasks for today, today is " +
      new Date()
        .toLocaleString("default", { timeZone: "America/Los_Angeles" })
        .slice(0, 10)
    );
  } else if (type === "week") {
    return (
      "Summary the completed tasks for the week, the week is from " +
      new Date(new Date().setDate(new Date().getDate() - new Date().getDay()))
        .toLocaleString("default", { timeZone: "America/Los_Angeles" })
        .slice(0, 10)
    );
  } else if (type === "month") {
    return (
      "Summary the completed tasks for the month of " +
      new Date().toLocaleString("default", {
        month: "long",
        timeZone: "America/Los_Angeles",
      }) +
      " and year " +
      new Date().toLocaleString("default", {
        year: "numeric",
        timeZone: "America/Los_Angeles",
      })
    );
  } else if (type === "all") {
    return (
      "Summary the completed tasks for today, this week and the month so far, today is " +
      new Date()
        .toLocaleString("default", { timeZone: "America/Los_Angeles" })
        .slice(0, 10) +
      " the week is from " +
      new Date(new Date().setDate(new Date().getDate() - new Date().getDay()))
        .toLocaleString("default", { timeZone: "America/Los_Angeles" })
        .slice(0, 10) +
      " till " +
      new Date(
        new Date().setDate(new Date().getDate() - new Date().getDay() + 7)
      )
        .toLocaleString("default", { timeZone: "America/Los_Angeles" })
        .slice(0, 10)
    );
  }
};
export async function POST(req: Request) {
  const startTime = Date.now();
  const { type } = await req.json();
  const message = getMessage(type);
  if (!message) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  // Check cache first
  console.log(cache);
  const cacheKey = type;
  const cached = cache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL) {
    const cacheAge = Math.floor((now - cached.timestamp) / 1000);
    console.log(
      `[Cache Hit] Message: ${message.substring(0, 50)}... Cache age: ${cacheAge}s`
    );
    return NextResponse.json(cached.data, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "X-Cache": "HIT",
      },
    });
  }

  console.log(
    `[API Call] Starting generation for message: ${message.substring(0, 5000)}...`
  );

  const personalAgent = mastra.getAgent("personalAgent");

  const { text } = await personalAgent.generate(message);
  console.log(`[API Call] Generated text: ${text.substring(0, 5000)}...`);

  const { object } = await personalAgent.generate(text, {
    output: taskSummaryArray,
  });

  // Store in cache
  cache.set(cacheKey, {
    data: object,
    timestamp: now,
  });

  console.log(cache);

  const totalTime = Date.now() - startTime;
  console.log(`[API Call] Completed in ${totalTime}ms`);

  return NextResponse.json(object, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "X-Cache": "MISS",
    },
  });
}
