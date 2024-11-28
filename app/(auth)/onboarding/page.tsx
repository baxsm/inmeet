"use server";

import { FC } from "react";
import Logo from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OnboardingForm from "@/components/auth/onboarding-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const Onboarding: FC = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (dbUser && dbUser.username) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <Logo />
          </div>
          <CardTitle>Onboarding</CardTitle>
          <CardDescription>
            We need the following information to set up your profile
          </CardDescription>
          <div className="pt-4">
            <Separator />
          </div>
        </CardHeader>
        <CardContent>
          <OnboardingForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
