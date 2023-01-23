/**
 * Format a number to a compact notation if it's more than 1000.
 * Ex: 100000 will become 100K
 * Ex: 123456 will become 123.46K (2 fraction digits)
 * Ex: 102397 will become 102.4K
 */
export const compactNumberFormatterWithFractionDigit = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 2
})
