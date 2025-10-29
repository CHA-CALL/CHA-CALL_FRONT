export const formatPrice = (price: number | null | undefined) => {
  const numbersOnly = String(price).replace(/[^\d]/g, '');
  const formattedPrice = numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedPrice;
};
