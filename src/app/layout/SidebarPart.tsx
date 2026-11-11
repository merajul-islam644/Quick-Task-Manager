// Ported by Studio from the agreed design .studio/designs/parts/sidebar.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import "./SidebarPart.css";

export function SidebarPart({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-part-sidebar" data-part-root="sidebar" style={{ display: "contents" }}>
      <aside className="qs-side" aria-label="Quick Task Manager">
        <div className="qs-side-brand">
          <a href="/" className="ds-brand-link" data-goto="home" onClick={goTo("/")}>
            <img className="ds-brand ds-brand-light" src="https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/4db7d9fa-5751-4d03-a387-a03389ae8786/66bc4fc6-9829-4297-b579-36b98cd4b1c2/pikachu.png" alt="Quick Task Manager" />
            <img className="ds-brand ds-brand-dark" src="https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/f2f6488c-a0c3-4e6a-9786-e726fff29e15/106500fc-0028-44d1-a371-c9fae6669afd/pikachu.png" alt="Quick Task Manager" />
          </a>
        </div>
        <nav className="ds-nav qs-side-nav" aria-label="Main">
          <a href="/" className="ds-nav-item ds-active" data-goto="home" onClick={goTo("/")}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></svg>Home</a>
          {" "}
          <a href="/statistics" className="ds-nav-item" data-goto="statistics" onClick={goTo("/statistics")}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>Statistics</a>
          {" "}
          <a href="/settings" className="ds-nav-item" data-goto="settings" onClick={goTo("/settings")}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="3.25" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z" /></svg>Settings</a>
        </nav>
        <div className="qs-side-art" aria-hidden="true">
          <div className="qs-side-art-box">
            <div className="ds-deco" style={{ top: "-32px", right: "-24px", width: "96px", height: "96px", borderRadius: "50%", background: "hsl(var(--primary) / 0.14)" }} />
            <svg viewBox="0 0 120 84" fill="none">
              {" "}
              <rect x="14" y="6" width="72" height="20" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              {" "}
              <circle cx="26" cy="16" r="5" fill="hsl(var(--success) / 0.18)" stroke="hsl(var(--success))" strokeWidth="1.5" />
              {" "}
              <path d="m23.5 16 1.8 1.9 3.2-3.6" stroke="hsl(var(--success))" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              {" "}
              <rect x="38" y="12" width="40" height="3" rx="1.5" fill="hsl(var(--muted-foreground) / 0.55)" />
              {" "}
              <rect x="38" y="19" width="24" height="3" rx="1.5" fill="hsl(var(--muted))" />
              {" "}
              <rect x="24" y="34" width="72" height="20" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              {" "}
              <circle cx="36" cy="44" r="5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              {" "}
              <rect x="48" y="40" width="40" height="3" rx="1.5" fill="hsl(var(--muted-foreground) / 0.55)" />
              {" "}
              <rect x="48" y="47" width="20" height="3" rx="1.5" fill="hsl(var(--primary) / 0.45)" />
              {" "}
              <rect x="8" y="62" width="72" height="20" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              {" "}
              <circle cx="20" cy="72" r="5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              {" "}
              <rect x="32" y="68" width="34" height="3" rx="1.5" fill="hsl(var(--muted-foreground) / 0.55)" />
              {" "}
              <rect x="32" y="75" width="16" height="3" rx="1.5" fill="hsl(var(--muted))" />
              {" "}
            </svg>
            <p className="qs-side-art-line">Plan. Focus. Achieve.</p>
          </div>
        </div>
        <div className="qs-side-person">
          <div className="ds-user">
            <span className="ds-avatar" data-sample="">PS</span>
            {" "}
            <span className="ds-user-text">
              {" "}
              <b className="ds-user-name" data-sample="me.name">Priya Shah</b>
              {" "}
              <span className="ds-user-role" data-sample="me.role">Task owner</span>
              {" "}
            </span>
          </div>
          <a href="/welcome" className="ds-btn ds-btn-ghost ds-btn-sm qs-side-signout" data-goto="welcome" onClick={goTo("/welcome")}>Sign out</a>
        </div>
      </aside>
    </div>
  );
}
