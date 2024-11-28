import SettingsForm from "@/components/settings/settings-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

const Settings: FC = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!dbUser) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <SettingsForm user={dbUser} />
      </CardContent>
    </Card>
  );
};

export default Settings;
