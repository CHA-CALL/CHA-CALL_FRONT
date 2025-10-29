export const formatPrice = (price: string) => {
  if (price === null || price === undefined) {
    return '';
  }

  const numbersOnly = String(price).replace(/[^\d]/g, '');
  const formattedPrice = numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedPrice;
};
