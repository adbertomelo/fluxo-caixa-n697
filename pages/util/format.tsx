

const { format: formatDecimal } = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default formatDecimal;