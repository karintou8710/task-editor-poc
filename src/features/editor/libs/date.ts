export const initTime = (date: Date) => {
  date.setHours(0, 0, 0, 0);
};

export const isToday = (date: Date) => {
  const today = new Date();
  initTime(date);
  initTime(today);
  return date.toDateString() === today.toDateString();
};

export const isBeforeDay = (date: Date) => {
  const today = new Date();
  initTime(date);
  initTime(today);
  return date < today;
};
