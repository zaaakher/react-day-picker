'use client';
import { DayPicker, DayPickerProps } from 'react-day-picker';

export function Keyboard(props: DayPickerProps) {
  return <DayPicker {...props} today={new Date(2022, 5, 10)} />;
}