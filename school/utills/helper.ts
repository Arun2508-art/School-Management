export const getDateAndYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const day = today.getDate();
  const formattedDate = `${year}/${day}`;
  return formattedDate;
};
