import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "./tasksApi";
import type { Task } from "./tasksApi";

/** Removes one task, or every task of the person for Clear All. */
export function useDeleteTasks() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["tasks", "mine"] });

  return {
    remove: useMutation({ mutationFn: (task: Task) => deleteTask(String(task.ItemId)), onSuccess: invalidate }),
    removeAll: useMutation({
      mutationFn: (tasks: Task[]) => Promise.all(tasks.map((task) => deleteTask(String(task.ItemId)))),
      onSuccess: invalidate
    })
  };
}
