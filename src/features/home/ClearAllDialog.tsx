import { useEffect } from "react";

/** Asks before removing every task: Delete all and Cancel. */
export function ClearAllDialog({ open, busy, error, onConfirm, onCancel }: {
  open: boolean;
  busy: boolean;
  error?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={(event) => {
      if (event.target === event.currentTarget) onCancel();
    }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="clear-all-title">
        <div className="modal-header">
          <h3 className="ds-h3" id="clear-all-title">Delete all your tasks?</h3>
        </div>
        {error ? <p className="ds-error" role="alert">{error}</p> : null}
        <div className="modal-actions">
          <button className="ds-btn ds-btn-secondary" type="button" onClick={onCancel}>Cancel</button>
          {" "}
          <button className="ds-btn ds-btn-danger" type="button" disabled={busy} onClick={onConfirm}>
            {busy ? "Deleting..." : "Delete all"}
          </button>
        </div>
      </div>
    </div>
  );
}
