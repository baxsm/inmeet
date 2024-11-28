import { FC } from "react";
import {
  addMinutes,
  format,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import { getTimeTableData } from "@/actions/booking";
import { notFound } from "next/navigation";
import { GetFreeBusyResponse, NylasResponse } from "nylas";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface TimeTableProps {
  selectedDate: Date;
  username: string;
  duration: number;
}

const calculateAvailableTimeSlots = (
  date: string,
  dbAvailability: {
    fromTime: string | undefined;
    toTime: string | undefined;
  },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  duration: number
) => {
  const now = new Date();

  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  const availableTo = parse(
    `${date} ${dbAvailability.toTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  const busySlots =
    // @ts-expect-error valid
    nylasData.data[0]?.timeSlots?.map((slot) => ({
      start: fromUnixTime(slot.startTime),
      end: fromUnixTime(slot.endTime),
    })) || [];

  const allSlots = [];
  let currentSlot = availableFrom;

  while (isBefore(currentSlot, availableTo)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }

  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);
    return (
      isAfter(slot, now) &&
      !busySlots.some(
        (busy: { start: Date; end: Date }) =>
          (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
          (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) ||
          (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
      )
    );
  });

  return freeSlots.map((slot) => format(slot, "HH:mm"));
};

const TimeTable: FC<TimeTableProps> = async ({
  selectedDate,
  username,
  duration,
}) => {
  const { data, nylasCalendarData } = await getTimeTableData(
    username,
    selectedDate
  );

  if (!data) {
    notFound();
  }

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const dbAvailability = {
    fromTime: data.fromTime,
    toTime: data.toTime,
  };

  const availableSlots = calculateAvailableTimeSlots(
    formattedDate,
    dbAvailability,
    nylasCalendarData,
    duration
  );

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>

      <div className="mt-2 max-h-[350px] flex flex-col gap-2 overflow-y-auto">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Link
              href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
              key={index}
              className={buttonVariants({ variant: "outline" })}
            >
              {slot}
            </Link>
          ))
        ) : (
          <p>No time slots available</p>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
