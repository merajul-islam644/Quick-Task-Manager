import { useCallback, useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import "./HeaderPart.css";
import { useSignOut } from "../../features/auth/useSignOut";
import { ThemeSwitch } from "../../app/layout/ThemeSwitch";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/statistics", label: "Statistics" },
  { href: "/settings", label: "Settings" }
];

/** A menu that opens on click and closes on Escape, a click outside, or after choosing an item. */
function useClosingMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = useCallback(() => {
    if (ref.current) ref.current.open = false;
  }, []);

  useEffect(() => {
    function onPointer(event: Event) {
      const element = ref.current;
      if (element?.open && event.target instanceof Node && !element.contains(event.target)) close();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [close]);

  return { ref, close };
}

export function HeaderPart({ onNavigate, activePath }: { onNavigate?: (path: string) => void; activePath?: string }) {
  const signOut = useSignOut(onNavigate);
  const menu = useClosingMenu();

  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    menu.close();
    onNavigate(path);
  };

  return (
    <div className="studio-part-header" data-part-root="header" style={{ display: "contents" }}>
      <header className="qs-top">
        <div className="ds-bar qs-top-bar">
          <details className="ds-menu ds-menu-left ds-only-narrow qs-phone-menu" ref={menu.ref}>
            <summary className="ds-menu-button" aria-label="Open the menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="ds-menu-list" role="menu" aria-label="Main">
              {LINKS.map((link, index) => (
                <span key={link.href} style={{ display: "contents" }}>
                  {index > 0 ? " " : null}
                  <a
                    href={link.href}
                    role="menuitem"
                    data-goto={link.label.toLowerCase()}
                    className={activePath === link.href ? "ds-active" : undefined}
                    aria-current={activePath === link.href ? "page" : undefined}
                    onClick={goTo(link.href)}
                  >
                    {activePath === link.href ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" /></svg> : null}
                    {link.label}
                  </a>
                </span>
              ))}
              {" "}
              <button type="button" role="menuitem" className="qs-menu-signout" onClick={() => { menu.close(); void signOut(); }}>Sign out</button>
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
