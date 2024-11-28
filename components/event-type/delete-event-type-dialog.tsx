"use client";

import { FC, useState } from "react";
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
import { Button, buttonVariants } from "../ui/button";
import { Loader2, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteEventType } from "@/actions/event-type";
import { toast } from "sonner";

interface DeleteEventTypeDialogProps {
  eventTypeId: string;
}

const DeleteEventTypeDialog: FC<DeleteEventTypeDialogProps> = ({
  eventTypeId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEventType,
    onSuccess: () => {
      toast.success("Successfully deleted event type", {
        id: "delete-event-type",
      });
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", {
        id: "delete-event-type",
      });
    },
  });

  const handleDelete = async () => {
    toast.loading("Deleting event type...", {
      id: "delete-event-type",
    });
    mutate(eventTypeId);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
          {isPending ? (
            <Loader2 className="w-4 h-4 mr-2" />
          ) : (
            <Trash className="w-4 h-4 stroke-destructive mr-2" />
          )}
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            event type and you may not be able to recover it later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className={buttonVariants({variant: "destructive"})}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventTypeDialog;
