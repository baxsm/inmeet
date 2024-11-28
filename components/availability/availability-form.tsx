"use client";

import {
  availabilitySchema,
  AvailabilitySchemaType,
} from "@/validations/availability";
import { zodResolver } from "@hookform/resolvers/zod";
import { Availability } from "@prisma/client";
import { FC, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { availabilityTimes } from "@/constants/availability";
import { useMutation } from "@tanstack/react-query";
import { updateAvailabilities } from "@/actions/availability";
import { toast } from "sonner";

interface AvailabilityFormProps {
  initAvailabilities: Availability[];
}

const AvailabilityForm: FC<AvailabilityFormProps> = ({
  initAvailabilities,
}) => {
  const form = useForm<AvailabilitySchemaType>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      availabilities: initAvailabilities.map((e) => ({
        availabilityId: e.id,
        day: e.day,
        fromTime: e.fromTime,
        toTime: e.toTime,
        isActive: e.isActive,
      })),
    },
  });

  useEffect(() => {
    form.reset({
      availabilities: initAvailabilities.map((e) => ({
        availabilityId: e.id,
        day: e.day,
        fromTime: e.fromTime,
        toTime: e.toTime,
        isActive: e.isActive,
      })),
    });
  }, [form, initAvailabilities]);

  const { fields } = useFieldArray({
    name: "availabilities",
    control: form.control,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateAvailabilities,
    onSuccess: () => {
      toast.success("Successfully updated availability", {
        id: "availability-form",
      });
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", {
        id: "availability-form",
      });
    },
  });

  const onSubmit = (values: AvailabilitySchemaType) => {
    toast.loading("Updating availability", { id: "availability-form" });
    mutate(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl w-full space-y-4"
    >
      {fields?.map((field, index) => {
        return (
          <div key={index} className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-12">
            <div className="flex items-center gap-2">
              <Switch
                defaultChecked={field.isActive}
                onCheckedChange={(value) =>
                  form.setValue(`availabilities.${index}`, {
                    ...field,
                    isActive: value,
                  })
                }
              />
              <p>{field.day}</p>
            </div>

            <div className="flex items-center gap-2">
              {/* From Time */}
              <Select
                defaultValue={field.fromTime}
                onValueChange={(value) =>
                  form.setValue(`availabilities.${index}`, {
                    ...field,
                    fromTime: value,
                  })
                }
              >
                <SelectTrigger className="w-full min-w-[150px]">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>From Time</SelectLabel>
                    {availabilityTimes.map((time, index) => (
                      <SelectItem key={index} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* To Time */}
              <Select
                defaultValue={field.toTime}
                onValueChange={(value) =>
                  form.setValue(`availabilities.${index}`, {
                    ...field,
                    toTime: value,
                  })
                }
              >
                <SelectTrigger className="w-full min-w-[150px]">
                  <SelectValue placeholder="To Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>To Time</SelectLabel>
                    {availabilityTimes.map((time, index) => (
                      <SelectItem key={index} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      })}

      <div className="pt-4">
        <Button type="submit" disabled={isPending}>
          Update Availability
        </Button>
      </div>
    </form>
  );
};

export default AvailabilityForm;
