import React from "react";

const StatusBadge = ({ status }) => {
  const colors = {
    paid: { bg: "rgba(51,214,159,0.06)", text: "#33D69F", dot: "#33D69F" },
    pending: { bg: "rgba(255,143,0,0.06)", text: "#FF8F00", dot: "#FF8F00" },
    draft: { bg: "rgba(55,59,83,0.06)", text: "#373B53", dot: "#373B53" },
  };
  const dark = {
    paid: { bg: "rgba(51,214,159,0.06)", text: "#33D69F", dot: "#33D69F" },
    pending: { bg: "rgba(255,143,0,0.06)", text: "#FF8F00", dot: "#FF8F00" },
    draft: { bg: "rgba(223,227,250,0.06)", text: "#DFE3FA", dot: "#DFE3FA" },
  };
  const c = colors[status] || colors.draft;
  const dc = dark[status] || dark.draft;
  return (
    <span
      className={`status-badge status-${status}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: `var(--badge-${status}-bg, ${c.bg})`,
        color: `var(--badge-${status}-text, ${c.text})`,
        padding: "7px 16px",
        borderRadius: 6,
        fontWeight: 700,
        fontSize: 12,
        textTransform: "capitalize",
        minWidth: 104,
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: `var(--badge-${status}-dot, ${c.dot})`,
        }}
      />
      {status}
    </span>
  );
};

export default StatusBadge;
