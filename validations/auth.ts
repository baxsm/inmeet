import { z } from "zod";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 30;

export const signUpSchema = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: z
      .string({ message: "Password is required" })
      .min(
        PASSWORD_MIN,
        `Password must be more than ${PASSWORD_MIN} characters`
      )
      .max(
        PASSWORD_MAX,
        `Password must be less than ${PASSWORD_MAX} characters`
      ),
    confirmPassword: z
      .string({ message: "Password is required" })
      .min(
        PASSWORD_MIN,
        `Password must be more than ${PASSWORD_MIN} characters`
      )
      .max(
        PASSWORD_MAX,
        `Password must be less than ${PASSWORD_MAX} characters`
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const signinSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ message: "Password is required" })
    .min(PASSWORD_MIN, `Password must be more than ${PASSWORD_MIN} characters`)
    .max(PASSWORD_MAX, `Password must be less than ${PASSWORD_MAX} characters`),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;

export const onboardingSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, "Name is too short")
    .max(50),
  username: z
    .string({ message: "Username is required" })
    .min(3, "Username is too short")
    .max(20, "Username is too long")
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username can only contain letters, numbers and -",
    }),
});

export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;
