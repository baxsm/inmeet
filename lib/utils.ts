import { User } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function exclude(user: User, keys: Array<keyof User>) {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}