"use server";

import { auth } from "@/lib/auth";
import { nylas } from "@/lib/nylas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getMeetings = async () => {
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

  return data;
};

export const cancelMeeting = async (eventId: string) => {
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

  await nylas.events.destroy({
    eventId: eventId,
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  revalidatePath("/dashboard/meetings");
};
