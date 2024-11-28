import { getMeetings } from "@/actions/meeting";
import CancelMeeting from "@/components/meetings/cancel-meeting";
import { buttonVariants } from "@/components/ui/button";
import { format, fromUnixTime } from "date-fns";
import { Ban, Plus, Video } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Meetings: FC = async () => {
  const meetings = await getMeetings();

  if (!meetings) {
    return <div>Something went wrong</div>;
  }

  if (meetings.data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-2 text-center items-center justify-center">
          <div className="p-4 bg-primary/20 rounded-full flex items-center justify-center w-fit h-fit">
            <Ban className="w-14 h-14 stroke-primary" />
          </div>
          <h5 className="font-semibold text-xl">Meetings not found</h5>
          <p className="text-sm text-muted-foreground max-w-prose">
            You don&apos;t have any meetings yet
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
    <div className="flex flex-col gap-8">
      <div className="flex md:flex-row gap-4 md:items-center justify-between px-0">
        <div className="flex flex-col space-y-1.5">
          <h5 className="text-2xl font-semibold">Meetings</h5>
          <p className="text-sm text-muted-foreground">
            See upcoming event which were booked with you and see the event type
            link
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 w-full">
        {meetings.data.map((item) => (
          <div
            key={item.id}
            className="w-full grid gap-2 md:grid-cols-3 justify-between items-center p-4 border rounded-lg shadow-md"
          >
            <div>
              <p className="text-sm text-muted-foreground">
                {/* @ts-expect-error valid */}
                {format(fromUnixTime(item.when?.startTime), "EEE, dd MMM")}
              </p>
              <p className="text-muted-foreground text-xs pt-1">
                {/* @ts-expect-error valid */}
                {format(fromUnixTime(item.when.startTime), "hh:mm a")} -
                {/* @ts-expect-error valid */}
                {format(fromUnixTime(item.when.endTime), "hh:mm a")}
              </p>

              <div className="flex items-center mt-1">
                <Video className="w-4 h-4 mr-2 stroke-primary" />
                <Link
                  // @ts-expect-error valid
                  href={item.conferencing.details.url}
                  className="text-xs text-primary underline underline-offset-4"
                  target="_blank"
                >
                  Join Meeting
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <h2 className="text-sm font-medium">{item.title}</h2>
              <p className="text-sm text-muted-foreground">
                You and {item.participants[0].name}
              </p>
            </div>

            <div className="w-fit ml-auto">
              <CancelMeeting eventId={item.id}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meetings;
