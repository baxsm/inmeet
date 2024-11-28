import { z } from "zod";

export const availabilitySchema = z.object({
  availabilities: z.array(
    z.object({
      availabilityId: z.string(),
      day: z.string(),
      toTime: z.string(),
      fromTime: z.string(),
      isActive: z.boolean(),
    })
  ),
});

export type AvailabilitySchemaType = z.infer<typeof availabilitySchema>;
