"use client";

import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CalendarRange } from "lucide-react";
import { useSession } from "next-auth/react";

interface LogoProps {
  fontSize?: string;
  iconSize?: number;
}

const Logo: FC<LogoProps> = ({ fontSize = "text-2xl", iconSize = 20 }) => {
  const { data } = useSession();

  return (
    <Link
      href={data && data.user ? "/dashboard" : "/"}
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-2">
        <CalendarRange size={iconSize} className="text-white" />
      </div>
      <div className="">
        <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
          in
        </span>
        <span className="text-slate-700 dark:text-slate-300">Meet</span>
      </div>
    </Link>
  );
};

export default Logo;
