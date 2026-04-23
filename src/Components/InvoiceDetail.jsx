import React from "react";
import StatusBadge from "./StatusBadge";
import { formatDate, formatCurrency } from "../utils/helpers";
import IconArrowLeft from "../Components/icons/IconArrowLeft"

const InvoiceDetail = ({ invoice, onBack, onEdit, onDelete, onMarkPaid }) => {
  return (
    <div
      className="content-area"
      style={{ maxWidth: 730, margin: "0 auto", padding: "32px 24px" }}
    >
      <button
        className="btn-back"
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: 32,
          color: "var(--color-text-primary)",
          fontWeight: 700,
          fontSize: 12,
        }}
      >
        <IconArrowLeft /> Go back
      </button>

      <div
        style={{
          background: "var(--color-card)",
          borderRadius: 8,
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
            Status
          </span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="detail-actions" style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
          {invoice.status === "pending" && (
            <button className="btn btn-primary" onClick={onMarkPaid}>
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          background: "var(--color-card)",
          borderRadius: 8,
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 4px",
              }}
            >
              <span style={{ color: "var(--color-text-secondary)" }}>#</span>
              {invoice.id}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-secondary)",
                margin: 0,
              }}
            >
              {invoice.description}
            </p>
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: 12,
              color: "var(--color-text-secondary)",
              lineHeight: 1.8,
            }}
          >
            <p style={{ margin: 0 }}>{invoice.senderAddress.street}</p>
            <p style={{ margin: 0 }}>{invoice.senderAddress.city}</p>
            <p style={{ margin: 0 }}>{invoice.senderAddress.postCode}</p>
            <p style={{ margin: 0 }}>{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
            marginBottom: 40,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-secondary)",
                margin: "0 0 12px",
              }}
            >
              Invoice Date
            </p>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 24px",
              }}
            >
              {formatDate(invoice.createdAt)}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-secondary)",
                margin: "0 0 12px",
              }}
            >
              Payment Due
            </p>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {formatDate(invoice.paymentDue)}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-secondary)",
                margin: "0 0 12px",
              }}
            >
              Bill To
            </p>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 8px",
              }}
            >
              {invoice.clientName}
            </p>
            <div
              style={{
                fontSize: 12,
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
              }}
            >
              <p style={{ margin: 0 }}>{invoice.clientAddress.street}</p>
              <p style={{ margin: 0 }}>{invoice.clientAddress.city}</p>
              <p style={{ margin: 0 }}>{invoice.clientAddress.postCode}</p>
              <p style={{ margin: 0 }}>{invoice.clientAddress.country}</p>
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-secondary)",
                margin: "0 0 12px",
              }}
            >
              Sent To
            </p>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {invoice.clientEmail}
            </p>
          </div>
        </div>

        <div
          style={{
            background: "var(--color-table-bg)",
            borderRadius: "8px 8px 0 0",
            padding: 32,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {["Item Name", "QTY.", "Price", "Total"].map((h, i) => (
              <span
                key={h}
                style={{
                  fontSize: 12,
                  color: "var(--color-text-secondary)",
                  textAlign: i > 0 ? "right" : "left",
                }}
              >
                {h}
              </span>
            ))}
          </div>
          {invoice.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--color-text-secondary)",
                  textAlign: "right",
                }}
              >
                {item.quantity}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--color-text-secondary)",
                  textAlign: "right",
                }}
              >
                {formatCurrency(item.price)}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  textAlign: "right",
                }}
              >
                {formatCurrency(item.total)}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "var(--color-total-bg)",
            borderRadius: "0 0 8px 8px",
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, color: "#fff" }}>Amount Due</span>
          <span style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>
            {formatCurrency(invoice.total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
