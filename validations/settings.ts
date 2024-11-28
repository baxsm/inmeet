import { z } from "zod";

export const settingsSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, "Name is too short")
    .max(50),
  profileImage: z.string().max(300),
});

export type SettingsSchemaType = z.infer<typeof settingsSchema>;
