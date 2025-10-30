export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return '';
  const numbersOnly = phoneNumber.replace(/\D/g, '');

  if (numbersOnly.length <= 3) {
    return numbersOnly;
  } else if (numbersOnly.length <= 8) {
    return numbersOnly.slice(0, 3) + '-' + numbersOnly.slice(3);
  } else {
    return (
      numbersOnly.slice(0, 3) +
      '-' +
      numbersOnly.slice(3, 7) +
      '-' +
      numbersOnly.slice(7)
    );
  }
};
