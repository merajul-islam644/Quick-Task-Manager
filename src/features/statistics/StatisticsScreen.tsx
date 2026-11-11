// Ported by Studio from the agreed design .studio/designs/screens/statistics.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { SidebarPart } from "../../app/layout/SidebarPart";
import { HeaderPart } from "../../app/layout/HeaderPart";
import "./StatisticsScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type StatisticsScreenSituation = "normal" | "empty";

export function StatisticsScreen({ situation = "normal", onNavigate }: { situation?: StatisticsScreenSituation; onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-statistics" style={{ display: "contents" }}>
      <main data-screen="statistics">
        <div className="ds-shell">
          <SidebarPart onNavigate={onNavigate} />
          <div className="ds-shell-main">
            <HeaderPart onNavigate={onNavigate} />
            {situation === "empty" ? (
              <section data-state="empty">
                <div className="st-head">
                  <div className="ds-page">
                    <div className="ds-page-head st-page-head">
                      <div>
                        <span className="ds-eyebrow st-eyebrow">Overview</span>
                        <h1 className="ds-h1">Statistics</h1>
                        <p className="ds-muted st-sub">Live counts for your own tasks, worked out from your list the moment you open this screen.</p>
                      </div>
                      <div className="ds-actions">
                        <a href="/" className="ds-btn ds-btn-secondary" data-goto="home" onClick={goTo("/")}>Go to Home</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ds-page st-empty-wrap">
                  <div className="ds-card">
                    <div className="ds-empty">
                      <span className="ds-empty-icon">
                        {" "}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                        </svg>
                        {" "}
                      </span>
                      {" "}
                      <b style={{ color: "hsl(var(--foreground))" }}>No tasks here. Add a task to get started!</b>
                      {" "}
                      <span>Add your first task on Home and your numbers appear here.</span>
                      {" "}
                      <a href="/" className="ds-btn" style={{ marginTop: "calc(8px * var(--space-scale, 1))" }} data-goto="home" onClick={goTo("/")}>Go to Home</a>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
            {situation !== "empty" ? (
              <div>
                <div className="st-head">
                  <div className="ds-page">
                    <div className="ds-page-head st-page-head">
                      <div>
                        <span className="ds-eyebrow st-eyebrow">Overview</span>
                        <h1 className="ds-h1">Statistics</h1>
                        <p className="ds-muted st-sub">Live counts for your own tasks, worked out from your list the moment you open this screen.</p>
                      </div>
                      <div className="ds-actions">
                        <a href="/" className="ds-btn ds-btn-secondary" data-goto="home" onClick={goTo("/")}>Go to Home</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ds-page">
                  <section className="ds-section" style={{ marginTop: "calc(32px * var(--space-scale, 1))" }}>
                    <div className="st-figures">
                      <div className="st-figure st-figure-key">
                        <span className="ds-stat-label">Total tasks</span>
                        {" "}
                        <span className="st-big" data-sample="">5</span>
                        {" "}
                        <span className="st-note">Every task on your list</span>
                      </div>
                      <div className="st-figure st-figure-done">
                        <span className="ds-stat-label">Completed</span>
                        {" "}
                        <span className="st-big" data-sample="">2</span>
                        {" "}
                        <span className="ds-note ds-muted">Checked off so far</span>
                      </div>
                      <div className="st-figure st-figure-pending">
                        <span className="ds-stat-label">Pending</span>
                        {" "}
                        <span className="st-big" data-sample="">3</span>
                        {" "}
                        <span className="ds-note ds-muted">Still waiting for you</span>
                      </div>
                    </div>
                  </section>
                  <section className="ds-section">
                    <div className="st-share">
                      <div className="st-share-top">
                        <div>
                          <span className="ds-label-caps">Completed share</span>
                          <p className="st-share-line" data-sample="">2 of 5 tasks done</p>
                        </div>
                        <span className="st-share-pct" data-sample="">40%</span>
                      </div>
                      <div className="ds-progress">
                        <span style={{ width: "40%" }} />
                      </div>
                      <div className="st-legend">
                        <span className="st-key">
                          <span className="st-dot st-dot-done" />
                          <span className="ds-muted">Done</span>
                        </span>
                        {" "}
                        <span className="st-key">
                          <span className="st-dot st-dot-open" />
                          <span className="ds-muted">Pending</span>
                        </span>
                      </div>
                    </div>
                  </section>
                  <div className="st-foot">
                    <span className="ds-muted">Mark a task done on Home and these numbers change with it.</span>
                    {" "}
                    <span className="ds-spacer" />
                    {" "}
                    <a href="/" className="ds-btn ds-btn-ghost" data-goto="home" onClick={goTo("/")}>Back to my tasks</a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
