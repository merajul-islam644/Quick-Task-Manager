import { SidebarPart } from "../../app/layout/SidebarPart";
import { HeaderPart } from "../../app/layout/HeaderPart";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { useTasks } from "../tasks/useTasks";
import type { Task } from "../tasks/tasksApi";
import { formatDueDate } from "../tasks/formatDueDate";
import "./HomeScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type HomeScreenSituation = "normal" | "empty" | "no-matches";

type Props = {
  situation?: HomeScreenSituation;
  onNavigate?: (path: string) => void;
  activeTab?: TabKey;
  onSelectTab?: (tab: TabKey) => void;
};

type TabKey = "all" | "pending" | "completed";

const TABS: { key: TabKey; labelKey: "tasks.filterAll" | "tasks.filterPending" | "tasks.filterCompleted"; panel: string; buttonId: string }[] = [
  { key: "all", labelKey: "tasks.filterAll", panel: "panel-all", buttonId: "tab-all" },
  { key: "pending", labelKey: "tasks.filterPending", panel: "panel-pending", buttonId: "tab-pending" },
  { key: "completed", labelKey: "tasks.filterCompleted", panel: "panel-completed", buttonId: "tab-completed" }
];

function CheckIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" className={className}><path d="m5 12 4.5 4.5L19 7" /></svg>;
}

function TaskRow({ task }: { task: Task }) {
  const { t } = useT();
  const title = task.title ?? "";
  const done = task.done === true;
  return (
    <div className={done ? "q-task is-done" : "q-task"}>
      <button className="q-check" type="button" aria-pressed={done} aria-label={`${done ? "Reopen" : "Complete"} ${title}`}>
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
        <button className="ds-btn ds-btn-ghost ds-btn-sm" type="button" aria-label={`Edit ${title}`}> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg> Edit </button>
        {" "}
        <button className="ds-btn ds-btn-ghost ds-btn-icon" type="button" aria-label={`Delete ${title}`}>
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
            <button type="button">Edit task</button>
            {" "}
            <button type="button" className="q-clear">Delete task</button>
          </div>
        </details>
      </div>
    </div>
  );
}

function TaskPanel({ tasks, panel, buttonId }: { tasks: Task[]; panel: string; buttonId: string }) {
  return (
    <div id={panel} role="tabpanel" aria-labelledby={buttonId}>
      <div className="q-tasks">
        {tasks.map((task) => <TaskRow key={task.ItemId} task={task} />)}
      </div>
    </div>
  );
}

export function HomeScreen({ onNavigate, activeTab = "all", onSelectTab }: Props) {
  const { t } = useT();
  const view = useTasks();
  const counts = view.state === "ready" ? view.counts : { all: 0, pending: 0, completed: 0 };
  const tasks = view.state === "ready" ? view.tasks : [];
  const pending = tasks.filter((task) => task.done !== true);
  const completed = tasks.filter((task) => task.done === true);
  const noMatches = tasks.length > 0 && activeTab === "completed" && completed.length === 0;
  const situation: HomeScreenSituation = tasks.length === 0 ? "empty" : noMatches ? "no-matches" : "normal";
  const visible = activeTab === "pending" ? pending : activeTab === "completed" ? completed : tasks;
  const activePanel = "panel-" + activeTab;
  const activeButtonId = "tab-" + activeTab;
  const emptyHint = noMatches ? t("tasks.noMatchesHint") : t("tasks.emptyHint");

  return (
    <div className="studio-screen-home" style={{ display: "contents" }}>
      <main data-screen="home">
        <div className="ds-shell">
          <SidebarPart onNavigate={onNavigate} />
          <div className="ds-shell-main">
            <HeaderPart activePath="/" onNavigate={onNavigate} />
            <div>
              <div className="ds-page q-page">
                <div className="ds-page-head q-head">
                  <div>
                    <h1 className="ds-h1">{t("tasks.title")}</h1>
                    <p className="ds-muted">{t("tasks.subtitle")}</p>
                  </div>
                  <div className="ds-actions">
                    <a className="ds-btn" href="#add" aria-label="Add a task"> <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg> Add Task </a>
                  </div>
                </div>
                <div className="q-stats">
                  <div className="ds-stat q-stat q-stat-total">
                    <span className="ds-stat-label">{t("tasks.total")}</span>
                    {" "}
                    <span className="ds-stat-value">{counts.all}</span>
                    {" "}
                    <span className="q-stat-note">{t("tasks.totalNote")}</span>
                  </div>
                  <div className="ds-stat q-stat q-stat-done">
                    <span className="ds-stat-label">{t("tasks.completed")}</span>
                    {" "}
                    <span className="ds-stat-value">{counts.completed}</span>
                    {" "}
                    <span className="q-stat-note">{t("tasks.completedNote")}</span>
                    {" "}
                    <span className="q-stat-mark" aria-hidden="true">
                      {" "}
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m5 12 4.5 4.5L19 7" />
                      </svg>
                      {" "}
                    </span>
                  </div>
                  <div className="ds-stat q-stat q-stat-open">
                    <span className="ds-stat-label">{t("tasks.pending")}</span>
                    {" "}
                    <span className="ds-stat-value">{counts.pending}</span>
                    {" "}
                    <span className="q-stat-note">{t("tasks.pendingNote")}</span>
                  </div>
                </div>
                <div className="ds-card q-add" id="add">
                  <div className="q-add-head">
                    <h2 className="ds-h3">Add New Task</h2>
                  </div>
                  <form className="q-add-row">
                    <div className="ds-field q-add-title">
                      <label className="ds-label" htmlFor="new-task">Task</label>
                      {" "}
                      <input className="ds-input" id="new-task" type="text" maxLength={200} placeholder="Enter your task..." />
                    </div>
                    <div className="ds-field q-add-date">
                      <label className="ds-label" htmlFor="new-date">Due date</label>
                      {" "}
                      <input className="ds-input" id="new-date" type="date" />
                    </div>
                    <div className="ds-form-actions" style={{ margin: "0" }}>
                      <button className="ds-btn" type="submit">Add Task</button>
                    </div>
                  </form>
                </div>
                <div className="q-list-head">
                  <div className="ds-tabs" role="tablist" aria-label="Filter tasks">
                    {TABS.map((tab, index) => (
                      <span key={tab.key} style={{ display: "contents" }}>
                        {index > 0 ? " " : null}
                        <button
                          className={activeTab === tab.key ? "ds-tab ds-active" : "ds-tab"}
                          role="tab"
                          aria-selected={activeTab === tab.key}
                          aria-controls={tab.panel}
                          id={tab.buttonId}
                          type="button"
                          onClick={() => onSelectTab?.(tab.key)}
                        >
                          {t(tab.labelKey)} <span>{tab.key === "all" ? counts.all : tab.key === "pending" ? counts.pending : counts.completed}</span>
                        </button>
                      </span>
                    ))}
                  </div>
                  <span className="ds-spacer" />
                  {tasks.length > 0 ? (
                    <details className="ds-menu">
                      <summary className="ds-btn ds-btn-secondary" aria-label="More task list actions"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg> More</summary>
                      <div className="ds-menu-list">
                        <button className="q-clear" type="button">Clear All</button>
                      </div>
                    </details>
                  ) : null}
                </div>
                {view.state === "loading" ? (
                  <div className="q-empty-wrap">
                    <div className="ds-empty">{t("tasks.loading")}</div>
                  </div>
                ) : null}
                {view.state === "error" ? (
                  <div className="q-empty-wrap">
                    <div className="ds-empty">
                      <b style={{ color: "hsl(var(--foreground))" }}>{t("tasks.loadFailed")}</b>
                      {" "}
                      <span>{view.message}</span>
                    </div>
                  </div>
                ) : null}
                {view.state === "ready" && tasks.length === 0 ? (
                  <div className="q-empty-wrap">
                    <div className="ds-empty">
                      <span className="ds-empty-icon">
                        {" "}
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path d="M9 11l3 3 8-8" />
                          <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
                        </svg>
                        {" "}
                      </span>
                      {" "}
                      <b style={{ color: "hsl(var(--foreground))" }}>{t("tasks.empty")}</b>
                      {" "}
                      <span>{emptyHint}</span>
                    </div>
                  </div>
                ) : null}
                {view.state === "ready" && visible.length > 0 ? (
                  <TaskPanel tasks={visible} panel={activePanel} buttonId={activeButtonId} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
