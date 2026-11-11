import { useState } from "react";
import { toDateInputValue, fromDateInputValue, todayInputValue } from "../tasks/formatDueDate";
import type { Task } from "../tasks/tasksApi";

/** A task card turned into fields: the text and its due date, with Save and Cancel. */
export function TaskEditForm({ task, saving, error, onSave, onCancel }: {
  task: Task;
  saving: boolean;
  error?: string;
  onSave: (edits: { title: string; dueDate: string }) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(task.title ?? "");
  const [dueDate, setDueDate] = useState(() => toDateInputValue(task.dueDate) || todayInputValue());
  const [localError, setLocalError] = useState<string | undefined>();

  const shownError = localError ?? error;

  function submit() {
    const text = title.trim();
    if (!text) {
      setLocalError("Write the task first.");
      return;
    }
    setLocalError(undefined);
    onSave({ title: text.slice(0, 200), dueDate: fromDateInputValue(dueDate) });
  }

  return (
    <div className={task.done === true ? "q-task is-done q-task-editing" : "q-task q-task-editing"}>
      <form
        className="q-task-body q-edit-form"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="ds-field">
          <label className="ds-label" htmlFor={`edit-title-${task.ItemId}`}>Task</label>
          {" "}
          <input
            className="ds-input"
            id={`edit-title-${task.ItemId}`}
            type="text"
            maxLength={200}
            value={title}
            autoFocus
            aria-invalid={shownError ? true : undefined}
            onChange={(event) => {
              setTitle(event.target.value);
              setLocalError(undefined);
            }}
          />
          {shownError ? <span className="ds-error" role="alert">{shownError}</span> : null}
        </div>
        <div className="ds-field q-edit-date">
          <label className="ds-label" htmlFor={`edit-date-${task.ItemId}`}>Due date</label>
          {" "}
          <input
            className="ds-input"
            id={`edit-date-${task.ItemId}`}
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
        <div className="ds-form-actions q-edit-actions">
          <button className="ds-btn ds-btn-secondary" type="button" onClick={onCancel}>Cancel</button>
          {" "}
          <button className="ds-btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
