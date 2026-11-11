/** "Today", "Tomorrow", or the day and month ("12 Nov") for any other day. */
export function formatDueDate(dueDate: string | undefined, now: Date = new Date()): string {
  if (!dueDate) return "";
  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) return "";
  const startOfDay = (value: Date) => new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
  const days = Math.round((startOfDay(due) - startOfDay(now)) / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return due.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/** The bare date a date field shows (YYYY-MM-DD) for a stored date-and-time value. */
export function toDateInputValue(dueDate: string | undefined): string {
  if (!dueDate) return "";
  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) return "";
  const month = String(due.getMonth() + 1).padStart(2, "0");
  const day = String(due.getDate()).padStart(2, "0");
  return `${due.getFullYear()}-${month}-${day}`;
}
