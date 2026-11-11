import { useT } from "../../lib/i18n/LocalizationProvider";
import type { Task } from "../tasks/tasksApi";
import { formatDueDate } from "../tasks/formatDueDate";

export type TaskCardActions = {
  onToggle?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

function CheckIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" /></svg>;
}

/** One task card: round checkbox, text, date label, status and the row actions. */
export function TaskCard({ task, actions }: { task: Task; actions?: TaskCardActions }) {
  const { t } = useT();
  const title = task.title ?? "";
  const done = task.done === true;
  return (
    <div className={done ? "q-task is-done" : "q-task"}>
      <button
        className="q-check"
        type="button"
        aria-pressed={done}
        aria-label={`${done ? "Reopen" : "Complete"} ${title}`}
        onClick={() => actions?.onToggle?.(task)}
      >
        {" "}
        <span>
          {" "}
          <CheckIcon />
          {" "}
        </span>
        {" "}
      </button>
      <div className="q-task-body">
        <span className="q-task-title">{title}</span>
        <div className="q-task-meta">
          <span className="q-date"> <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg> {formatDueDate(task.dueDate)} </span>
          {" "}
          <span className={done ? "ds-badge ds-badge-success" : "ds-badge ds-badge-info"}>{done ? t("tasks.statusCompleted") : t("tasks.statusPending")}</span>
        </div>
      </div>
      <div className="ds-row-actions q-row-actions">
        <button className="ds-btn ds-btn-ghost ds-btn-sm" type="button" aria-label={`Edit ${title}`} onClick={() => actions?.onEdit?.(task)}> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg> Edit </button>
        {" "}
        <button className="ds-btn ds-btn-ghost ds-btn-icon" type="button" aria-label={`Delete ${title}`} onClick={() => actions?.onDelete?.(task)}>
          {" "}
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
          </svg>
          {" "}
        </button>
        <details className="ds-menu">
          <summary className="ds-btn ds-btn-ghost ds-btn-icon" aria-label={`More actions for ${title}`}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </summary>
          <div className="ds-menu-list">
            <button type="button" onClick={() => actions?.onEdit?.(task)}>Edit task</button>
            {" "}
            <button type="button" className="q-clear" onClick={() => actions?.onDelete?.(task)}>Delete task</button>
          </div>
        </details>
      </div>
    </div>
  );
}

/** The list of task cards under the chosen tab. */
export function TaskList({ tasks, actions, panel, buttonId }: { tasks: Task[]; actions?: TaskCardActions; panel: string; buttonId: string }) {
  return (
    <div id={panel} role="tabpanel" aria-labelledby={buttonId}>
      <div className="q-tasks">
        {tasks.map((task) => <TaskCard key={task.ItemId} task={task} actions={actions} />)}
      </div>
    </div>
  );
}
