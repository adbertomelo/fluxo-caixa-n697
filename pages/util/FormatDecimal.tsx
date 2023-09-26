

const { format: formatDecimal } = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const FormatDecimal = (valor: number) => {
  return (
    <div>
      <p>{formatDecimal(valor)}</p>
    </div>
  );
};

export default FormatDecimal;