import { useAuth } from "../../app/providers/AuthProvider";

/** Leaves the hosted session and returns to the opening screen. */
export function useSignOut(onNavigate?: (path: string) => void) {
  const { logout } = useAuth();
  return async () => {
    await logout();
    if (onNavigate) onNavigate("/welcome");
  };
}
