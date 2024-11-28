"use client";

import { FC } from "react";
import { useLocale, useCalendar, CalendarProps, DateValue } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import CalendarHeader from "./calendar-header";
import CalendarGrid from "./calendar-grid";

interface Props extends CalendarProps<DateValue> {
  isDateUnavailable?: (date: DateValue) => boolean;
}

const Calendar: FC<Props> = (props) => {
  const { locale } = useLocale();

  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
    visibleDuration: {
      months: 1,
    },
  });

  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} className="inline-block">
      <CalendarHeader
        calendarProps={calendarProps}
        nextButtonProps={nextButtonProps}
        prevButtonProps={prevButtonProps}
        state={state}
      />

      <div className="flex gap-8">
        <CalendarGrid
          state={state}
          isDateUnavailable={props.isDateUnavailable}
        />
      </div>
    </div>
  );
};

export default Calendar;
