"use server";

import { getMappedVideoCallSoftware } from "@/constants/event-type";
import { nylas } from "@/lib/nylas";
import prisma from "@/lib/prisma";
import { bookingSchema, BookingSchemaType } from "@/validations/booking";
import { Day, VideoCallSoftware } from "@prisma/client";
import { format } from "date-fns";

export const getEventTypeData = async (username: string, url: string) => {
  return prisma.eventType.findFirst({
    where: {
      url,
      User: {
        username,
      },
      isActive: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availabilities: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });
};

export const getTimeTableData = async (
  username: string,
  selectedDate: Date
) => {
  const currentDay = format(selectedDate, "EEEE");

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Day,
      User: {
        username: username,
      },
    },
    select: {
      fromTime: true,
      toTime: true,
      id: true,
      User: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });

  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.User?.grantId as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.User?.grantEmail as string],
    },
  });

  return {
    data,
    nylasCalendarData,
  };
};

export const createBooking = async (form: BookingSchemaType) => {
  const { success, data } = bookingSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const userData = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: data.eventTypeId,
    },
    select: {
      title: true,
      description: true,
    },
  });

  const startDateTime = new Date(`${data.eventDate}T${data.fromTime}:00`);

  const endDateTime = new Date(
    startDateTime.getTime() + data.meetingLength * 60000
  );

  await nylas.events.create({
    identifier: userData.grantId as string,
    requestBody: {
      title: eventTypeData?.title,
      description: eventTypeData?.description,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000),
      },
      conferencing: {
        autocreate: {},
        provider: getMappedVideoCallSoftware(
          data.provider as VideoCallSoftware
        ),
      },
      participants: [
        {
          name: data.name,
          email: data.email,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: userData.grantEmail as string,
      notifyParticipants: true,
    },
  });
};
