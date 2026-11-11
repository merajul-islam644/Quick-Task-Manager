import { useT } from "../../lib/i18n/LocalizationProvider";
import { useAddTask } from "../tasks/useAddTask";

/**
 * Add New Task card: type the task, pick a date (it starts on today), then
 * press Add Task or Enter. A blank or spaces-only task shows the hint instead.
 */
export function AddTaskCard({ id = "add" }: { id?: string }) {
  const { t } = useT();
  const add = useAddTask();
  const fieldId = `new-task-${id}`;
  const dateId = `new-date-${id}`;

  return (
    <div className="ds-card q-add" id={id}>
      <div className="q-add-head">
        <h2 className="ds-h3">Add New Task</h2>
      </div>
      <form
        className="q-add-row"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void add.submit();
        }}
      >
        <div className="ds-field q-add-title">
          <label className="ds-label" htmlFor={fieldId}>Task</label>
          {" "}
          <input
            className="ds-input"
            id={fieldId}
            type="text"
            maxLength={200}
            placeholder="Enter your task..."
            value={add.title}
            aria-invalid={add.error ? true : undefined}
            onChange={(event) => add.setTitle(event.target.value)}
          />
          {add.error ? <span className="ds-error" role="alert">{add.error}</span> : null}
        </div>
        <div className="ds-field q-add-date">
          <label className="ds-label" htmlFor={dateId}>Due date</label>
          {" "}
          <input
            className="ds-input"
            id={dateId}
            type="date"
            value={add.dueDate}
            onChange={(event) => add.setDueDate(event.target.value)}
          />
        </div>
        <div className="ds-form-actions" style={{ margin: "0" }}>
          <button className="ds-btn" type="submit" disabled={add.saving}>
            {add.saving ? t("common.loading") : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
