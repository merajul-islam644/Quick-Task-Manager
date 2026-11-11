import { fromDateInputValue, todayInputValue, formatDueDate } from "../src/features/tasks/formatDueDate.ts";
import { readFileSync } from "node:fs";

const today = todayInputValue(new Date(2026, 10, 11));
const stored = fromDateInputValue("2026-11-11");
const label = formatDueDate(stored, new Date(2026, 10, 11));

const hook = readFileSync(new URL("../src/features/tasks/useAddTask.ts", import.meta.url), "utf8");
const card = readFileSync(new URL("../src/features/home/AddTaskCard.tsx", import.meta.url), "utf8");

const results = {
  todayInput: today,
  storedIsFullTime: /T12:00:00\.000Z$/.test(stored),
  labelForToday: label,
  blankGuardInHook: hook.includes('if (!text) {\n      setError("Write the task first.")'),
  startsPending: hook.includes("done: false"),
  clearsInputAfterSave: hook.includes('setTitleState("")'),
  formSubmitWired: card.includes("onSubmit={(event) =>") && card.includes("add.submit()"),
  errorShown: card.includes('role="alert"') && card.includes("add.error"),
  dateStartsToday: hook.includes("useState(() => todayInputValue())")
};
console.log(JSON.stringify(results, null, 2));
const ok = today === "2026-11-11" && results.storedIsFullTime && label === "Today" && results.blankGuardInHook
  && results.startsPending && results.clearsInputAfterSave && results.formSubmitWired && results.errorShown && results.dateStartsToday;
console.log(ok ? "PASS add-task behaviour" : "FAIL add-task behaviour");
process.exit(ok ? 0 : 1);
