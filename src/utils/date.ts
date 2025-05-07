export function getNextWeekdayDate(weekday: number) {
  const now = new Date();
  const day = now.getDay();
  // weekday: 1=Monday, 2=Tuesday, ..., 5=Friday
  const diff = (weekday + 7 - day) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + diff);
  next.setHours(0, 0, 0, 0);
  return next.toISOString();
}

// Helper to get weekday name from date string
export function getWeekdayLabel(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
}
