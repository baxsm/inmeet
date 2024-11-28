"use client";

import {
  editEventTypeSchema,
  EditEventTypeSchemaType,
} from "@/validations/event-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, ReactNode, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventTypeDurations, videoCallProviders } from "@/constants/event-type";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { editEventType } from "@/actions/event-type";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventType } from "@prisma/client";

interface EditEventTypeDialogProps {
  initData: EventType;
  triggerButton: ReactNode;
}

const EditEventTypeDialog: FC<EditEventTypeDialogProps> = ({
  initData,
  triggerButton,
}) => {
  const form = useForm<EditEventTypeSchemaType>({
    resolver: zodResolver(editEventTypeSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: undefined,
      url: "",
      videoCallSoftware: undefined,
    },
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    form.reset({
      description: initData.description,
      duration: initData.duration,
      eventTypeId: initData.id,
      title: initData.title,
      url: initData.url,
      videoCallSoftware: initData.videoCallSoftware,
    });
  }, [initData, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: editEventType,
    onSuccess: () => {
      toast.success("Successfully updated event type", {
        id: "edit-event-type",
      });
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", {
        id: "edit-event-type",
      });
    },
  });

  const onSubmit = async (values: EditEventTypeSchemaType) => {
    toast.loading("Adding event type...", {
      id: "edit-event-type",
    });
    mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your appointment type</DialogTitle>
          <DialogDescription>
            Edit your appointment type that allows people to book you!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl space-y-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="30 minute meeting" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-muted bg-accent">
                        inMeet.com/
                      </span>
                      <Input
                        className="rounded-l-none"
                        placeholder="Enter your username"
                        disabled
                        readOnly
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the description"
                      className="max-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value ? String(field.value) : ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventTypeDurations.map((duration) => (
                        <SelectItem
                          key={duration.value}
                          value={String(duration.value)}
                        >
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoCallSoftware"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video call provider</FormLabel>
                  <FormControl>
                    <div className="w-full flex gap-2 items-center">
                      {videoCallProviders.map((provider) => {
                        const isActive = field.value === provider.value;

                        return (
                          <Button
                            type="button"
                            variant={"outline"}
                            key={provider.value}
                            className={cn("w-full", {
                              "border border-primary": isActive,
                            })}
                            onClick={() => {
                              field.onChange(provider.value);
                            }}
                          >
                            {provider.label}
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button disabled={isPending} className="w-full">
                Update Event Type
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventTypeDialog;
