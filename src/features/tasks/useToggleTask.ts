import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { setTaskDone } from "./tasksApi";
import type { Task } from "./tasksApi";

export type TaskQueryData = Task[];

/** Marks a task done or pending and saves it; the list keeps its order. */
export function useToggleTask() {
  const queryClient = useQueryClient();
  const saving = useRef(new Set<string>());

  return useMutation({
    mutationFn: async (task: Task) => {
      const itemId = String(task.ItemId);
      if (saving.current.has(itemId)) return;
      saving.current.add(itemId);
      try {
        await setTaskDone(itemId, task.done !== true);
      } finally {
        saving.current.delete(itemId);
      }
    },
    onMutate: async (task: Task) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", "mine"] });
      const previous = queryClient.getQueryData<TaskQueryData>(["tasks", "mine"]);
      queryClient.setQueryData<TaskQueryData>(["tasks", "mine"], (current) =>
        (current ?? []).map((entry) => (entry.ItemId === task.ItemId ? { ...entry, done: entry.done !== true } : entry))
      );
      return { previous };
    },
    onError: (_error, _task, context) => {
      if (context?.previous) queryClient.setQueryData(["tasks", "mine"], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tasks", "mine"] })
  });
}
