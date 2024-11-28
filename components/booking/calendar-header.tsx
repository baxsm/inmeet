import { FC } from "react";
import { CalendarState } from "react-stately";
import {
  AriaButtonProps,
  useDateFormatter,
  VisuallyHidden,
  FocusableAria,
} from "react-aria";
import CalendarButton from "./calendar-button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  state: CalendarState;
  calendarProps: FocusableAria["focusableProps"];
  nextButtonProps: AriaButtonProps<"button">;
  prevButtonProps: AriaButtonProps<"button">;
}

const CalendarHeader: FC<CalendarHeaderProps> = ({
  calendarProps,
  nextButtonProps,
  prevButtonProps,
  state,
}) => {
  const monthDateFormatter = useDateFormatter({
    month: "short",
    year: "numeric",
    timeZone: state.timeZone,
  });

  const visibleStartDate = state.visibleRange.start.toDate(state.timeZone);
  const formattedParts = monthDateFormatter.formatToParts(visibleStartDate);
  const monthName =
    formattedParts.find((part) => part.type === "month")?.value || "";
  const year = formattedParts.find((part) => part.type === "year")?.value || "";

  return (
    <div className="flex items-center pb-4">
      <VisuallyHidden>
        <h2>{calendarProps["aria-label"]}</h2>
      </VisuallyHidden>

      <h2 className="font-semibold flex-1">
        {monthName}.{" "}
        <span className="text-sm text-muted-foreground font-medium">
          {year}
        </span>
      </h2>

      <div className="flex items-center gap-2">
        <CalendarButton {...prevButtonProps}>
          <ChevronLeft className="w-4 h-4" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRight className="w-4 h-4" />
        </CalendarButton>
      </div>
    </div>
  );
};

export default CalendarHeader;
