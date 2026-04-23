import React from "react";
import { useState, useEffect } from "react";

import "./styles/Global.css";
import InvoiceForm from "./Components/InvoiceForm";
import InvoiceDetail from "./Components/InvoiceDetail";
import ConfirmModal from "./Components/ConfirmModal";
import EmptyState from "./Components/EmptyState";

import { loadInvoices, saveInvoices } from "./utils/storage";
import { SEED } from "./data/Seed";
import IconLogo from "./Components/icons/IconLogo";
import IconMoon from "./Components/icons/IconMoon";
import IconChevronDown from "./Components/icons/IconChevronDown";
import IconChevronRight from "./Components/icons/IconChevronRight";
import IconPlus from "./Components/icons/IconPlus";
import IconSun from "./Components/icons/IconSun";
import {
  formatDate,
  formatCurrency,
  calcTotal,
  addDays,
  genId,
  today,
} from "./utils/helpers";
import StatusBadge from "./Components/StatusBadge";

const App = () => {
  const STORAGE_KEY = "invoice_app_data_v2";
  const THEME_KEY = "invoice_app_theme";

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem(THEME_KEY) === "dark",
  );
  const [invoices, setInvoices] = useState(loadInvoices);
  const [filter, setFilter] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState("list"); // "list" | "detail"
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);
  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const filtered =
    filter.length === 0
      ? invoices
      : invoices.filter((i) => filter.includes(i.status));
  const selected = invoices.find((i) => i.id === selectedId);

  const handleSave = (inv) => {
    setInvoices((prev) => {
      const exists = prev.find((i) => i.id === inv.id);
      if (exists) return prev.map((i) => (i.id === inv.id ? inv : i));
      return [...prev, inv];
    });
    setShowForm(false);
    setEditInvoice(null);
  };

  const handleDelete = () => {
    setInvoices((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
    setView("list");
    setSelectedId(null);
  };

  const handleMarkPaid = () => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === selectedId ? { ...i, status: "paid" } : i)),
    );
  };

  const toggleFilter = (status) => {
    setFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  return (
    <>
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar" aria-label="Navigation">
          <div className="sidebar-logo" aria-label="Invoice App">
            <IconLogo />
          </div>
          <div className="sidebar-bottom">
            <button
              className="theme-btn"
              onClick={() => setIsDark((d) => !d)}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? <IconSun /> : <IconMoon />}
            </button>
            <div style={{ width: "100%", height: 1, background: "#494E6E" }} />
            <div className="avatar" aria-label="User profile">
              AB
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="main-content">
          {view === "list" ? (
            <div className="content-area">
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 40,
                }}
              >
                <div>
                  <h1
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      marginBottom: 4,
                    }}
                  >
                    Invoices
                  </h1>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {filtered.length === 0
                      ? "No invoices"
                      : `${filtered.length} invoice${filtered.length > 1 ? "s" : ""}`}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  {/* Filter */}
                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() => setFilterOpen((o) => !o)}
                      aria-expanded={filterOpen}
                      aria-haspopup="listbox"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        color: "var(--color-text-primary)",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      <span>
                        Filter{window.innerWidth > 600 ? " by status" : ""}
                      </span>
                      <IconChevronDown up={filterOpen} />
                    </button>
                    {filterOpen && (
                      <div className="filter-dropdown" role="listbox">
                        {["draft", "pending", "paid"].map((s) => (
                          <label
                            key={s}
                            className="filter-option"
                            style={{ textTransform: "capitalize" }}
                          >
                            <input
                              type="checkbox"
                              checked={filter.includes(s)}
                              onChange={() => toggleFilter(s)}
                            />
                            {s}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {filterOpen && (
                    <div
                      style={{ position: "fixed", inset: 0, zIndex: 50 }}
                      onClick={() => setFilterOpen(false)}
                    />
                  )}
                  {/* New Invoice */}
                  <button
                    className="btn-new"
                    onClick={() => {
                      setEditInvoice(null);
                      setShowForm(true);
                    }}
                    aria-label="Create new invoice"
                  >
                    <span className="btn-new-icon">
                      <IconPlus />
                    </span>
                    New{window.innerWidth > 600 ? " Invoice" : ""}
                  </button>
                </div>
              </div>

              {/* Invoice List */}
              {filtered.length === 0 ? (
                <EmptyState />
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {filtered.map((inv) => (
                    <div
                      key={inv.id}
                      className="invoice-row"
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSelectedId(inv.id);
                        setView("detail");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedId(inv.id);
                          setView("detail");
                        }
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        <span style={{ color: "#7E88C3" }}>#</span>
                        {inv.id}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        Due {formatDate(inv.paymentDue)}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {inv.clientName}
                      </span>
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {formatCurrency(inv.total)}
                      </span>
                      <StatusBadge status={inv.status} />
                      <span className="chevron">
                        <IconChevronRight />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            selected && (
              <InvoiceDetail
                invoice={selected}
                onBack={() => setView("list")}
                onEdit={() => {
                  setEditInvoice(selected);
                  setShowForm(true);
                }}
                onDelete={() => setDeleteTarget(selected)}
                onMarkPaid={handleMarkPaid}
              />
            )
          )}
        </main>
      </div>

      {/* Form Overlay */}
      {showForm && (
        <InvoiceForm
          invoice={editInvoice}
          isEdit={!!editInvoice}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditInvoice(null);
          }}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <ConfirmModal
          invoice={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
};

export default App;
