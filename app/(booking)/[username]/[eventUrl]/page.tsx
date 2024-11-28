import { getEventTypeData } from "@/actions/booking";
import BookingForm from "@/components/booking/booking-form";
import RenderCalendar from "@/components/booking/render-calendar";
import TimeTable from "@/components/booking/time-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, Video } from "lucide-react";
import { notFound } from "next/navigation";
import { FC } from "react";

interface BookingProps {
  params: Promise<{
    username: string | undefined;
    eventUrl: string | undefined;
  }>;
  searchParams: Promise<{
    date: string | undefined;
    time: string | undefined;
  }>;
}

const Booking: FC<BookingProps> = async ({ params, searchParams }) => {
  const { eventUrl, username } = await params;

  if (!eventUrl || !username) {
    notFound();
  }

  const { date, time } = await searchParams;

  const selectedDate = date ? new Date(date) : new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const data = await getEventTypeData(username, eventUrl);

  if (!data || !data.User || !data.User.availabilities) {
    notFound();
  }

  const showForm = !!date && !!time;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="w-full max-w-[600px] mx-auto">
          <CardContent className="p-4 gap-4 md:grid md:grid-cols-[1fr,auto,1fr]">
            <div>
              <Avatar>
                <AvatarImage
                  src={data.User?.image || ""}
                  alt="user profile image"
                />
                <AvatarFallback>{data.User?.name}</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-4 flex flex-col gap-y-2">
                <p className="flex items-center">
                  <CalendarX2 className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} minutes
                  </span>
                </p>
                <p className="flex items-center">
                  <Video className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            <Separator orientation="vertical" />

            <BookingForm
              username={username}
              fromTime={time}
              eventDate={date}
              meetingLength={data.duration}
              provider={data.videoCallSoftware}
              eventTypeId={data.id}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-[1000px] mx-auto">
          <CardContent className="p-4 gap-4 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
            <div>
              <Avatar>
                <AvatarImage
                  src={data.User?.image || ""}
                  alt="user profile image"
                />
                <AvatarFallback>{data.User?.name}</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-4 flex flex-col gap-y-2">
                <p className="flex items-center">
                  <CalendarX2 className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} minutes
                  </span>
                </p>
                <p className="flex items-center">
                  <Video className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            <Separator orientation="vertical" />

            <RenderCalendar availabilities={data.User.availabilities} />

            <Separator orientation="vertical" />

            <TimeTable
              selectedDate={selectedDate}
              username={username}
              duration={data.duration}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Booking;
