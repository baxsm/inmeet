import { cn } from "@/lib/utils";
import {
  CalendarDate,
  getLocalTimeZone,
  isSameMonth,
  isToday,
} from "@internationalized/date";
import { FC, useRef } from "react";
import {
  mergeProps,
  useCalendarCell,
  useFocusRing,
} from "react-aria";
import { CalendarState } from "react-stately";

interface CalendarCellProps {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean;
}

const CalendarCell: FC<CalendarCellProps> = ({
  state,
  date,
  currentMonth,
  isUnavailable,
}) => {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  const { focusProps, isFocusVisible } = useFocusRing();

  const isDateToday = isToday(date, getLocalTimeZone());

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  const isFinalDisabled = isDisabled || isUnavailable;

  return (
    <td
      {...cellProps}
      className={cn("py-0.5 px-0.5 relative z-0", {
        "z-10": isFocusVisible,
      })}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className="size-10 sm:size-12 outline-none group rounded-md"
      >
        <div
          className={cn(
            "w-full h-full rounded-sm flex gap-1 items-center justify-center text-sm font-semibold",
            {
              "bg-primary text-primary-foreground": isSelected,
              "text-muted-foreground cursor-not-allowed": isFinalDisabled,
              "hover:bg-primary/10 bg-secondary":
                !isSelected && !isFinalDisabled,
            }
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                "absolute bottom-1.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full",
                {
                  "bg-white": isSelected,
                }
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
};

export default CalendarCell;
