"use client";

import { signUpSchema, SignUpSchemaType } from "@/validations/auth";
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
import { useMutation } from "@tanstack/react-query";
import { signUpAction } from "@/actions/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SignUpForm: FC = () => {
  const router = useRouter();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signUpAction,
    onSuccess: () => {
      toast.success("Successfully created new account", { id: "sign-up" });
      router.push("/onboarding");
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", { id: "sign-up" });
    },
  });

  // TODO
  const onSubmit = (values: SignUpSchemaType) => {
    toast.loading("Creating account...", { id: "sign-up" });
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

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
            Create new Account
            {isPending ? (
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
            ) : (
              <></>
            )}
          </Button>
        </div>

        <h5 className="text-sm text-muted-foreground pt-4 text-center">
          Already have an account?{" "}
          <Link className="text-primary" href="/sign-in">
            Log in
          </Link>
        </h5>
      </form>
    </Form>
  );
};

export default SignUpForm;
