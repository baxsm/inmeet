"use client";

import { FC, useEffect, useState } from "react";
import Calendar from "./calendar";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { Day } from "@prisma/client";
import { DateValue } from "react-aria";
import { useRouter, useSearchParams } from "next/navigation";

interface RenderCalendarProps {
  availabilities: {
    day: Day;
    isActive: boolean;
  }[];
}

const RenderCalendar: FC<RenderCalendarProps> = ({ availabilities }) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [date, setDate] = useState(() => {
    const dateParam = searchParams.get("date");

    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  });

  useEffect(() => {
    setDate(() => {
      const dateParam = searchParams.get("date");

      return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
    });
  }, [searchParams]);

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();

    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    return !availabilities[adjustedIndex].isActive;
  };

  const handleDateChange = (date: DateValue) => {
    setDate(date as CalendarDate);

    const url = new URL(window.location.href);

    url.searchParams.set("date", date.toString());
    router.push(url.toString());
  };

  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      value={date}
      onChange={handleDateChange}
    />
  );
};

export default RenderCalendar;
