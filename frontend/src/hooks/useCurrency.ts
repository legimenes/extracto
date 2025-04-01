export function useCurrency() {
  const formatCurrency = (amount: number, currency: string = 'BRL', locale: string = 'pt-BR'): string =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);

  return { formatCurrency };
}