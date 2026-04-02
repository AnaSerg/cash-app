const ruMoney = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

export function formatNumberWithSpace(n: number): string {
    if (!Number.isFinite(n)) return "—";
    return ruMoney.format(n);
}

export function parseAmountInput(raw: string): number {
    const t = raw.trim().replace(/\s/g, "").replace(",", ".");
    if (!t) return NaN;
    return Number(t);
}
