import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

const NylasGrantId: FC = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (dbUser && dbUser.grantId) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <Logo isLink={false} />
          </div>
          <CardTitle>You are almost done!</CardTitle>
          <CardDescription>
            We have to now connect your calender to your account
          </CardDescription>
          <div className="pt-4">
            <Separator />
          </div>
        </CardHeader>
        <CardContent>
          <Link
            href="/api/auth/nylas"
            className={buttonVariants({ className: "w-full" })}
          >
            <CalendarCheck className="w-4 h-4 mr-2" />
            Connect calender to your Account
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NylasGrantId;
