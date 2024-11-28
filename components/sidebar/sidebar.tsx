import { FC } from "react";
import Logo from "../logo";
import SidebarLinks from "./sidebar-links";

const Sidebar: FC = () => {
  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
          <Logo />
        </div>
        <div className="flex-1 py-2">
          <nav className="grid items-start px-2 lg:px-4">
            <SidebarLinks />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
