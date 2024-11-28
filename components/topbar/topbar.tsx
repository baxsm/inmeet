"use server"

import { FC } from "react";
import BreadcrumbHeader from "./breadcrumb-header";
import ThemeToggle from "@/components/theme-toggle";
import UserDropdown from "./user-dropdown";
import { auth } from "@/lib/auth";

const Topbar: FC = async () => {
  const session = await auth();

  return (
    <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
      <BreadcrumbHeader />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {session?.user && <UserDropdown user={session?.user} />}
      </div>
    </header>
  );
};

export default Topbar;
