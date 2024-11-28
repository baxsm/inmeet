import { FC } from "react";
import DashboardCard from "./dashboard-card";
import { CalendarCheck, Share2 } from "lucide-react";
import { getTotalEvents, getTotalMeetings } from "@/actions/dashboard";

const DashboardCards: FC = async () => {
  const eventData = await getTotalEvents();

  const meetingsData = await getTotalMeetings();

  return (
    <div className="grid grid-cols-2 gap-4">
      <DashboardCard
        title="Total events"
        value={eventData.totalEventsCount}
        icon={CalendarCheck}
        extraValue={`${eventData.totalActiveEventsCount} active`}
        href="/dashboard/event-types"
      />
      <DashboardCard
        title="Total meetings"
        value={meetingsData.totalMeetingsCount}
        icon={Share2}
        href="/dashboard/meetings"
      />
    </div>
  );
};

export default DashboardCards;
