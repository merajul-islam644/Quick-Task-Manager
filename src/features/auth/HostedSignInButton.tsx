import { useState } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { isLoginConfigured } from "../../lib/blocks/config";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { useSignupEnabled } from "./useSignupEnabled";

/** One hosted sign-in button: its label says sign-up is open while the project allows it. */
export function HostedSignInButton({ size = "lg", returnTo }: { size?: "sm" | "lg"; returnTo?: string }) {
  const { login } = useAuth();
  const { t } = useT();
  const signupOpen = useSignupEnabled();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const label = signupOpen ? t("auth.signInOrCreate") : t("auth.signIn");

  async function handleClick() {
    setMessage(undefined);
    setPending(true);
    try {
      await login(returnTo || "/");
    } catch (error) {
      console.error("Sign-in could not be started", error);
      setMessage(t("auth.openFailed"));
      setPending(false);
    }
  }

  return (
    <span className="qs-signin">
      <button
        className={size === "lg" ? "ds-btn ds-btn-lg" : "ds-btn"}
        type="button"
        onClick={handleClick}
        disabled={!isLoginConfigured() || pending}
      >
        {" "}
        {pending ? t("auth.redirecting") : label}{" "}
        {pending ? null : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" style={size === "lg" ? { width: "18px", height: "18px" } : undefined}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}{" "}
      </button>
      {message ? (
        <span className="qs-signin-error" role="alert">
          {message}
        </span>
      ) : null}
    </span>
  );
}
