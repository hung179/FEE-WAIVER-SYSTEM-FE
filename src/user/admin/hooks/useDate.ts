import { getDaysInMonth } from 'date-fns';

const generateRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const months = generateRange(1, 12);
export const years = generateRange(1800, new Date().getFullYear());

export const getDays = (year: number, month: number) => {
  return Array.from(
    { length: getDaysInMonth(new Date(year, month)) },
    (_, i) => i + 1,
  );
};
