import { SidebarPart } from "../../app/layout/SidebarPart";
import { HeaderPart } from "../../app/layout/HeaderPart";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { useTasks } from "../tasks/useTasks";
import "./HomeScreen.css";
import { TaskList } from "./TaskList";
import { AddTaskCard } from "./AddTaskCard";
import { useToggleTask } from "../tasks/useToggleTask";
import { useEditTask } from "../tasks/useEditTask";
import { useDeleteTasks } from "../tasks/useDeleteTasks";
import { ClearAllDialog } from "./ClearAllDialog";
import { useState } from "react";
import type { Task } from "../tasks/tasksApi";

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

export function HomeScreen({ onNavigate, activeTab = "all", onSelectTab }: Props) {
  const { t } = useT();
  const view = useTasks();
  const toggle = useToggleTask();
  const edit = useEditTask();
  const remove = useDeleteTasks();
  const [editingId, setEditingId] = useState<string | undefined>();
  const [editError, setEditError] = useState<string | undefined>();
  const [clearOpen, setClearOpen] = useState(false);
  const [clearError, setClearError] = useState<string | undefined>();
  const [deleteError, setDeleteError] = useState<string | undefined>();

  const taskActions = {
    onToggle: (task: Task) => toggle.mutate(task),
    onEdit: (task: Task) => { setEditError(undefined); setEditingId(String(task.ItemId)); },
    onDelete: (task: Task) => {
      setDeleteError(undefined);
      remove.remove.mutate(task, { onError: (error) => setDeleteError((error as Error).message) });
    }
  };
  const taskStatus = {
    editingId,
    saving: edit.isPending,
    editError,
    onSaveEdit: (task: Task, edits: { title: string; dueDate: string }) => {
      setEditError(undefined);
      edit.mutate({ task, edits }, {
        onSuccess: () => setEditingId(undefined),
        onError: (error) => setEditError((error as Error).message)
      });
    },
    onCancelEdit: () => { setEditError(undefined); setEditingId(undefined); }
  };
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
                <AddTaskCard id="add" />
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
                        <button className="q-clear" type="button" onClick={() => { setClearError(undefined); setClearOpen(true); }}>Clear All</button>
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
                  <span style={{ display: "contents" }}>
                    <TaskList tasks={visible} actions={taskActions} status={taskStatus} panel={activePanel} buttonId={activeButtonId} />
                    {deleteError ? <p className="ds-error q-task-error" role="alert">{deleteError}</p> : null}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <ClearAllDialog
          open={clearOpen}
          busy={remove.removeAll.isPending}
          error={clearError}
          onCancel={() => setClearOpen(false)}
          onConfirm={() => {
            setClearError(undefined);
            remove.removeAll.mutate(tasks, {
              onSuccess: () => { setClearOpen(false); setEditingId(undefined); },
              onError: (error) => setClearError((error as Error).message)
            });
          }}
        />
      </main>
    </div>
  );
}
