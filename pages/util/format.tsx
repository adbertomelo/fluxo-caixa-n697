export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const { format: formatDecimal } = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


