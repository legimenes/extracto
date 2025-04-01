export class Currency1 {
  static format(amount: number, currency: string = 'BRL', locale: string = 'pt-BR'): string {
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
  }
};