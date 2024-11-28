"use server";

import { auth } from "@/lib/auth";
import { nylas } from "@/lib/nylas";
import prisma from "@/lib/prisma";

export const getTotalEvents = async () => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const totalEventsCount = await prisma.eventType.count({
    where: {
      userId: session.user.id,
    },
  });

  const totalActiveEventsCount = await prisma.eventType.count({
    where: {
      userId: session.user.id,
      isActive: true,
    },
  });

  return {
    totalEventsCount,
    totalActiveEventsCount,
  };
};

export const getTotalMeetings = async () => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return {
    totalMeetingsCount: data.data.length,
  };
};
