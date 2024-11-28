import { z } from "zod";

export const addEventTypeSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(15).max(500),
  duration: z.number().min(15).max(150),
  url: z.string().min(3).max(150),
  videoCallSoftware: z.string().min(3).max(300),
});

export type AddEventTypeSchemaType = z.infer<typeof addEventTypeSchema>;

export const editEventTypeSchema = addEventTypeSchema.extend({
  eventTypeId: z.string(),
});

export type EditEventTypeSchemaType = z.infer<typeof editEventTypeSchema>;
