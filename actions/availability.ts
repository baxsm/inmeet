"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  availabilitySchema,
  AvailabilitySchemaType,
} from "@/validations/availability";
import { Availability } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const getAvailabilities = async () => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  return prisma.availability.findMany({
    where: {
      userId: session.user.id,
    },
  });
};

export const updateAvailabilities = async (form: AvailabilitySchemaType) => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const { success, data } = availabilitySchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  await prisma
    .$transaction(async (prisma) => {
      const availabilityPromises = data.availabilities.map((availability) => {
        return prisma.availability.update({
          where: {
            id: availability.availabilityId,
            day: availability.day as Availability["day"],
            userId: session.user?.id,
          },
          data: {
            fromTime: availability.fromTime,
            toTime: availability.toTime,
            isActive: availability.isActive,
          },
        });
      });

      await Promise.all(availabilityPromises);
    })
    .catch((err: PrismaClientKnownRequestError) => {
      console.error("Transaction failed: ", err.message);
      throw new Error("Failed to update availabilities");
    });

  revalidatePath("/dashboard/availability");
};
