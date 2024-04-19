import { WeekNumberLabel } from '../../../types/labels';

/** The default ARIA label for the WeekNumber element. */
export const labelWeekNumber: WeekNumberLabel = (n): string => {
  return `Week n. ${n}`;
};
