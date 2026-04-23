import React from "react";

const EmptyState = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 80,
        gap: 24,
      }}
    >
      <svg width="242" height="200" viewBox="0 0 242 200" fill="none">
        <ellipse cx="121" cy="100" rx="121" ry="100" fill="var(--color-bg-3)" />
        <path
          d="M73 69h96a8 8 0 018 8v80a8 8 0 01-8 8H73a8 8 0 01-8-8V77a8 8 0 018-8z"
          fill="var(--color-invoice-bg)"
        />
        <path
          d="M73 69h96a8 8 0 018 8v14H65V77a8 8 0 018-8z"
          fill="var(--color-card)"
        />
        <circle cx="86" cy="84" r="5" fill="#7C5DFA" />
        <rect
          x="97"
          y="80"
          width="36"
          height="4"
          rx="2"
          fill="var(--color-border)"
        />
        <rect
          x="97"
          y="86"
          width="24"
          height="4"
          rx="2"
          fill="var(--color-border)"
        />
        <rect
          x="73"
          y="107"
          width="56"
          height="4"
          rx="2"
          fill="var(--color-border)"
        />
        <rect
          x="73"
          y="115"
          width="40"
          height="4"
          rx="2"
          fill="var(--color-border)"
        />
        <rect x="145" y="107" width="24" height="4" rx="2" fill="#7C5DFA" />
        <rect
          x="73"
          y="131"
          width="56"
          height="4"
          rx="2"
          fill="var(--color-border)"
        />
        <rect
          x="73"
          y="139"
          width="40"
          height="4"
          rx="2"
          fill="var(--color-border)"
        />
        <rect x="145" y="131" width="24" height="4" rx="2" fill="#7C5DFA" />
      </svg>
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: "0 0 8px",
          }}
        >
          There is nothing here
        </h2>
        <p
          style={{
            color: "var(--color-text-secondary)",
            maxWidth: 220,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Create an invoice by clicking the <strong>New Invoice</strong> button
          and get started
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
