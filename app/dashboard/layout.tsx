import { getUsername } from "@/actions/event-type";
import Sidebar from "@/components/sidebar/sidebar";
import Topbar from "@/components/topbar/topbar";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const username = await getUsername();

  if (!username) {
    redirect("/onboarding");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <Topbar />
        <Separator />
        <div className="overflow-y-auto w-full h-full">
          <div className="flex-1 container p-4 text-accent-foreground w-full h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
