"use client";

import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { bookingSchema, BookingSchemaType } from "@/validations/booking";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/actions/booking";
import { toast } from "sonner";
import { VideoCallSoftware } from "@prisma/client";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  username: string;
  fromTime: string;
  eventDate: string;
  meetingLength: number;
  provider: VideoCallSoftware;
  eventTypeId: string;
}

const BookingForm: FC<BookingFormProps> = ({
  username,
  fromTime,
  eventDate,
  meetingLength,
  provider,
  eventTypeId,
}) => {
  const router = useRouter();

  const form = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      email: "",
      name: "",
      username,
      fromTime,
      eventDate,
      meetingLength,
      provider,
      eventTypeId,
    },
  });

  useEffect(() => {
    form.reset({
      username,
      fromTime,
      meetingLength,
      provider,
      eventTypeId,
      eventDate,
    });
  }, [
    form,
    username,
    fromTime,
    meetingLength,
    provider,
    eventTypeId,
    eventDate,
  ]);

  const { mutate, isPending } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      router.push("/success");
      form.reset();
      toast.success("Successfully created booking", { id: "booking" });
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", { id: "booking" });
    },
  });

  const onSubmit = async (values: BookingSchemaType) => {
    toast.loading("Creating booking...", { id: "booking" });
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button disabled={isPending} className="w-full">
            Book Meeting
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookingForm;
