import {
  DateInput,
  diffDays,
  format,
  isAfter,
  isBefore,
  sameDay,
} from "@formkit/tempo";

// 時間情報がない日付情報を取得
export const getTodayDate = () => {
  return format(new Date(), "YYYY-MM-DD");
};

export function isToday(date: DateInput) {
  return sameDay(date, getTodayDate());
}

export function isTomorrow(date: DateInput) {
  return isAfter(date, getTodayDate()) && diffDays(date, getTodayDate()) === 1;
}

export function isTowDaysAgo(date: DateInput) {
  return isAfter(date, getTodayDate()) && diffDays(date, getTodayDate()) === 2;
}

export function isInOneWeek(date: DateInput) {
  return isAfter(date, getTodayDate()) && diffDays(date, getTodayDate()) <= 7;
}

export function isBeforeDay(date: DateInput) {
  return isBefore(date, getTodayDate());
}

export function getDiffDays(date: DateInput) {
  return diffDays(date, getTodayDate());
}
