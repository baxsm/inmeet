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
import SignInForm from "@/components/auth/sign-in-form";

const SignIn: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <Logo />
          </div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Log in to your account below</CardDescription>
          <div className="pt-4">
            <Separator />
          </div>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
