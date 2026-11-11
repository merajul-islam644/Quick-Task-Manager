import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "./tasksApi";
import { fromDateInputValue, todayInputValue } from "./formatDueDate";

const MAX_TITLE = 200;

export type AddTaskState = {
  title: string;
  dueDate: string;
  error: string | undefined;
  saving: boolean;
  setTitle: (value: string) => void;
  setDueDate: (value: string) => void;
  submit: () => Promise<boolean>;
};

/** The Add New Task card: a required text (spaces alone do not count) and a due date that starts on today. */
export function useAddTask(): AddTaskState {
  const queryClient = useQueryClient();
  const [title, setTitleState] = useState("");
  const [dueDate, setDueDate] = useState(() => todayInputValue());
  const [error, setError] = useState<string | undefined>();

  const mutation = useMutation({
    mutationFn: (input: { title: string; dueDate: string }) => createTask({ title: input.title, dueDate: input.dueDate, done: false }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks", "mine"] })
  });

  const setTitle = useCallback((value: string) => {
    setTitleState(value);
    setError(undefined);
  }, []);

  const submit = useCallback(async () => {
    const text = title.trim();
    if (!text) {
      setError("Write the task first.");
      return false;
    }
    setError(undefined);
    try {
      await mutation.mutateAsync({ title: text.slice(0, MAX_TITLE), dueDate: fromDateInputValue(dueDate || todayInputValue()) });
      setTitleState("");
      setDueDate(todayInputValue());
      return true;
    } catch (caught) {
      setError((caught as Error).message);
      return false;
    }
  }, [dueDate, mutation, title]);

  return { title, dueDate, error, saving: mutation.isPending, setTitle, setDueDate, submit };
}
