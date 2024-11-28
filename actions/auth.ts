"use server";

import { auth, signIn } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  onboardingSchema,
  OnboardingSchemaType,
  signinSchema,
  SigninSchemaType,
  signUpSchema,
  SignUpSchemaType,
} from "@/validations/auth";

export const onboardingUser = async (values: OnboardingSchemaType) => {
  const session = await auth();

  if (!session || !session?.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const { success, data } = onboardingSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const isExist = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (isExist) {
    throw new Error("Username is already taken");
  }

  const dbUser = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: data.name,
      username: data.username,
      availabilities: {
        createMany: {
          data: [
            {
              day: "Monday",
              fromTime: "08:00",
              toTime: "18:00",
            },
            {
              day: "Tuesday",
              fromTime: "08:00",
              toTime: "18:00",
            },
            {
              day: "Wednesday",
              fromTime: "08:00",
              toTime: "18:00",
            },
            {
              day: "Thursday",
              fromTime: "08:00",
              toTime: "18:00",
            },
            {
              day: "Friday",
              fromTime: "08:00",
              toTime: "14:00",
            },
            {
              day: "Saturday",
              fromTime: "08:00",
              toTime: "12:00",
            },
            {
              day: "Sunday",
              fromTime: "08:00",
              toTime: "12:00",
            },
          ],
        },
      },
    },
  });

  return {
    name: dbUser.name,
  };
};

export const signInAction = async (values: SigninSchemaType) => {
  const { success, data } = signinSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  await signIn("sign-in", data);
};

export const signUpAction = async (values: SignUpSchemaType) => {
  const { success, data } = signUpSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  await signIn("sign-up", data);
};
