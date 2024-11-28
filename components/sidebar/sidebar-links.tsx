"use client";

import { dashboardLinks } from "@/constants/sidebar";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface SidebarLinksProps {
  onClick?: () => void;
}

const SidebarLinks: FC<SidebarLinksProps> = ({ onClick }) => {
  const pathname = usePathname();

  const activeRoute = dashboardLinks.reduce((bestMatch, route) => {
    if (
      pathname.startsWith(route.href) &&
      (!bestMatch || route.href.length > bestMatch.href.length)
    ) {
      return route;
    }
    return bestMatch;
  }, dashboardLinks[0] || null);

  return (
    <div className="flex flex-col gap-1">
      {dashboardLinks.map((item) => (
        <Link
          className={buttonVariants({
            variant:
              activeRoute.href === item.href
                ? "sidebarActiveItem"
                : "sidebarItem",
            className: "flex items-center",
          })}
          key={item.name}
          href={item.href}
          onClick={onClick}
        >
          <item.icon className="w-4 h-4 mr-2" />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default SidebarLinks;
