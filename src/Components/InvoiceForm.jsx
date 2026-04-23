import React from "react";
import { useState, useEffect, useRef } from "react";
import { calcTotal, addDays, today, formatCurrency } from "../utils/helpers";
import IconDelete from "../Components/icons/IconDelete"
import IconPlus from "./icons/IconPlus";
import { genId } from "../utils/helpers";

const InvoiceForm = ({ invoice, onSave, onClose, isEdit }) => {
  const EMPTY_ITEM = { name: "", quantity: 1, price: 0, total: 0 };
  const EMPTY_FORM = {
    senderAddress: { street: "", city: "", postCode: "", country: "" },
    clientName: "",
    clientEmail: "",
    clientAddress: { street: "", city: "", postCode: "", country: "" },
    createdAt: today(),
    paymentTerms: 30,
    description: "",
    items: [{ ...EMPTY_ITEM }],
  };
  const [form, setForm] = useState(() => {
    if (invoice)
      return { ...invoice, items: invoice.items.map((i) => ({ ...i })) };
    return {
      ...EMPTY_FORM,
      senderAddress: { ...EMPTY_FORM.senderAddress },
      clientAddress: { ...EMPTY_FORM.clientAddress },
    };
  });
  const [errors, setErrors] = useState({});
  const firstRef = useRef();

  useEffect(() => {
    firstRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
  const setAddr = (who, field, val) =>
    setForm((f) => ({ ...f, [who]: { ...f[who], [field]: val } }));
  const setItem = (i, field, val) => {
    const items = form.items.map((item, idx) => {
      if (idx !== i) return item;
      const updated = { ...item, [field]: val };
      updated.total =
        (parseFloat(updated.quantity) || 0) * (parseFloat(updated.price) || 0);
      return updated;
    });
    setForm((f) => ({ ...f, items }));
  };
  const addItem = () =>
    setForm((f) => ({ ...f, items: [...f.items, { ...EMPTY_ITEM }] }));
  const removeItem = (i) =>
    setForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));

  const validate = () => {
    const e = {};
    if (!form.clientName.trim()) e.clientName = "Client name is required";
    if (!form.clientEmail.trim()) e.clientEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail))
      e.clientEmail = "Valid email required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.senderAddress.street.trim()) e["sender.street"] = "Required";
    if (!form.senderAddress.city.trim()) e["sender.city"] = "Required";
    if (!form.senderAddress.postCode.trim()) e["sender.postCode"] = "Required";
    if (!form.senderAddress.country.trim()) e["sender.country"] = "Required";
    if (!form.clientAddress.street.trim()) e["client.street"] = "Required";
    if (!form.clientAddress.city.trim()) e["client.city"] = "Required";
    if (!form.clientAddress.postCode.trim()) e["client.postCode"] = "Required";
    if (!form.clientAddress.country.trim()) e["client.country"] = "Required";
    if (form.items.length === 0) e.items = "At least one item required";
    form.items.forEach((item, i) => {
      if (!item.name.trim()) e[`item.${i}.name`] = "Required";
      if (!item.quantity || item.quantity <= 0)
        e[`item.${i}.qty`] = "Must be > 0";
      if (item.price < 0) e[`item.${i}.price`] = "Must be ≥ 0";
    });
    return e;
  };

  const handleSubmit = (status) => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    const total = calcTotal(form.items);
    const paymentDue = addDays(form.createdAt, parseInt(form.paymentTerms));
    onSave({
      ...form,
      id: invoice?.id || genId(),
      status: isEdit
        ? invoice.status === "draft"
          ? status
          : invoice.status
        : status,
      total,
      paymentDue,
      items: form.items.map((it) => ({
        ...it,
        total: (parseFloat(it.quantity) || 0) * (parseFloat(it.price) || 0),
      })),
    });
  };

  const Field = ({ label, error, children }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: error ? "#EC5757" : "var(--color-text-secondary)",
          }}
        >
          {label}
        </label>
        {error && (
          <span style={{ fontSize: 12, color: "#EC5757" }}>{error}</span>
        )}
      </div>
      {children}
    </div>
  );

  const inp = (val, onChange, err, type = "text", placeholder = "") => (
    <input
      type={type}
      value={val}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "var(--color-input-bg)",
        border: `1px solid ${err ? "#EC5757" : "var(--color-border)"}`,
        borderRadius: 4,
        padding: "12px 16px",
        color: "var(--color-text-primary)",
        fontSize: 12,
        fontWeight: 700,
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
      }}
    />
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 900,
        display: "flex",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
        }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit Invoice" : "New Invoice"}
        style={{
          position: "relative",
          background: "var(--color-form-bg)",
          width: "min(616px, 100%)",
          height: "100%",
          overflowY: "auto",
          padding: "56px 56px 32px",
          borderRadius: "0 20px 20px 0",
          zIndex: 1,
        }}
      >
        <h1
          ref={firstRef}
          tabIndex={-1}
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: "0 0 48px",
            outline: "none",
          }}
        >
          {isEdit ? (
            <>
              Edit{" "}
              <span style={{ color: "var(--color-text-secondary)" }}>#</span>
              {invoice.id}
            </>
          ) : (
            "New Invoice"
          )}
        </h1>

        <section style={{ marginBottom: 40 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#7C5DFA",
              margin: "0 0 24px",
            }}
          >
            Bill From
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Field label="Street Address" error={errors["sender.street"]}>
              {inp(
                form.senderAddress.street,
                (v) => setAddr("senderAddress", "street", v),
                errors["sender.street"],
              )}
            </Field>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 24,
              }}
            >
              <Field label="City" error={errors["sender.city"]}>
                {inp(
                  form.senderAddress.city,
                  (v) => setAddr("senderAddress", "city", v),
                  errors["sender.city"],
                )}
              </Field>
              <Field label="Post Code" error={errors["sender.postCode"]}>
                {inp(
                  form.senderAddress.postCode,
                  (v) => setAddr("senderAddress", "postCode", v),
                  errors["sender.postCode"],
                )}
              </Field>
              <Field label="Country" error={errors["sender.country"]}>
                {inp(
                  form.senderAddress.country,
                  (v) => setAddr("senderAddress", "country", v),
                  errors["sender.country"],
                )}
              </Field>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#7C5DFA",
              margin: "0 0 24px",
            }}
          >
            Bill To
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Field label="Client's Name" error={errors.clientName}>
              {inp(
                form.clientName,
                (v) => set("clientName", v),
                errors.clientName,
              )}
            </Field>
            <Field label="Client's Email" error={errors.clientEmail}>
              {inp(
                form.clientEmail,
                (v) => set("clientEmail", v),
                errors.clientEmail,
                "email",
                "e.g. email@example.com",
              )}
            </Field>
            <Field label="Street Address" error={errors["client.street"]}>
              {inp(
                form.clientAddress.street,
                (v) => setAddr("clientAddress", "street", v),
                errors["client.street"],
              )}
            </Field>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 24,
              }}
            >
              <Field label="City" error={errors["client.city"]}>
                {inp(
                  form.clientAddress.city,
                  (v) => setAddr("clientAddress", "city", v),
                  errors["client.city"],
                )}
              </Field>
              <Field label="Post Code" error={errors["client.postCode"]}>
                {inp(
                  form.clientAddress.postCode,
                  (v) => setAddr("clientAddress", "postCode", v),
                  errors["client.postCode"],
                )}
              </Field>
              <Field label="Country" error={errors["client.country"]}>
                {inp(
                  form.clientAddress.country,
                  (v) => setAddr("clientAddress", "country", v),
                  errors["client.country"],
                )}
              </Field>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              <Field label="Invoice Date">
                {inp(form.createdAt, (v) => set("createdAt", v), false, "date")}
              </Field>
              <Field label="Payment Terms">
                <select
                  value={form.paymentTerms}
                  onChange={(e) => set("paymentTerms", e.target.value)}
                  style={{
                    background: "var(--color-input-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 4,
                    padding: "12px 16px",
                    color: "var(--color-text-primary)",
                    fontSize: 12,
                    fontWeight: 700,
                    width: "100%",
                    outline: "none",
                  }}
                >
                  <option value={1}>Net 1 Day</option>
                  <option value={7}>Net 7 Days</option>
                  <option value={14}>Net 14 Days</option>
                  <option value={30}>Net 30 Days</option>
                </select>
              </Field>
            </div>
            <Field label="Project Description" error={errors.description}>
              {inp(
                form.description,
                (v) => set("description", v),
                errors.description,
                "text",
                "e.g. Graphic Design Service",
              )}
            </Field>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#777F98",
              margin: "0 0 24px",
            }}
          >
            Item List
          </p>
          {errors.items && (
            <p style={{ color: "#EC5757", fontSize: 12, marginBottom: 12 }}>
              {errors.items}
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {form.items.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 64px 100px 80px 24px",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                {["Item Name", "Qty.", "Price", "Total", ""].map((h) => (
                  <span
                    key={h}
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
            {form.items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 64px 100px 80px 24px",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <input
                  value={item.name}
                  onChange={(e) => setItem(i, "name", e.target.value)}
                  style={{
                    background: "var(--color-input-bg)",
                    border: `1px solid ${errors[`item.${i}.name`] ? "#EC5757" : "var(--color-border)"}`,
                    borderRadius: 4,
                    padding: "12px 16px",
                    color: "var(--color-text-primary)",
                    fontSize: 12,
                    fontWeight: 700,
                    outline: "none",
                  }}
                />
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => setItem(i, "quantity", e.target.value)}
                  style={{
                    background: "var(--color-input-bg)",
                    border: `1px solid ${errors[`item.${i}.qty`] ? "#EC5757" : "var(--color-border)"}`,
                    borderRadius: 4,
                    padding: "12px 8px",
                    color: "var(--color-text-primary)",
                    fontSize: 12,
                    fontWeight: 700,
                    outline: "none",
                    textAlign: "center",
                  }}
                />
                <input
                  type="number"
                  value={item.price}
                  min="0"
                  step="0.01"
                  onChange={(e) => setItem(i, "price", e.target.value)}
                  style={{
                    background: "var(--color-input-bg)",
                    border: `1px solid ${errors[`item.${i}.price`] ? "#EC5757" : "var(--color-border)"}`,
                    borderRadius: 4,
                    padding: "12px 16px",
                    color: "var(--color-text-primary)",
                    fontSize: 12,
                    fontWeight: 700,
                    outline: "none",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {formatCurrency(item.total)}
                </span>
                <button
                  onClick={() => removeItem(i)}
                  aria-label="Remove item"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    display: "flex",
                  }}
                >
                  <IconDelete />
                </button>
              </div>
            ))}
          </div>
          <button
            className="btn btn-add-item"
            onClick={addItem}
            style={{ width: "100%", marginTop: 16 }}
          >
            <IconPlus /> Add New Item
          </button>
        </section>

        {Object.keys(errors).length > 0 && (
          <p style={{ color: "#EC5757", fontSize: 12, marginBottom: 24 }}>
            — All fields must be added
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            paddingBottom: 16,
          }}
        >
          <button className="btn btn-secondary" onClick={onClose}>
            Discard
          </button>
          {(!isEdit || invoice?.status === "draft") && (
            <button
              className="btn btn-draft"
              onClick={() => handleSubmit("draft")}
            >
              {isEdit ? "Save Changes" : "Save as Draft"}
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={() =>
              handleSubmit(
                isEdit && invoice?.status !== "draft"
                  ? invoice.status
                  : "pending",
              )
            }
          >
            {isEdit ? "Save Changes" : "Save & Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
