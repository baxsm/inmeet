import { FC } from "react";
import CalendarCell from "./calendar-cell";
import { CalendarState } from "react-stately";
import {
  AriaCalendarGridProps,
  DateValue,
  useCalendarGrid,
  useLocale,
} from "react-aria";
import {
  DateDuration,
  endOfMonth,
  getWeeksInMonth,
} from "@internationalized/date";

interface CalendarGridProps extends AriaCalendarGridProps {
  state: CalendarState;
  offset?: DateDuration;
  isDateUnavailable?: (date: DateValue) => boolean;
}

const CalendarGrid: FC<CalendarGridProps> = ({
  state,
  offset = {},
  isDateUnavailable,
}) => {
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);

  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
      weekdayStyle: "short",
    },
    state
  );

  const weeksInMonth = getWeeksInMonth(startDate, locale);

  return (
    <table {...gridProps} cellPadding={0} className="flex-1">
      <thead {...headerProps} className="text-sm font-medium">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    currentMonth={startDate}
                    isUnavailable={isDateUnavailable?.(date)}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalendarGrid;
