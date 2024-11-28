"use client";

import { signinSchema, SigninSchemaType } from "@/validations/auth";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { signInAction } from "@/actions/auth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const SignInForm: FC = () => {
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signInAction,
    onSuccess: () => {
      toast.success("Successfully signed in", { id: "sign-in" });
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", { id: "sign-in" });
    },
  });

  // TODO
  const onSubmit = (values: SigninSchemaType) => {
    toast.loading("Verifying account...", { id: "sign-in" });
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button disabled={isPending} className="w-full">
            Submit
            {isPending ? <Loader2 className="w-4 h-4 ml-2 animate-spin"/> : <></>}
          </Button>
        </div>

        <h5 className="text-sm text-muted-foreground pt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-primary" href="/sign-up">
            Create an Account
          </Link>
        </h5>

        <div className="pt-4">
          <div className="w-full flex items-center gap-2">
            <Separator className="flex-1" />
            <p className="text-muted-foreground text-xs">OR</p>
            <Separator className="flex-1" />
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-2">
          <Button
            type="button"
            disabled={isPending}
            onClick={() => signIn("google")}
            variant="outline"
          >
            <FcGoogle className="text-base mr-2" />
            Continue with Google
          </Button>
          <Button
            disabled={isPending}
            type="button"
            onClick={() => signIn("github")}
            variant="outline"
          >
            <FaGithub className="text-base mr-2" />
            Continue with Github
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
