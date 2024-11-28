import AddEventTypeDialog from "@/components/event-type/add-event-type-dialog";
import EventTypeCards from "@/components/event-type/event-type-cards";
import { FC } from "react";

const EventType: FC = async () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex md:flex-row gap-4 md:items-center justify-between px-0">
        <div className="flex flex-col space-y-1.5">
          <h5 className="text-2xl font-semibold">Event types</h5>
          <p className="text-sm text-muted-foreground">
            Manage all of your event types
          </p>
        </div>
        <AddEventTypeDialog />
      </div>
      <EventTypeCards />
    </div>
  );
};

export default EventType;
