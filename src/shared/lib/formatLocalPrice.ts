function formatLocalPrice(amount: number | string): string {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (Number.isNaN(value)) return '0';
  return value.toLocaleString('ko-KR');
}

export default formatLocalPrice;
