export const formatAccountNumber = (accountNumber: string) => {
  if (!accountNumber) return '';
  const numbersOnly = accountNumber.replace(/\D/g, '');

  if (numbersOnly.length <= 4) {
    return numbersOnly;
  } else if (numbersOnly.length <= 8) {
    return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4)}`;
  } else {
    return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4, 8)}-${numbersOnly.slice(8)}`;
  }
};
