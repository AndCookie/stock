import { DateTime } from "luxon";

export const COLORS = {
  positive: "#FF4F4F",
  negative: "#4881FF",
  neutral: "#888888",
};

// ex. 1일 전
export const stringToRelativeDate = (date: string) => {
  return DateTime.fromISO(date).toRelative();
};
