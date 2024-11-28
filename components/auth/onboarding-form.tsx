"use client";

import { onboardingSchema, OnboardingSchemaType } from "@/validations/auth";
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
import { useMutation } from "@tanstack/react-query";
import { onboardingUser } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const OnboardingForm: FC = () => {
  const router = useRouter();

  const { data: session, update } = useSession();

  const form = useForm<OnboardingSchemaType>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "",
      username: "",
    },
    reValidateMode: "onBlur",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: onboardingUser,
    onSuccess: async ({ name }) => {
      toast.success("Username added successfully!", {
        id: "onboarding",
      });
      router.push("/onboarding/grant-id");

      await update({
        ...session?.user,
        user: {
          name,
        },
      });
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", {
        id: "onboarding",
      });
    },
  });

  const onSubmit = async (values: OnboardingSchemaType) => {
    toast.loading("Onboarding in progress...", { id: "onboarding" });
    await mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Full name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-muted bg-accent">
                    inMeet.com/
                  </span>
                  <Input
                    className="rounded-l-none"
                    placeholder="Enter your username"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button disabled={isPending} className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OnboardingForm;
