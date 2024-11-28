"use client";

import { FC, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { settingsSchema, SettingsSchemaType } from "@/validations/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { updateUserSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

interface SettingsFormProps {
  user: User;
}

const SettingsForm: FC<SettingsFormProps> = ({ user }) => {
  const form = useForm<SettingsSchemaType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "",
      profileImage: "",
    },
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    form.reset({
      name: user.name || "",
      profileImage: user.image || "",
    });
  }, [user, form]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      toast.success("Setting updated successfully", { id: "settings" });
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", { id: "settings" });
    },
  });

  const onSubmit = async (values: SettingsSchemaType) => {
    toast.loading("Updating settings", { id: "settings" });
    await mutateAsync(values);
  };

  const handleImageRemove = () => {
    form.setValue("profileImage", "");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-2"
      >
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
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" value={user.email} readOnly disabled />
        </FormItem>

        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile image</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="relative w-fit">
                    <Button
                      onClick={handleImageRemove}
                      variant="destructive"
                      type="button"
                      size="icon"
                      className="absolute z-[1] -right-2 -top-2 p-1 w-fit h-fit rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                    <Avatar className="w-14 h-14">
                      <AvatarImage
                        src={field.value}
                        className="w-14 h-14 object-cover"
                      />
                      <AvatarFallback>
                        {user.name?.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      toast.success("Image uploaded");
                      field.onChange(res[0].url);
                    }}
                    onUploadError={() => {
                      toast.error("Error uploading image");
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>Save changes</Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
