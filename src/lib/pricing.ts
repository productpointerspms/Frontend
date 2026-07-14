export type Currency = {
  code: string;
  symbol: string;
  /** ISO country code for the flag image */
  country: string;
  /** NGN per 1 unit of this currency */
  rate: number;
};

export const currencies: Currency[] = [
  { code: "NGN", symbol: "₦", country: "ng", rate: 1 },
  { code: "USD", symbol: "$", country: "us", rate: 1600 },
  { code: "GBP", symbol: "£", country: "gb", rate: 2000 },
  { code: "EUR", symbol: "€", country: "eu", rate: 1750 },
  { code: "GHS", symbol: "₵", country: "gh", rate: 110 },
  { code: "KES", symbol: "KSh ", country: "ke", rate: 12 },
  { code: "ZAR", symbol: "R", country: "za", rate: 88 },
  { code: "CAD", symbol: "C$", country: "ca", rate: 1150 },
];

// Base prices in NGN
export const PROGRAM_FEE_NGN = 100000;
export const ORIGINAL_FEE_NGN = 150000;
export const SAVINGS_NGN = ORIGINAL_FEE_NGN - PROGRAM_FEE_NGN;

/** Resolve a currency by its code, falling back to NGN. */
export const getCurrency = (code?: string | null): Currency =>
  currencies.find((c) => c.code === code) ?? currencies[0];

/** Convert an NGN amount into the target currency (rounded). */
export const convert = (ngnAmount: number, currency: Currency): number =>
  Math.round(ngnAmount / currency.rate);

/** Format an NGN amount as a localized string in the target currency. */
export const format = (ngnAmount: number, currency: Currency): string =>
  `${currency.symbol}${convert(ngnAmount, currency).toLocaleString()}`;
