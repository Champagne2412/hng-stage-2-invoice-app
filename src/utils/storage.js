const STORAGE_KEY = "invoice_app_data_v2";
const THEME_KEY = "invoice_app_theme";

const getSeedData = () => [
  {
    id: "RT3080", createdAt: "2021-08-18", paymentTerms: 1, paymentDue: "2021-08-19",
    description: "Re-branding", status: "paid",
    clientName: "Jensen Huang", clientEmail: "jensenh@mail.com",
    senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    clientAddress: { street: "106 Kendell Street", city: "Sharrington", postCode: "NR24 5WQ", country: "United Kingdom" },
    items: [{ name: "Brand Guidelines", quantity: 1, price: 1800.90, total: 1800.90 }],
    total: 1800.90
  },
  {
    id: "XM9141", createdAt: "2021-08-21", paymentTerms: 30, paymentDue: "2021-09-20",
    description: "Graphic Design", status: "pending",
    clientName: "Alex Grim", clientEmail: "alexgrim@mail.com",
    senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    clientAddress: { street: "84 Church Way", city: "Bradford", postCode: "BD1 9PB", country: "United Kingdom" },
    items: [
      { name: "Banner Design", quantity: 1, price: 156.00, total: 156.00 },
      { name: "Email Design", quantity: 2, price: 200.00, total: 400.00 }
    ],
    total: 556.00
  },
  {
    id: "RG0314", createdAt: "2021-09-24", paymentTerms: 7, paymentDue: "2021-10-01",
    description: "Website Redesign", status: "paid",
    clientName: "John Morrison", clientEmail: "jm@myco.com",
    senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    clientAddress: { street: "79 Dover Road", city: "Westhall", postCode: "IP19 3PF", country: "United Kingdom" },
    items: [{ name: "Website Redesign", quantity: 1, price: 14002.33, total: 14002.33 }],
    total: 14002.33
  },
  {
    id: "AA1449", createdAt: "2021-10-07", paymentTerms: 7, paymentDue: "2021-10-14",
    description: "Logo Re-design", status: "pending",
    clientName: "Alysa Werner", clientEmail: "alysa@email.co.uk",
    senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    clientAddress: { street: "63 Warwick Road", city: "Carlisle", postCode: "CA20 2TG", country: "United Kingdom" },
    items: [{ name: "Logo Redesign", quantity: 1, price: 102.04, total: 102.04 }],
    total: 102.04
  },
  {
    id: "TY9141", createdAt: "2021-10-01", paymentTerms: 30, paymentDue: "2021-10-31",
    description: "Landing Page Design", status: "draft",
    clientName: "Mellisa Clarke", clientEmail: "mellisa@email.co.uk",
    senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    clientAddress: { street: "46 Abbey Row", city: "Cambridge", postCode: "CB5 6EG", country: "United Kingdom" },
    items: [
      { name: "New Logo", quantity: 1, price: 1532.33, total: 1532.33 },
      { name: "New Landing Page", quantity: 1, price: 2500.00, total: 2500.00 }
    ],
    total: 4032.33
  }
];

export const loadInvoices = () => {
  try {
    const raw = localStorage.getItem("invoice_app_data_v2");
    return raw ? JSON.parse(raw) : getSeedData();
  } catch { return getSeedData(); }
};

export const saveInvoices = (invoices) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices)); } catch {}
};