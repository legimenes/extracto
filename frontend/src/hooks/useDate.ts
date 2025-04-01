import { format as formatDateFns } from "date-fns";

export function useDate() {
  const formatDate = (date: Date, pattern: string): string => formatDateFns(date, pattern);
  return { formatDate };
}