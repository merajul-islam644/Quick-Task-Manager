// Ported by Studio from the agreed design .studio/designs/screens/settings.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { SidebarPart } from "../../app/layout/SidebarPart";
import { HeaderPart } from "../../app/layout/HeaderPart";
import "./SettingsScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type SettingsScreenSituation = "normal" | "not-allowed";

export function SettingsScreen({ situation = "normal", onNavigate }: { situation?: SettingsScreenSituation; onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-settings" style={{ display: "contents" }}>
      <main data-screen="settings">
        <div className="ds-shell">
          <SidebarPart onNavigate={onNavigate} />
          <div className="ds-shell-main">
            <HeaderPart onNavigate={onNavigate} />
            {situation === "not-allowed" ? (
              <section data-state="not-allowed">
                <div className="ds-page" style={{ paddingTop: "calc(32px * var(--space-scale, 1))", paddingBottom: "calc(48px * var(--space-scale, 1))" }}>
                  <div className="ds-page-head">
                    <div>
                      <h1 className="ds-h1">Settings</h1>
                      <p className="ds-muted" style={{ margin: "calc(8px * var(--space-scale, 1)) 0 0" }}>You are not signed in.</p>
                    </div>
                  </div>
                  <div className="ds-card" style={{ padding: "calc(32px * var(--space-scale, 1))" }}>
                    <div className="ds-empty">
                      <span className="ds-empty-icon">
                        {" "}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <rect x="4" y="10" width="16" height="10" rx="2" />
                          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                        </svg>
                        {" "}
                      </span>
                      {" "}
                      <b style={{ color: "hsl(var(--foreground))" }}>Sign in to see your account</b>
                      {" "}
                      <span>Your name, email address and the date you joined show here once you are signed in.</span>
                      {" "}
                      <a href="/welcome" className="ds-btn" style={{ marginTop: "calc(8px * var(--space-scale, 1))" }} data-goto="welcome" onClick={goTo("/welcome")}>Sign in or create an account</a>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
            {situation !== "not-allowed" ? (
              <div>
                <div className="ds-page" style={{ paddingTop: "calc(32px * var(--space-scale, 1))", paddingBottom: "calc(48px * var(--space-scale, 1))" }}>
                  <div className="ds-page-head">
                    <div>
                      <h1 className="ds-h1">Settings</h1>
                      <p className="ds-muted" style={{ margin: "calc(8px * var(--space-scale, 1)) 0 0" }}>The account you are signed in with, and the way out.</p>
                    </div>
                    <div className="ds-actions">
                      <button className="ds-btn ds-btn-danger"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M15 4h4v16h-4M11 8l-4 4 4 4M7 12h9" /></svg> Sign out </button>
                    </div>
                  </div>
                  <div className="ds-section qs-account">
                    <div className="qs-id-card">
                      <div className="qs-id-top">
                        <span className="ds-avatar qs-avatar-big" data-sample="">PS</span>
                        <div>
                          <h2 className="qs-id-name" data-sample="me.name">Priya Shah</h2>
                          <p className="qs-id-mail" data-sample="me.email">priya.shah@northgate-studio.co.uk</p>
                        </div>
                        <span className="ds-spacer" />
                        {" "}
                        <span className="ds-badge ds-badge-success">Signed in</span>
                      </div>
                      <dl className="qs-facts">
                        <div>
                          <dt>Name</dt>
                          <dd data-sample="me.name">Priya Shah</dd>
                        </div>
                        <div>
                          <dt>Email address</dt>
                          <dd data-sample="me.email">priya.shah@northgate-studio.co.uk</dd>
                        </div>
                        <div>
                          <dt>Member since</dt>
                          <dd data-sample="me.memberSince">3 Nov 2026</dd>
                        </div>
                        <div>
                          <dt>Role</dt>
                          <dd data-sample="me.role">Task owner</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="qs-side">
                      <h2>Signed in on this device</h2>
                      <p>Your name and email address are set by the account you signed in with. To use a different account, sign out and sign in again.</p>
                      <div className="qs-side-actions">
                        <button className="ds-btn ds-btn-secondary"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M15 4h4v16h-4M11 8l-4 4 4 4M7 12h9" /></svg> Sign out </button>
                        {" "}
                        <a href="/" className="ds-btn ds-btn-ghost" data-goto="home" onClick={goTo("/")}>Back to Home</a>
                      </div>
                    </div>
                  </div>
                  <div className="qs-band-note">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8h.01M11 12h1v4h1" />
                    </svg>
                    <p>Your tasks are private to this account. Nobody else in the app can see them.</p>
                    <span className="qs-sp" />
                    {" "}
                    <a href="/statistics" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="statistics" onClick={goTo("/statistics")}>See my statistics</a>
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
