import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../app/providers/AuthProvider";
import { blocksClient } from "../../lib/blocks/client";
import { gatewayError, itemsOf, listTasks } from "./tasksApi";
import type { Task } from "./tasksApi";

const SAMPLE_TASKS = [
  { title: "Finish project report", offsetDays: -4, done: true },
  { title: "Read a book", offsetDays: 0, done: false },
  { title: "Go for a walk", offsetDays: 1, done: false }
];

function dueDateFor(offsetDays: number): string {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString();
}

export function sampleTaskInputs() {
  return SAMPLE_TASKS.map((task) => ({ title: task.title, dueDate: dueDateFor(task.offsetDays), done: task.done }));
}

async function seedSampleTasks(): Promise<number> {
  const seeded = await Promise.all(
    sampleTaskInputs().map((input) =>
      blocksClient.data
        .graphql({
          operationName: "insertTask",
          query: `mutation insertTask($input: TaskInsertInput!) { insertTask(input: $input) { acknowledged itemId message } }`,
          variables: { input }
        })
        .then((response) => {
          const failure = gatewayError(response);
          const result = (response as { data?: { insertTask?: { acknowledged?: boolean } | null } }).data?.insertTask;
          if (failure) throw new Error(failure);
          if (!result?.acknowledged) throw new Error("The sample task could not be saved.");
          return 1;
        })
    )
  );
  return seeded.length;
}

export type TasksView =
  | { state: "loading" }
  | { state: "error"; message: string }
  | { state: "ready"; tasks: Task[]; counts: { all: number; pending: number; completed: number } };

/**
 * Reads the person's own tasks. A new account starts with 3 sample tasks,
 * added once, the first time its list comes back empty.
 */
export function useTasks(): TasksView {
  const { status } = useAuth();
  const query = useQuery({
    enabled: status === "authenticated",
    queryKey: ["tasks", "mine"],
    queryFn: async () => {
      const first = await listTasks();
      if (first.length > 0) return first;
      await seedSampleTasks();
      return listTasks();
    },
    staleTime: 10_000
  });

  if (query.isLoading) return { state: "loading" };
  if (query.isError) return { state: "error", message: (query.error as Error).message };
  const tasks = query.data ?? [];
  const completed = tasks.filter((task) => task.done === true).length;
  return { state: "ready", tasks, counts: { all: tasks.length, pending: tasks.length - completed, completed } };
}

export { itemsOf };
