"use client";

import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { cancelMeeting } from "@/actions/meeting";

interface CancelMeetingProps {
  eventId: string;
}

const CancelMeeting: FC<CancelMeetingProps> = ({ eventId }) => {
  const { mutate } = useMutation({
    mutationFn: cancelMeeting,
    onSuccess: () => {},
    onError: () => {},
  });

  const handleCancel = () => {
    mutate(eventId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-fit" variant="destructive">
          Cancel Meeting
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelMeeting;
