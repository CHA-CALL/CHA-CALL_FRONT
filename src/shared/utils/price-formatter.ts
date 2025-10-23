export const formatPrice = (price: string) => {
  const numbersOnly = price.replace(/[^\d]/g, '');
  const formattedPrice = numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedPrice;
};
