interface FormatCurrency {
  symbol: string;
  formattedValue: string;
}

export function formatCurrency(value?: number, currency?: string): FormatCurrency {
  if (!value && !currency) {
    return { symbol: "", formattedValue: "" };
  }

  const formatter = new Intl.NumberFormat(currency, {
    style: "currency",
    currency
  });

  const parts = formatter.formatToParts(value);
  const symbol = parts.find((part) => part.type === "currency")?.value || "";
  const formattedValue = parts
    .filter((part) => part.type !== "currency")
    .map((part) => part.value)
    .join("");

  return { symbol, formattedValue };
}
