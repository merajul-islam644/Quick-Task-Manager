// Ported by Studio from the agreed design .studio/designs/parts/header.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import "./HeaderPart.css";

export function HeaderPart({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-part-header" data-part-root="header" style={{ display: "contents" }}>
      <header className="qs-top">
        <div className="ds-bar qs-top-bar">
          <details className="ds-menu ds-menu-left ds-only-narrow">
            <summary className="ds-menu-button" aria-label="Open the menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="ds-menu-list">
              <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
              {" "}
              <a href="/statistics" data-goto="statistics" onClick={goTo("/statistics")}>Statistics</a>
              {" "}
              <a href="/settings" data-goto="settings" onClick={goTo("/settings")}>Settings</a>
              {" "}
              <a href="/welcome" className="qs-menu-signout" data-goto="welcome" onClick={goTo("/welcome")}>Sign out</a>
              <div className="qs-menu-theme">
                <div className="ds-theme-switch" role="group" aria-label="Colour mode">
                  <button className="ds-active" aria-label="Light">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
                    </svg>
                  </button>
                  {" "}
                  <button aria-label="Dark">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                    </svg>
                  </button>
                  {" "}
                  <button aria-label="Auto">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </details>
          <div className="qs-top-nowrap">
            <a href="/" className="ds-brand-link ds-only-narrow" data-goto="home" onClick={goTo("/")}>
              <img className="ds-brand ds-brand-light" src="https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/4db7d9fa-5751-4d03-a387-a03389ae8786/66bc4fc6-9829-4297-b579-36b98cd4b1c2/pikachu.png" alt="Quick Task Manager" />
              <img className="ds-brand ds-brand-dark" src="https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/f2f6488c-a0c3-4e6a-9786-e726fff29e15/106500fc-0028-44d1-a371-c9fae6669afd/pikachu.png" alt="Quick Task Manager" />
            </a>
          </div>
          <span className="ds-spacer" />
          <div className="qs-top-trail">
            <div className="ds-theme-switch ds-only-wide" role="group" aria-label="Colour mode">
              <button className="ds-active" aria-label="Light">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
                </svg>
              </button>
              {" "}
              <button aria-label="Dark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                </svg>
              </button>
              {" "}
              <button aria-label="Auto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
