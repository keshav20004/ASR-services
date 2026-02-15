// Currency definitions with symbols and labels
export const CURRENCIES = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
];

export function getCurrencySymbol(code) {
    const currency = CURRENCIES.find((c) => c.code === code);
    return currency ? currency.symbol : code;
}

export function formatSalary(amount, currencyCode) {
    const symbol = getCurrencySymbol(currencyCode || 'INR');
    if (amount >= 100000) {
        return `${symbol}${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
        return `${symbol}${(amount / 1000).toFixed(0)}K`;
    }
    return `${symbol}${amount}`;
}

export function formatSalaryRange(min, max, currencyCode) {
    const symbol = getCurrencySymbol(currencyCode || 'INR');
    const formatAmt = (amt) => {
        if (amt >= 100000) return `${(amt / 100000).toFixed(1)}L`;
        if (amt >= 1000) return `${(amt / 1000).toFixed(0)}K`;
        return `${amt}`;
    };
    return `${symbol}${formatAmt(min)} – ${symbol}${formatAmt(max)}`;
}
