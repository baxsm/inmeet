"use client";

import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SidebarMobile from "@/components/sidebar/sidebar-mobile";
import { buttonVariants } from "@/components/ui/button";
import { dashboardLinks } from "@/constants/sidebar";
import { HomeIcon } from "lucide-react";

const BreadcrumbHeader: FC = () => {
  const pathname = usePathname();

  const getPathNames = (pathname: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const pathnames: typeof dashboardLinks = [];
    let cumulativePath = "";
    pathSegments.forEach((segment) => {
      cumulativePath += `/${segment}`;
      const route = dashboardLinks.find(
        (route) => route.href === cumulativePath
      );
      if (route) {
        pathnames.push({ name: route.name, href: route.href, icon: HomeIcon });
      }
    });
    return pathnames.length ? pathnames : [{ ...dashboardLinks[0] }];
  };

  const pathNames = getPathNames(pathname);

  return (
    <div className="flex flex-start">
      <SidebarMobile />
      <Breadcrumb className="flex items-center">
        <BreadcrumbList>
          {pathNames.map((path, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className={buttonVariants({
                    variant: "ghost",
                    className: "capitalize",
                    size: "sm",
                  })}
                  href={`${path.href}`}
                >
                  {path.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== pathNames.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;