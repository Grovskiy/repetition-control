export const getDayMonth = (dateString:Date):string => {
  const date:Date = new Date(dateString);

  return `${date.getDate()}/${date.getMonth() + 1}`
};
