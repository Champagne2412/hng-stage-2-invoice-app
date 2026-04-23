const STORAGE_KEY = "invoice_app_data_v2";
const THEME_KEY = "invoice_app_theme";

export const loadInvoices = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveInvoices = (invoices) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  } catch {}
};

export { STORAGE_KEY, THEME_KEY };