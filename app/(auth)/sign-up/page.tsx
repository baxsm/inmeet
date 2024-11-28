import SignUpForm from "@/components/auth/sign-up-form";
import Logo from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";

const SignUp: FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <Logo />
          </div>
          <CardTitle>Get started</CardTitle>
          <CardDescription>
            Enter the required information to get started!
          </CardDescription>
          <div className="pt-4">
            <Separator />
          </div>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
