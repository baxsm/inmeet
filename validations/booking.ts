import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email().max(50),
  username: z.string().max(300),
  fromTime: z.string().max(300),
  eventDate: z.string().max(300),
  meetingLength: z.number(),
  provider: z.string().max(300),
  eventTypeId: z.string().max(300),
});

export type BookingSchemaType = z.infer<typeof bookingSchema>;
