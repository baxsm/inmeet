"use client";

import { FC, useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { useMutation } from "@tanstack/react-query";
import { updateEventTypeIsActive } from "@/actions/event-type";
import { toast } from "sonner";

interface EventTypeActiveSwitchProps {
  eventTypeId: string;
  isActive: boolean;
}

const EventTypeActiveSwitch: FC<EventTypeActiveSwitchProps> = ({
  eventTypeId,
  isActive,
}) => {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateEventTypeIsActive,
    onSuccess: () => {
      toast.success("Updated event type active status", {
        id: `is-active-${eventTypeId}`,
      });
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", {
        id: `is-active-${eventTypeId}`,
      });
    },
  });

  const handleCheckChange = (checked: boolean) => {
    setActive(checked);

    toast.loading("Updating event type status...", {
      id: `is-active-${eventTypeId}`,
    });

    mutate({ isActive: checked, eventTypeId });
  };

  return (
    <Switch
      disabled={isPending}
      checked={active}
      onCheckedChange={handleCheckChange}
    />
  );
};

export default EventTypeActiveSwitch;
