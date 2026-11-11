import { useTheme } from "../../app/theme";
import type { ThemeChoice } from "../../app/theme";

const OPTIONS: { value: ThemeChoice; label: string; icon: JSX.Element }[] = [
  {
    value: "light",
    label: "Light",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
    )
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    )
  },
  {
    value: "auto",
    label: "Auto",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
      </svg>
    )
  }
];

export function ThemeSwitch({ className }: { className?: string }) {
  const { choice, setChoice } = useTheme();
  return (
    <div className={className ? `ds-theme-switch ${className}` : "ds-theme-switch"} role="group" aria-label="Colour mode">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={choice === option.value ? "ds-active" : undefined}
          aria-label={option.label}
          aria-pressed={choice === option.value}
          onClick={() => setChoice(option.value)}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
