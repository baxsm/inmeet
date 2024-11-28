import {
  CalendarCheck,
  CalendarRange,
  Cog,
  Home,
  LucideIcon,
  Users2,
} from "lucide-react";

export const dashboardLinks: {
  name: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Event Types",
    href: "/dashboard/event-types",
    icon: CalendarRange,
  },
  {
    name: "Meetings",
    href: "/dashboard/meetings",
    icon: Users2,
  },
  {
    name: "Availability",
    href: "/dashboard/availability",
    icon: CalendarCheck,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Cog,
  },
];
