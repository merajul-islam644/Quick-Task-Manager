import type { MouseEvent } from "react";
import "./HeaderPart.css";
import { useSignOut } from "../../features/auth/useSignOut";
import { ThemeSwitch } from "../../app/layout/ThemeSwitch";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/statistics", label: "Statistics" },
  { href: "/settings", label: "Settings" }
];

export function HeaderPart({ onNavigate, activePath }: { onNavigate?: (path: string) => void; activePath?: string }) {
  const signOut = useSignOut(onNavigate);
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
              {LINKS.map((link, index) => (
                <span key={link.href} style={{ display: "contents" }}>
                  {index > 0 ? " " : null}
                  <a
                    href={link.href}
                    data-goto={link.label.toLowerCase()}
                    aria-current={activePath === link.href ? "page" : undefined}
                    onClick={goTo(link.href)}
                  >
                    {link.label}
                  </a>
                </span>
              ))}
              {" "}
              <button type="button" className="qs-menu-signout" onClick={() => void signOut()}>Sign out</button>
              <div className="qs-menu-theme">
                <ThemeSwitch />
              </div>
            </div>
          </details>
          <div className="qs-top-nowrap">
            <a href="/" className="ds-brand-link ds-only-narrow" data-goto="home" onClick={goTo("/")}>
              <img className="ds-brand ds-brand-light" src="/brand/logo.png" alt="Quick Task Manager" />
              <img className="ds-brand ds-brand-dark" src="/brand/logo-dark.png" alt="Quick Task Manager" />
            </a>
          </div>
          <span className="ds-spacer" />
          <div className="qs-top-trail">
            <ThemeSwitch className="ds-only-wide" />
          </div>
        </div>
      </header>
    </div>
  );
}
