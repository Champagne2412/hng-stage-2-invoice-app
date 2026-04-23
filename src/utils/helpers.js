export const genId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const l =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)];
  const n = String(Math.floor(Math.random() * 9000) + 1000);
  return l + n;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const addDays = (dateStr, days) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

export const today = () => new Date().toISOString().split("T")[0];

export const calcTotal = (items) =>
  items.reduce(
    (sum, i) =>
      sum + (parseFloat(i.quantity) || 0) * (parseFloat(i.price) || 0),
    0,
  );

export const formatCurrency = (n) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    n || 0,
  );
