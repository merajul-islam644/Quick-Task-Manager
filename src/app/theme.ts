import { useCallback, useEffect, useState } from "react";

export type ThemeChoice = "light" | "dark" | "auto";

const THEME_KEY = "blocks-app:theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function readChoice(): ThemeChoice {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" || stored === "auto" ? stored : "auto";
}

function applyChoice(choice: ThemeChoice) {
  const prefersDark = window.matchMedia(DARK_QUERY).matches;
  const dark = choice === "dark" || (choice === "auto" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
}

export function useTheme(): { choice: ThemeChoice; setChoice: (choice: ThemeChoice) => void } {
  const [choice, setChoiceState] = useState<ThemeChoice>(readChoice);

  useEffect(() => {
    applyChoice(choice);
  }, [choice]);

  useEffect(() => {
    const mql = window.matchMedia(DARK_QUERY);
    const onChange = () => {
      if (readChoice() === "auto") applyChoice("auto");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const setChoice = useCallback((next: ThemeChoice) => {
    localStorage.setItem(THEME_KEY, next);
    setChoiceState(next);
  }, []);

  return { choice, setChoice };
}
