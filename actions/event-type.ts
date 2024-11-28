"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  addEventTypeSchema,
  AddEventTypeSchemaType,
  editEventTypeSchema,
  EditEventTypeSchemaType,
} from "@/validations/event-type";
import { VideoCallSoftware } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getUsername = async () => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const data = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      username: true,
    },
  });

  if (!data) {
    throw new Error("User not found");
  }

  return data.username;
};

export const getEventTypes = async () => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  return prisma.eventType.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const createEventType = async (form: AddEventTypeSchemaType) => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const { success, data } = addEventTypeSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  await prisma.eventType.create({
    data: {
      title: data.title,
      description: data.description,
      duration: data.duration,
      url: data.url,
      videoCallSoftware: data.videoCallSoftware as VideoCallSoftware,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/event-types")
};

export const editEventType = async (form: EditEventTypeSchemaType) => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const { success, data } = editEventTypeSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  await prisma.eventType.update({
    where: {
      id: data.eventTypeId,
      userId: session.user.id,
    },
    data: {
      description: data.description,
      duration: data.duration,
      title: data.title,
      videoCallSoftware: data.videoCallSoftware as VideoCallSoftware,
    },
  });

  revalidatePath("/dashboard/event-types");
};

export const deleteEventType = async (eventTypeId: string) => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.eventType.delete({
    where: {
      id: eventTypeId,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/event-types");
};

export const updateEventTypeIsActive = async ({
  isActive,
  eventTypeId,
}: {
  isActive: boolean;
  eventTypeId: string;
}) => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.eventType.update({
    where: {
      id: eventTypeId,
      userId: session.user.id,
    },
    data: {
      isActive: isActive,
    },
  });

  revalidatePath("/dashboard/event-types");
};
