import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskFields } from "./tasksApi";
import type { Task } from "./tasksApi";

export type TaskEdits = { title: string; dueDate: string };

/** Saves a changed text and due date on a task, in place, and reloads the list. */
export function useEditTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ task, edits }: { task: Task; edits: TaskEdits }) => updateTaskFields(String(task.ItemId), edits),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks", "mine"] })
  });
}
