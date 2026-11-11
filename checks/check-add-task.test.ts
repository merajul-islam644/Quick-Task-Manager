import { useAddTask } from "../src/features/tasks/useAddTask.ts";
import { fromDateInputValue, todayInputValue } from "../src/features/tasks/formatDueDate.ts";

console.log("useAddTask is a function:", typeof useAddTask === "function");
console.log("today input value:", todayInputValue(new Date(2026, 10, 11)));
console.log("full time from a bare date:", fromDateInputValue("2026-11-11"));
console.log(JSON.stringify({ ok: typeof useAddTask === "function" && fromDateInputValue("2026-11-11").endsWith("Z") }));
process.exit(0);
