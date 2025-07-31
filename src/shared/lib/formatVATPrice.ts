import formatLocalPrice from './formatLocalPrice';

const formatVATPrice = (num: number) => {
  return `${formatLocalPrice(num)}(VAT 별도)`;
};

export default formatVATPrice;
