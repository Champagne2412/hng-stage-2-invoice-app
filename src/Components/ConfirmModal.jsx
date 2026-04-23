import React from "react";
import { useRef, useEffect, } from "react";


const ConfirmModal = ({ invoice, onConfirm, onCancel }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        style={{
          background: "var(--color-card)",
          borderRadius: 8,
          padding: "48px",
          maxWidth: 480,
          width: "100%",
          outline: "none",
        }}
      >
        <h2
          id="modal-title"
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: "0 0 12px",
          }}
        >
          Confirm Deletion
        </h2>
        <p
          style={{
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            margin: "0 0 24px",
          }}
        >
          Are you sure you want to delete invoice{" "}
          <strong style={{ color: "var(--color-text-primary)" }}>
            #{invoice.id}
          </strong>
          ? This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
