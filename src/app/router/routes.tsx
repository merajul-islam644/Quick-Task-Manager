import { useEffect, useState } from "react";
import { RedirectIfAuthenticated, RequireAuth } from "./guards";
import { CallbackPage } from "../../features/auth/CallbackPage";
import { LoginPage } from "../../features/auth/LoginPage";
import { WelcomeScreen } from "../../features/welcome/WelcomeScreen";
import { HomeScreen } from "../../features/home/HomeScreen";
import { StatisticsScreen } from "../../features/statistics/StatisticsScreen";
import { SettingsScreen } from "../../features/settings/SettingsScreen";
import { useAuth } from "../providers/AuthProvider";

type TabKey = "all" | "pending" | "completed";

export function AppRouter() {
  const { justSignedOut } = useAuth();
  const [path, setPath] = useState(() => window.location.pathname);
  const [search, setSearch] = useState(() => window.location.search);
  const [tab, setTab] = useState<TabKey>("all");

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
      setSearch(window.location.search);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(nextPath: string) {
    const [nextPathname = "/", queryString = ""] = nextPath.split("?");
    window.history.pushState({}, "", nextPath);
    setPath(nextPathname);
    setSearch(queryString ? `?${queryString}` : "");
  }

  if (path === "/login/callback") {
    return <CallbackPage onNavigate={navigate} />;
  }

  if (path === "/welcome") {
    const returnTo = new URLSearchParams(search).get("returnTo") || undefined;
    return (
      <RedirectIfAuthenticated onNavigate={navigate}>
        <WelcomeScreen situation={justSignedOut ? "signed-out" : "normal"} onNavigate={navigate} returnTo={returnTo} />
      </RedirectIfAuthenticated>
    );
  }

  if (path === "/login") {
    const returnTo = new URLSearchParams(search).get("returnTo") || undefined;
    return (
      <RedirectIfAuthenticated onNavigate={navigate}>
        <LoginPage returnTo={returnTo} />
      </RedirectIfAuthenticated>
    );
  }

  return (
    <RequireAuth currentPath={path} onNavigate={navigate}>
      {path === "/" ? (
        <HomeScreen onNavigate={navigate} activeTab={tab} onSelectTab={setTab} />
      ) : path === "/statistics" ? (
        <StatisticsScreen onNavigate={navigate} />
      ) : path === "/settings" ? (
        <SettingsScreen onNavigate={navigate} />
      ) : (
        <div className="pane-scope" style={{ padding: 32 }}>This page does not exist.</div>
      )}
    </RequireAuth>
  );
}
