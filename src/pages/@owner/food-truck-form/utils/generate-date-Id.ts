export const generateDateId = () => {
  const currentDate = new Date();
  return `date_${currentDate}`;
};
