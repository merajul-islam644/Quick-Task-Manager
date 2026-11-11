// Ported by Studio from the agreed design .studio/designs/screens/home.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import { SidebarPart } from "../../app/layout/SidebarPart";
import { HeaderPart } from "../../app/layout/HeaderPart";
import "./HomeScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type HomeScreenSituation = "normal" | "empty" | "no-matches";

export function HomeScreen({ situation = "normal", onNavigate }: { situation?: HomeScreenSituation; onNavigate?: (path: string) => void }) {
  return (
    <div className="studio-screen-home" style={{ display: "contents" }}>
      <main data-screen="home">
        <div className="ds-shell">
          <SidebarPart onNavigate={onNavigate} />
          <div className="ds-shell-main">
            <HeaderPart onNavigate={onNavigate} />
            {situation === "empty" ? (
              <section data-state="empty">
                <div className="ds-page q-page">
                  <div className="ds-page-head q-head">
                    <div>
                      <h1 className="ds-h1">Your tasks</h1>
                      <p className="ds-muted">Everything on your list, with what is done and what is still waiting.</p>
                    </div>
                    <div className="ds-actions">
                      <a className="ds-btn" href="#" aria-label="Add a task"> <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg> Add Task </a>
                    </div>
                  </div>
                  <div className="q-stats">
                    <div className="ds-stat q-stat q-stat-total">
                      <span className="ds-stat-label">Total tasks</span>
                      {" "}
                      <span className="ds-stat-value" data-sample="">0</span>
                      {" "}
                      <span className="q-stat-note">On your list right now</span>
                    </div>
                    <div className="ds-stat q-stat q-stat-done">
                      <span className="ds-stat-label">Completed</span>
                      {" "}
                      <span className="ds-stat-value" data-sample="">0</span>
                      {" "}
                      <span className="q-stat-note">Ticked off and finished</span>
                    </div>
                    <div className="ds-stat q-stat q-stat-open">
                      <span className="ds-stat-label">Pending</span>
                      {" "}
                      <span className="ds-stat-value" data-sample="">0</span>
                      {" "}
                      <span className="q-stat-note">Still to do</span>
                    </div>
                  </div>
                  <div className="ds-card q-add" id="add-empty">
                    <div className="q-add-head">
                      <h2 className="ds-h3">Add New Task</h2>
                    </div>
                    <form className="q-add-row">
                      <div className="ds-field q-add-title">
                        <label className="ds-label" htmlFor="new-task-empty">Task</label>
                        {" "}
                        <input className="ds-input" id="new-task-empty" type="text" maxLength={200} placeholder="Enter your task..." />
                      </div>
                      <div className="ds-field q-add-date">
                        <label className="ds-label" htmlFor="new-date-empty">Due date</label>
                        {" "}
                        <input className="ds-input" id="new-date-empty" type="date" defaultValue="2026-11-12" data-sample="Task#new.dueDate" />
                      </div>
                      <div className="ds-form-actions" style={{ margin: "0" }}>
                        <button className="ds-btn" type="submit" data-situation="done">Add Task</button>
                      </div>
                    </form>
                  </div>
                  <div className="q-list-head">
                    <div className="ds-tabs" role="tablist" aria-label="Filter tasks">
                      <button className="ds-tab ds-active" role="tab" aria-selected="true" aria-controls="e-all" id="e-tab-all">All <span data-sample="">0</span></button>
                      {" "}
                      <button className="ds-tab" role="tab" aria-selected="false" aria-controls="e-pending" id="e-tab-pending">Pending <span data-sample="">0</span></button>
                      {" "}
                      <button className="ds-tab" role="tab" aria-selected="false" aria-controls="e-tab-completed" id="e-tab-completed">Completed <span data-sample="">0</span></button>
                    </div>
                  </div>
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
                      <b style={{ color: "hsl(var(--foreground))" }}>No tasks here. Add a task to get started!</b>
                      {" "}
                      <span>Type your first task above and press Add Task.</span>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
            {situation === "no-matches" ? (
              <section data-state="no-matches">
                <div className="ds-page q-page">
                  <div className="ds-page-head q-head">
                    <div>
                      <h1 className="ds-h1">Your tasks</h1>
                      <p className="ds-muted">Everything on your list, with what is done and what is still waiting.</p>
                    </div>
                    <div className="ds-actions">
                      <a className="ds-btn" href="#" aria-label="Add a task"> <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg> Add Task </a>
                    </div>
                  </div>
                  <div className="q-stats">
                    <div className="ds-stat q-stat q-stat-total">
                      <span className="ds-stat-label">Total tasks</span>
                      {" "}
                      <span className="ds-stat-value" data-sample="">3</span>
                      {" "}
                      <span className="q-stat-note">On your list right now</span>
                    </div>
                    <div className="ds-stat q-stat q-stat-done">
                      <span className="ds-stat-label">Completed</span>
                      {" "}
                      <span className="ds-stat-value" data-sample="">0</span>
                      {" "}
                      <span className="q-stat-note">Ticked off and finished</span>
                    </div>
                    <div className="ds-stat q-stat q-stat-open">
                      <span className="ds-stat-label">Pending</span>
                      {" "}
                      <span className="ds-stat-value" data-sample="">3</span>
                      {" "}
                      <span className="q-stat-note">Still to do</span>
                    </div>
                  </div>
                  <div className="ds-card q-add" id="add-nomatch">
                    <div className="q-add-head">
                      <h2 className="ds-h3">Add New Task</h2>
                    </div>
                    <form className="q-add-row">
                      <div className="ds-field q-add-title">
                        <label className="ds-label" htmlFor="new-task-nomatch">Task</label>
                        {" "}
                        <input className="ds-input" id="new-task-nomatch" type="text" maxLength={200} placeholder="Enter your task..." />
                      </div>
                      <div className="ds-field q-add-date">
                        <label className="ds-label" htmlFor="new-date-nomatch">Due date</label>
                        {" "}
                        <input className="ds-input" id="new-date-nomatch" type="date" defaultValue="2026-11-12" data-sample="Task#new.dueDate" />
                      </div>
                      <div className="ds-form-actions" style={{ margin: "0" }}>
                        <button className="ds-btn" type="submit" data-situation="done">Add Task</button>
                      </div>
                    </form>
                  </div>
                  <div className="q-list-head">
                    <div className="ds-tabs" role="tablist" aria-label="Filter tasks">
                      <button className="ds-tab" role="tab" aria-selected="false" aria-controls="m-all" id="m-tab-all">All <span data-sample="">3</span></button>
                      {" "}
                      <button className="ds-tab" role="tab" aria-selected="false" aria-controls="m-pending" id="m-tab-pending">Pending <span data-sample="">3</span></button>
                      {" "}
                      <button className="ds-tab ds-active" role="tab" aria-selected="true" aria-controls="m-completed" id="m-tab-completed">Completed <span data-sample="">0</span></button>
                    </div>
                  </div>
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
                      <b style={{ color: "hsl(var(--foreground))" }}>No tasks here. Add a task to get started!</b>
                      {" "}
                      <span>Nothing is completed yet. Tick a task off to see it here.</span>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
            {situation !== "empty" && situation !== "no-matches" ? (
              <div>
                <div className="ds-page q-page">
                  <div className="ds-page-head q-head">
                    <div>
                      <h1 className="ds-h1">Your tasks</h1>
                      <p className="ds-muted">Everything on your list, with what is done and what is still waiting.</p>
                    </div>
                    <div className="ds-actions">
                      <a className="ds-btn" href="#" aria-label="Add a task"> <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg> Add Task </a>
                    </div>
                  </div>
                  <div className="q-stats">
                    <div className="ds-stat q-stat q-stat-total">
                      <span className="ds-stat-label">Total tasks</span>
                      {" "}
                      <span className="ds-stat-value" data-sample="">5</span>
                      {" "}
                      <span className="q-stat-note">On your list right now</span>
                    </div>
                    <div className="ds-stat q-stat q-stat-done">
                      <span className="ds-stat-label">Completed</span>
                      {" "}
                      <span className="ds-stat-value" data-sample="">2</span>
                      {" "}
                      <span className="q-stat-note">Ticked off and finished</span>
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
                      <span className="ds-stat-label">Pending</span>
                      {" "}
                      <span className="ds-stat-value" data-sample="">3</span>
                      {" "}
                      <span className="q-stat-note">Still to do</span>
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
                        <input className="ds-input" id="new-date" type="date" defaultValue="2026-11-12" data-sample="Task#new.dueDate" />
                      </div>
                      <div className="ds-form-actions" style={{ margin: "0" }}>
                        <button className="ds-btn" type="submit" data-situation="done">Add Task</button>
                      </div>
                    </form>
                  </div>
                  <div className="q-list-head">
                    <div className="ds-tabs" role="tablist" aria-label="Filter tasks">
                      <button className="ds-tab ds-active" role="tab" aria-selected="true" aria-controls="panel-all" id="tab-all">All <span data-sample="">5</span></button>
                      {" "}
                      <button className="ds-tab" role="tab" aria-selected="false" aria-controls="panel-pending" id="tab-pending">Pending <span data-sample="">3</span></button>
                      {" "}
                      <button className="ds-tab" role="tab" aria-selected="false" aria-controls="panel-completed" id="tab-completed">Completed <span data-sample="">2</span></button>
                    </div>
                    <span className="ds-spacer" />
                    <details className="ds-menu">
                      <summary className="ds-btn ds-btn-secondary" aria-label="More task list actions"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg> More</summary>
                      <div className="ds-menu-list">
                        <button className="q-clear" type="button">Clear All</button>
                      </div>
                    </details>
                  </div>
                  <div id="panel-all" role="tabpanel" aria-labelledby="tab-all">
                    <div className="q-tasks">
                      <div className="q-task is-done">
                        <button className="q-check" type="button" aria-pressed="true" aria-label="Mark Finish project report as pending">
                          {" "}
                          <span>
                            {" "}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                              <path d="m5 12 4.5 4.5L19 7" />
                            </svg>
                            {" "}
                          </span>
                          {" "}
                        </button>
                        <div className="q-task-body">
                          <span className="q-task-title" data-sample="Task#1.title">Finish project report</span>
                          <div className="q-task-meta">
                            <span className="q-date" data-sample="Task#1.dueDate"> <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg> 7 Nov </span>
                            {" "}
                            <span className="ds-badge ds-badge-success">Completed</span>
                          </div>
                        </div>
                        <div className="ds-row-actions q-row-actions">
                          <button className="ds-btn ds-btn-ghost ds-btn-sm" type="button" aria-label="Edit Finish project report"> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg> Edit </button>
                          {" "}
                          <button className="ds-btn ds-btn-ghost ds-btn-icon" type="button" aria-label="Delete Finish project report">
                            {" "}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                              <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
                            </svg>
                            {" "}
                          </button>
                          <details className="ds-menu">
                            <summary className="ds-btn ds-btn-ghost ds-btn-icon" aria-label="More actions for Finish project report">
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
                      <div className="q-task">
                        <button className="q-check" type="button" aria-pressed="false" aria-label="Mark Read a book as completed">
                          {" "}
                          <span>
                            {" "}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                              <path d="m5 12 4.5 4.5L19 7" />
                            </svg>
                            {" "}
                          </span>
                          {" "}
                        </button>
                        <div className="q-task-body">
                          <span className="q-task-title" data-sample="Task#2.title">Read a book</span>
                          <div className="q-task-meta">
                            <span className="q-date" data-sample="Task#2.dueDate"> <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg> Today </span>
                            {" "}
                            <span className="ds-badge ds-badge-info">Pending</span>
                          </div>
                        </div>
                        <div className="ds-row-actions q-row-actions">
                          <button className="ds-btn ds-btn-ghost ds-btn-sm" type="button" aria-label="Edit Read a book"> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg> Edit </button>
                          {" "}
                          <button className="ds-btn ds-btn-ghost ds-btn-icon" type="button" aria-label="Delete Read a book">
                            {" "}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                              <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
                            </svg>
                            {" "}
                          </button>
                          <details className="ds-menu">
                            <summary className="ds-btn ds-btn-ghost ds-btn-icon" aria-label="More actions for Read a book">
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
                      <div className="q-task">
                        <button className="q-check" type="button" aria-pressed="false" aria-label="Mark Go for a walk as completed">
                          {" "}
                          <span>
                            {" "}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                              <path d="m5 12 4.5 4.5L19 7" />
                            </svg>
                            {" "}
                          </span>
                          {" "}
                        </button>
                        <div className="q-task-body">
                          <span className="q-task-title" data-sample="Task#3.title">Go for a walk</span>
                          <div className="q-task-meta">
                            <span className="q-date" data-sample="Task#3.dueDate"> <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg> Tomorrow </span>
                            {" "}
                            <span className="ds-badge ds-badge-info">Pending</span>
                          </div>
                        </div>
                        <div className="ds-row-actions q-row-actions">
                          <button className="ds-btn ds-btn-ghost ds-btn-sm" type="button" aria-label="Edit Go for a walk"> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg> Edit </button>
                          {" "}
                          <button className="ds-btn ds-btn-ghost ds-btn-icon" type="button" aria-label="Delete Go for a walk">
                            {" "}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                              <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
                            </svg>
                            {" "}
                          </button>
                          <details className="ds-menu">
                            <summary className="ds-btn ds-btn-ghost ds-btn-icon" aria-label="More actions for Go for a walk">
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
                      <div className="q-task">
                        <button className="q-check" type="button" aria-pressed="false" aria-label="Mark Renew car insurance as completed">
                          {" "}
                          <span>
                            {" "}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                              <path d="m5 12 4.5 4.5L19 7" />
                            </svg>
                            {" "}
                          </span>
                          {" "}
                        </button>
                        <div className="q-task-body">
                          <span className="q-task-title" data-sample="Task#4.title">Renew car insurance before the weekend and send the new certificate to Priya</span>
                          <div className="q-task-meta">
                            <span className="q-date" data-sample="Task#4.dueDate"> <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg> 18 Nov </span>
                            {" "}
                            <span className="ds-badge ds-badge-info">Pending</span>
                          </div>
                        </div>
                        <div className="ds-row-actions q-row-actions">
                          <button className="ds-btn ds-btn-ghost ds-btn-sm" type="button" aria-label="Edit Renew car insurance"> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg> Edit </button>
                          {" "}
                          <button className="ds-btn ds-btn-ghost ds-btn-icon" type="button" aria-label="Delete Renew car insurance">
                            {" "}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                              <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
                            </svg>
                            {" "}
                          </button>
                          <details className="ds-menu">
                            <summary className="ds-btn ds-btn-ghost ds-btn-icon" aria-label="More actions for Renew car insurance">
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
                      <div className="q-task is-done">
                        <button className="q-check" type="button" aria-pressed="true" aria-label="Mark Call the dentist as pending">
                          {" "}
                          <span>
                            {" "}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                              <path d="m5 12 4.5 4.5L19 7" />
                            </svg>
                            {" "}
                          </span>
                          {" "}
                        </button>
                        <div className="q-task-body">
                          <span className="q-task-title" data-sample="Task#5.title">Call the dentist</span>
                          <div className="q-task-meta">
                            <span className="q-date" data-sample="Task#5.dueDate"> <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg> 3 Nov </span>
                            {" "}
                            <span className="ds-badge ds-badge-success">Completed</span>
                          </div>
                        </div>
                        <div className="ds-row-actions q-row-actions">
                          <button className="ds-btn ds-btn-ghost ds-btn-sm" type="button" aria-label="Edit Call the dentist"> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg> Edit </button>
                          {" "}
                          <button className="ds-btn ds-btn-ghost ds-btn-icon" type="button" aria-label="Delete Call the dentist">
                            {" "}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                              <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
                            </svg>
                            {" "}
                          </button>
                          <details className="ds-menu">
                            <summary className="ds-btn ds-btn-ghost ds-btn-icon" aria-label="More actions for Call the dentist">
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
                    </div>
                  </div>
                  <div id="panel-pending" role="tabpanel" aria-labelledby="tab-pending" hidden />
                  <div id="panel-completed" role="tabpanel" aria-labelledby="tab-completed" hidden />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
