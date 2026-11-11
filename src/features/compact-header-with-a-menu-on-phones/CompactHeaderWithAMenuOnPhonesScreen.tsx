// Ported by Studio from the agreed design .studio/designs/screens/compact-header-with-a-menu-on-phones.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { SidebarPart } from "../../app/layout/SidebarPart";
import { HeaderPart } from "../../app/layout/HeaderPart";
import "./CompactHeaderWithAMenuOnPhonesScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type CompactHeaderWithAMenuOnPhonesScreenSituation = "normal" | "empty";

export function CompactHeaderWithAMenuOnPhonesScreen({ situation = "normal", onNavigate }: { situation?: CompactHeaderWithAMenuOnPhonesScreenSituation; onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-compact-header-with-a-menu-on-phones" style={{ display: "contents" }}>
      <main data-screen="compact-header-with-a-menu-on-phones">
        <div className="ds-shell">
          <SidebarPart onNavigate={onNavigate} />
          <div className="ds-shell-main">
            <HeaderPart onNavigate={onNavigate} />
            {situation === "empty" ? (
              <section data-state="empty">
                <div className="ds-page" style={{ paddingTop: "calc(24px * var(--space-scale, 1))", paddingBottom: "calc(48px * var(--space-scale, 1))" }}>
                  <div className="ds-page-head">
                    <div>
                      <span className="ds-eyebrow" data-sample="GN-01.label">Move around on a phone</span>
                      <h1 className="ds-h1" style={{ marginTop: "calc(8px * var(--space-scale, 1))" }}>The same list, fitted to the screen</h1>
                      <p className="ds-muted" style={{ margin: "calc(6px * var(--space-scale, 1)) 0 0", maxWidth: "560px" }}>A fixed sidebar on a desktop, a compact header with a menu on a phone. Home, Statistics and Settings are always one tap away.</p>
                    </div>
                    <a href="/" className="ds-btn" data-goto="home" onClick={goTo("/")}> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M3 12l9-8 9 8" /><path d="M5 10v10h14V10" /></svg> Go to Home </a>
                  </div>
                  <div className="ds-card" style={{ marginTop: "calc(24px * var(--space-scale, 1))" }}>
                    <div className="ds-empty" style={{ padding: "calc(32px * var(--space-scale, 1)) calc(16px * var(--space-scale, 1))" }}>
                      <span className="ds-empty-icon">
                        {" "}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                        </svg>
                        {" "}
                      </span>
                      {" "}
                      <b style={{ color: "hsl(var(--foreground))" }}>No tasks here. Add a task to get started!</b>
                      {" "}
                      <span>Home is on the menu. Add your first task and the layout settles into place at every width.</span>
                      {" "}
                      <a href="/" className="ds-btn ds-btn-sm" style={{ marginTop: "calc(8px * var(--space-scale, 1))" }} data-goto="home" onClick={goTo("/")}>Add a task</a>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
            {situation !== "empty" ? (
              <div>
                <div className="ds-page" style={{ paddingTop: "calc(24px * var(--space-scale, 1))", paddingBottom: "calc(48px * var(--space-scale, 1))" }}>
                  <div className="ds-page-head">
                    <div>
                      <span className="ds-eyebrow" data-sample="GN-01.label">Move around on a phone</span>
                      <h1 className="ds-h1" style={{ marginTop: "calc(8px * var(--space-scale, 1))" }}>The same list, fitted to the screen</h1>
                      <p className="ds-muted" style={{ margin: "calc(6px * var(--space-scale, 1)) 0 0", maxWidth: "560px" }}>A fixed sidebar on a desktop, a compact header with a menu on a phone. Home, Statistics and Settings are always one tap away.</p>
                    </div>
                    <a href="/" className="ds-btn" data-goto="home" onClick={goTo("/")}> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M3 12l9-8 9 8" /><path d="M5 10v10h14V10" /></svg> Go to Home </a>
                  </div>
                  <div className="gn-stage">
                    <div className="gn-phone-wrap">
                      <div className="ds-deco" style={{ left: "-8%", top: "6%", width: "116%", height: "88%", borderRadius: "50%", background: "radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.14), transparent 68%)" }} />
                      <div className="gn-phone">
                        <div className="gn-notch" aria-hidden="true" />
                        <div className="gn-ph-top">
                          <a href="/" className="ds-brand-link" data-goto="home" aria-label="Quick Task Manager" onClick={goTo("/")}>
                            {" "}
                            <img className="ds-brand ds-brand-light" src="/brand/logo.png" alt="Quick Task Manager" />
                            {" "}
                            <img className="ds-brand ds-brand-dark" src="/brand/logo-dark.png" alt="Quick Task Manager" />
                            {" "}
                          </a>
                          {" "}
                          <span className="gn-ph-title" data-sample="">Quick Task Manager</span>
                          {" "}
                          <button className="ds-menu-button" aria-label="Open the menu" title="Open the menu">
                            {" "}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                              <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                            {" "}
                          </button>
                        </div>
                        <div className="gn-open">
                          <div className="gn-open-label" data-sample="">Menu</div>
                          <nav className="ds-nav">
                            <a href="/" className="ds-nav-item ds-active" data-goto="home" onClick={goTo("/")}> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M3 12l9-8 9 8" /><path d="M5 10v10h14V10" /></svg> Home </a>
                            {" "}
                            <a href="/statistics" className="ds-nav-item" data-goto="statistics" onClick={goTo("/statistics")}> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg> Statistics </a>
                            {" "}
                            <a href="/settings" className="ds-nav-item" data-goto="settings" onClick={goTo("/settings")}> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg> Settings </a>
                          </nav>
                          <div className="ds-theme-switch" role="group" aria-label="Colour mode">
                            <button aria-label="Light">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
                              </svg>
                            </button>
                            {" "}
                            <button className="ds-active" aria-label="Dark">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                              </svg>
                            </button>
                            {" "}
                            <button aria-label="Auto">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                <circle cx="12" cy="12" r="8" />
                                <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gn-explain">
                      <div>
                        <h2 className="ds-h2" style={{ margin: "0 0 calc(8px * var(--space-scale, 1))" }}>One layout, three widths</h2>
                        <p className="ds-text" style={{ margin: "0", color: "hsl(var(--muted-foreground))", maxWidth: "520px" }}>The sidebar holds the navigation on a wide screen. It folds into a compact header and a menu button on a phone, so the same list fits without any sideways scrolling.</p>
                      </div>
                      <div className="gn-breaks">
                        <div className="gn-break">
                          <div className="gn-break-figure">
                            <div className="gn-break-screen" aria-hidden="true" style={{ width: "100%" }}>
                              <div className="gn-break-bar" />
                              <div className="gn-break-col">
                                <div className="gn-break-line" style={{ width: "70%" }} />
                                <div className="gn-break-line" />
                                <div className="gn-break-line" />
                              </div>
                            </div>
                          </div>
                          <span className="gn-bp-name">Desktop</span>
                          <h3>Sidebar stays</h3>
                          <p>Fixed on the left. Cards sit in columns.</p>
                        </div>
                        <div className="gn-break">
                          <div className="gn-break-figure">
                            <div className="gn-break-screen" aria-hidden="true" style={{ width: "78%" }}>
                              <div className="gn-break-bar" />
                              <div className="gn-break-col">
                                <div className="gn-break-line" style={{ width: "60%" }} />
                                <div className="gn-break-line" />
                              </div>
                            </div>
                          </div>
                          <span className="gn-bp-name">Tablet</span>
                          <h3>Sidebar, fewer columns</h3>
                          <p>Navigation holds. Cards wrap into fewer columns.</p>
                        </div>
                        <div className="gn-break">
                          <div className="gn-break-figure">
                            <div className="gn-break-screen" aria-hidden="true" style={{ width: "52%" }}>
                              <div className="gn-break-col">
                                <div className="gn-break-line" style={{ width: "50%" }} />
                                <div className="gn-break-line" />
                                <div className="gn-break-line" style={{ width: "80%" }} />
                              </div>
                            </div>
                          </div>
                          <span className="gn-bp-name">Phone</span>
                          <h3>Compact header</h3>
                          <p>App name and a menu button. Cards stack, one column.</p>
                        </div>
                      </div>
                      <div className="gn-rule">
                        <div className="gn-tap" aria-hidden="true">44 px</div>
                        <div>
                          <h3>Easy to tap</h3>
                          <p>Buttons and checkboxes stay at least 44 pixels tall, and no screen scrolls sideways at any width.</p>
                        </div>
                      </div>
                      <div className="gn-shot" aria-hidden="true">
                        <div className="gn-side">
                          <div className="gn-side-brand">
                            <img className="ds-brand ds-brand-light" src="/brand/logo.png" alt="" />
                            {" "}
                            <img className="ds-brand ds-brand-dark" src="/brand/logo-dark.png" alt="" />
                            {" "}
                            <span className="gn-side-name">Quick Task Manager</span>
                          </div>
                          <div className="gn-nav">
                            <span className="ds-nav-item ds-active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 12l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>Home</span>
                            {" "}
                            <span className="ds-nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>Statistics</span>
                            {" "}
                            <span className="ds-nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9 2 2 0 1 1-2.8 2.8 1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5 2 2 0 1 1-4 0 1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3 2 2 0 1 1-2.8-2.8 1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1 2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9 2 2 0 1 1 2.8-2.8 1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5 2 2 0 1 1 4 0 1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3 2 2 0 1 1 2.8 2.8 1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1 2 2 0 1 1 0 4 1.7 1.7 0 0 0-1.5 1Z" /></svg>Settings</span>
                          </div>
                          <div className="gn-side-foot">
                            <svg className="gn-illo" viewBox="0 0 180 96" fill="none" aria-hidden="true">
                              {" "}
                              <rect x="6" y="12" width="120" height="18" rx="5" fill="hsl(var(--primary) / 0.12)" />
                              {" "}
                              <circle cx="18" cy="21" r="5" fill="hsl(var(--success))" />
                              {" "}
                              <path d="M15.5 21l2 2 3-4" stroke="hsl(var(--success-foreground))" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                              {" "}
                              <rect x="28" y="18" width="72" height="6" rx="3" fill="hsl(var(--primary) / 0.3)" />
                              {" "}
                              <rect x="6" y="40" width="120" height="18" rx="5" fill="hsl(var(--muted))" />
                              {" "}
                              <circle cx="18" cy="49" r="5" stroke="hsl(var(--border))" strokeWidth="1.75" />
                              {" "}
                              <rect x="28" y="46" width="58" height="6" rx="3" fill="hsl(var(--border))" />
                              {" "}
                              <rect x="6" y="68" width="120" height="18" rx="5" fill="hsl(var(--muted))" />
                              {" "}
                              <circle cx="18" cy="77" r="5" stroke="hsl(var(--border))" strokeWidth="1.75" />
                              {" "}
                              <rect x="28" y="74" width="84" height="6" rx="3" fill="hsl(var(--border))" />
                              {" "}
                              <circle cx="150" cy="48" r="22" fill="hsl(var(--primary) / 0.1)" />
                              {" "}
                              <path d="M143 48l5 5 10-11" stroke="hsl(var(--primary-text))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              {" "}
                            </svg>
                            {" "}
                            <span className="gn-side-tag">Plan. Focus. Achieve.</span>
                          </div>
                        </div>
                        <div className="gn-shot-main">
                          <div className="gn-shot-top">
                            <span className="gn-shot-name">Home</span>
                            {" "}
                            <span className="ds-avatar ds-avatar-sm" data-sample="">MH</span>
                          </div>
                          <div className="gn-shot-cards">
                            <div className="gn-shot-card">
                              <span>Total</span>
                              <span>4</span>
                            </div>
                            <div className="gn-shot-card">
                              <span>Completed</span>
                              <span>1</span>
                            </div>
                            <div className="gn-shot-card">
                              <span>Pending</span>
                              <span>3</span>
                            </div>
                          </div>
                          <div className="gn-shot-row">
                            <span className="gn-dot" />
                            <span className="gn-bar" />
                          </div>
                          <div className="gn-shot-row">
                            <span className="gn-dot" style={{ borderColor: "hsl(var(--success))", background: "hsl(var(--success) / 0.18)" }} />
                            <span className="gn-bar short" />
                          </div>
                        </div>
                      </div>
                      <div className="gn-caption">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                        {" "}
                        <span>The menu on a phone also holds the colour mode switch, so no screen loses its toggle.</span>
                      </div>
                      <div className="gn-note">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path d="M9 11l3 3 8-8" />
                          <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
                        </svg>
                        <p>Home is selected first. Reaching Statistics or Settings is one menu choice away, and the chosen screen closes the menu.</p>
                      </div>
                      <div className="ds-actions">
                        <a href="/statistics" className="ds-btn ds-btn-ghost" data-goto="statistics" onClick={goTo("/statistics")}>See Statistics</a>
                        {" "}
                        <a href="/settings" className="ds-btn ds-btn-secondary" data-goto="settings" onClick={goTo("/settings")}>Open Settings</a>
                      </div>
                    </div>
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
