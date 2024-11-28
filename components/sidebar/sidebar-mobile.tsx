"use client";

import { FC, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Logo from "@/components/logo";
import SidebarLinks from "@/components/sidebar/sidebar-links";

const SidebarMobile: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between pr-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4"
            side="left"
            aria-describedby="sidebar"
          >
            <Logo />
            <SidebarLinks onClick={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default SidebarMobile;
