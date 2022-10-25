export const getDayMonth = (dateString: number):string => {
  const date:Date = new Date(dateString);

  return `${date.getDate()}/${date.getMonth() + 1}`
};
