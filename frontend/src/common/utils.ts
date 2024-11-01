import { DateTime } from "luxon";

export const COLORS = {
  positive: "#ef2d21",
  negative: "#4881ff",
};

// ex. 1일 전
export const stringToRelativeDate = (date: string) => {
  return DateTime.fromISO(date).toRelative();
};
