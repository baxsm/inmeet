import { getEventTypes, getUsername } from "@/actions/event-type";
import { buttonVariants } from "@/components/ui/button";

import { Ban, Plus } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import EventTypeCard from "./event-type-card";

const EventTypeCards: FC = async () => {
  const username = await getUsername();

  if (!username) {
    return <>Username not found</>;
  }

  const eventTypes = await getEventTypes();

  if (!eventTypes) {
    return <div>Something went wrong</div>;
  }

  if (eventTypes.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-2 text-center items-center justify-center">
          <div className="p-4 bg-primary/20 rounded-full flex items-center justify-center w-fit h-fit">
            <Ban className="w-14 h-14 stroke-primary" />
          </div>
          <h5 className="font-semibold text-xl">Event not found</h5>
          <p className="text-sm text-muted-foreground max-w-prose">
            Create a new event by clicking the button below
          </p>
          <div className="pt-4">
            <Link
              href="/dashboard/event-types/new"
              className={buttonVariants({ size: "lg" })}
            >
              Create new Event Type
              <Plus className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {eventTypes.map((event) => (
        <EventTypeCard username={username} eventType={event} key={event.id} />
      ))}
    </div>
  );
};

export default EventTypeCards;
