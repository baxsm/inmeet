"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { settingsSchema, SettingsSchemaType } from "@/validations/settings";
import { revalidatePath } from "next/cache";

export const updateUserSettings = async (values: SettingsSchemaType) => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const { success, data } = settingsSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: data.name,
      image: data.profileImage,
    },
  });

  revalidatePath("/dashboard/settings");
};
