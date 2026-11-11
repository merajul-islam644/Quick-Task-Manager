// Ported by Studio from the agreed design .studio/designs/screens/welcome.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { useEffect } from "react";
import "./WelcomeScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type WelcomeScreenSituation = "normal" | "signed-out";

export function WelcomeScreen({ situation = "normal", onNavigate }: { situation?: WelcomeScreenSituation; onNavigate?: (path: string) => void }) {
  // A situation may mark the whole page, as it does in the design.
  useEffect(() => {
    const marks = ({"signed-out":["is-signed-out"]} as Record<string, string[]>)[situation] ?? [];
    document.documentElement.classList.add(...marks);
    return () => document.documentElement.classList.remove(...marks);
  }, [situation]);
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-welcome" style={{ display: "contents" }}>
      <main data-screen="welcome">
        <header className="wl-top">
          <div className="ds-bar wl-top-bar">
            <a href="/" className="ds-brand-link" data-goto="home" onClick={goTo("/")}>
              <img className="ds-brand ds-brand-light" src="https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/4db7d9fa-5751-4d03-a387-a03389ae8786/66bc4fc6-9829-4297-b579-36b98cd4b1c2/pikachu.png" alt="Quick Task Manager" />
              <img className="ds-brand ds-brand-dark" src="https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/f2f6488c-a0c3-4e6a-9786-e726fff29e15/106500fc-0028-44d1-a371-c9fae6669afd/pikachu.png" alt="Quick Task Manager" />
            </a>
            <div className="wl-top-right">
              <div className="ds-theme-switch" role="group" aria-label="Colour mode">
                <button className="ds-active" aria-label="Light">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
                  </svg>
                </button>
                {" "}
                <button aria-label="Dark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                  </svg>
                </button>
                {" "}
                <button aria-label="Auto">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        {situation === "signed-out" ? (
          <section data-state="signed-out">
            <section className="wl-hero">
              <div className="ds-page">
                <div className="wl-hero-grid">
                  <div>
                    <span className="ds-eyebrow">Personal task list</span>
                    <h1 className="ds-h1 wl-promise" style={{ fontSize: "clamp(44px, 7.2vw, 84px)" }}>Plan. Focus.<span className="wl-word-accent">Achieve.</span></h1>
                    <p className="wl-lede">Add what needs doing, set a due date, check it off when it's done. Your list stays yours and no one else sees it.</p>
                    <div className="wl-actions">
                      <span className="wl-signed-out"> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg> You're signed out. </span>
                      {" "}
                      <button className="ds-btn ds-btn-lg" data-goto="home" onClick={goTo("/")}> Sign in or create an account <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" style={{ width: "18px", height: "18px" }}><path d="M5 12h14M13 6l6 6-6 6" /></svg> </button>
                    </div>
                  </div>
                  <div className="wl-preview-wrap">
                    <div className="wl-preview" aria-label="A sample of your task list">
                      <div className="wl-preview-head">
                        <span className="wl-preview-title">Today's list</span>
                        {" "}
                        <span className="wl-preview-count">2 of 3 done</span>
                      </div>
                      <div className="wl-tasks">
                        <div className="wl-task is-done">
                          <span className="wl-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                              <path d="m5 12 5 5 9-10" />
                            </svg>
                          </span>
                          <div className="wl-task-text">
                            <span className="wl-task-title">Finish project report</span>
                            <div className="wl-task-sub">
                              <span className="wl-task-date">Yesterday</span>
                              {" "}
                              <span className="ds-badge ds-badge-success">Completed</span>
                            </div>
                          </div>
                          <span className="wl-trash" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />
                            </svg>
                          </span>
                        </div>
                        <div className="wl-task">
                          <span className="wl-box" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="m5 12 5 5 9-10" />
                            </svg>
                          </span>
                          <div className="wl-task-text">
                            <span className="wl-task-title">Read a book</span>
                            <div className="wl-task-sub">
                              <span className="wl-task-date">Today</span>
                              {" "}
                              <span className="ds-badge ds-badge-info">Pending</span>
                            </div>
                          </div>
                          <span className="wl-trash" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />
                            </svg>
                          </span>
                        </div>
                        <div className="wl-task is-done">
                          <span className="wl-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                              <path d="m5 12 5 5 9-10" />
                            </svg>
                          </span>
                          <div className="wl-task-text">
                            <span className="wl-task-title">Go for a walk</span>
                            <div className="wl-task-sub">
                              <span className="wl-task-date">Tomorrow</span>
                              {" "}
                              <span className="ds-badge ds-badge-success">Completed</span>
                            </div>
                          </div>
                          <span className="wl-trash" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        ) : null}
        {situation !== "signed-out" ? (
          <div>
            <section className="wl-hero">
              <div className="ds-page">
                <div className="wl-hero-grid">
                  <div>
                    <span className="ds-eyebrow" data-sample="">A personal task list</span>
                    <h1 className="ds-h1 wl-promise" style={{ fontSize: "clamp(44px, 7.2vw, 84px)" }}>
                      <span data-sample="">Plan. Focus.</span>
                      <span className="wl-word-accent" data-sample="">Achieve.</span>
                    </h1>
                    <p className="wl-lede" data-sample="">Add what needs doing, set a due date, check it off when it's done. Your list stays yours and no one else sees it.</p>
                    <div id="opening-actions">
                      <div className="wl-actions">
                        <button className="ds-btn ds-btn-lg" data-goto="home" onClick={goTo("/")}> Sign in or create an account <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" style={{ width: "18px", height: "18px" }}><path d="M5 12h14M13 6l6 6-6 6" /></svg> </button>
                        {" "}
                        <span className="wl-note">
                          {" "}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                            <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                          {" "}
                          <span data-sample="">New accounts start with 3 sample tasks.</span>
                          {" "}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="wl-preview-wrap">
                    <div className="wl-preview" aria-label="A sample of your task list">
                      <div className="wl-preview-head">
                        <span className="wl-preview-title">Today's list</span>
                        {" "}
                        <span className="wl-preview-count" data-sample="">2 of 3 done</span>
                      </div>
                      <div className="wl-tasks">
                        <div className="wl-task is-done">
                          <span className="wl-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                              <path d="m5 12 5 5 9-10" />
                            </svg>
                          </span>
                          <div className="wl-task-text">
                            <span className="wl-task-title" data-sample="">Finish project report</span>
                            <div className="wl-task-sub">
                              <span className="wl-task-date" data-sample="">Yesterday</span>
                              {" "}
                              <span className="ds-badge ds-badge-success">Completed</span>
                            </div>
                          </div>
                          <span className="wl-trash" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />
                            </svg>
                          </span>
                        </div>
                        <div className="wl-task">
                          <span className="wl-box" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="m5 12 5 5 9-10" />
                            </svg>
                          </span>
                          <div className="wl-task-text">
                            <span className="wl-task-title" data-sample="">Read a book</span>
                            <div className="wl-task-sub">
                              <span className="wl-task-date" data-sample="">Today</span>
                              {" "}
                              <span className="ds-badge ds-badge-info">Pending</span>
                            </div>
                          </div>
                          <span className="wl-trash" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />
                            </svg>
                          </span>
                        </div>
                        <div className="wl-task is-done">
                          <span className="wl-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                              <path d="m5 12 5 5 9-10" />
                            </svg>
                          </span>
                          <div className="wl-task-text">
                            <span className="wl-task-title" data-sample="">Go for a walk</span>
                            <div className="wl-task-sub">
                              <span className="wl-task-date" data-sample="">Tomorrow</span>
                              {" "}
                              <span className="ds-badge ds-badge-success">Completed</span>
                            </div>
                          </div>
                          <span className="wl-trash" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="wl-band wl-features">
              <div className="ds-page">
                <div className="wl-features-head">
                  <h2 className="ds-h2">A list that keeps up</h2>
                  <p className="ds-muted" style={{ margin: "calc(8px * var(--space-scale, 1)) 0 0" }}>Everything you add stays on one dashboard, with the numbers to match.</p>
                </div>
                <div className="wl-features-grid">
                  <div className="wl-feature">
                    <span className="wl-feature-num">01</span>
                    {" "}
                    <span className="wl-feature-title">Add and check off</span>
                    <p className="wl-feature-text">Type a task, pick a date, and it lands at the end of your list. One click marks it done in place, green with a check mark.</p>
                  </div>
                  <div className="wl-feature">
                    <span className="wl-feature-num">02</span>
                    {" "}
                    <span className="wl-feature-title">Filter in a tap</span>
                    <p className="wl-feature-text">Switch between All, Pending and Completed. Each tab shows its count, so you always know what's left.</p>
                  </div>
                  <div className="wl-feature">
                    <span className="wl-feature-num">03</span>
                    {" "}
                    <span className="wl-feature-title">Know where you stand</span>
                    <p className="wl-feature-text">Statistics reads straight from your list: total tasks, completed and pending, with the share of the day behind you.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null}
        <footer>
          <div className="ds-bar wl-foot">
            <a href="/" className="ds-brand-link" data-goto="home" onClick={goTo("/")}>
              <img className="ds-brand ds-brand-light" src="https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/4db7d9fa-5751-4d03-a387-a03389ae8786/66bc4fc6-9829-4297-b579-36b98cd4b1c2/pikachu.png" alt="Quick Task Manager" />
              <img className="ds-brand ds-brand-dark" src="https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/f2f6488c-a0c3-4e6a-9786-e726fff29e15/106500fc-0028-44d1-a371-c9fae6669afd/pikachu.png" alt="Quick Task Manager" />
            </a>
            {" "}
            <span className="ds-spacer" />
            {" "}
            <span data-sample="">Plan. Focus. Achieve.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
