import EditEventTypeDialog from "@/components/event-type/edit-event-type-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventType } from "@prisma/client";
import { Cog, ExternalLink, Users2 } from "lucide-react";
import { FC } from "react";
import DeleteEventTypeDialog from "./delete-event-type-dialog";
import CopyEventTypeButton from "./copy-event-type-button";
import Link from "next/link";
import EventTypeActiveSwitch from "./event-type-active-switch";

interface EventTypeCardProps {
  eventType: EventType;
  username: string;
}

const EventTypeCard: FC<EventTypeCardProps> = ({ eventType, username }) => {
  const makeUrl = `${process.env.NEXT_PUBLIC_APPLICATION_URL}/${username}/${eventType.url}`;

  return (
    <div className="border shadow-md rounded-lg w-full max-w-[300px] relative">
      <div className="flex flex-row items-center gap-4 p-4">
        <Users2 className="w-5 h-5" />
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">
            {eventType.duration} Minutes Meeting
          </p>
          <h5 className="text-base font-semibold">{eventType.title}</h5>
        </div>
      </div>
      <div className="flex items-center justify-between bg-accent p-4 rounded-bl-lg rounded-br-lg">
        <EventTypeActiveSwitch
          isActive={eventType.isActive}
          eventTypeId={eventType.id}
        />
        <EditEventTypeDialog
          initData={eventType}
          triggerButton={<Button>Edit Event</Button>}
        />
      </div>

      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2"
          >
            <Cog className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Event</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className="p-0 flex items-start hover:outline-none cursor-pointer"
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sm"
              asChild
            >
              <Link href={makeUrl} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                Preview
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="p-0 flex items-start">
            <CopyEventTypeButton makeUrl={makeUrl} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="p-0 flex items-start">
            <DeleteEventTypeDialog eventTypeId={eventType.id} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EventTypeCard;
