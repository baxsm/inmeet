import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { signinSchema } from "@/validations/auth";
import bcrypt from "bcryptjs";
import { exclude } from "./utils";
import { User } from "@prisma/client";

const signinProvider = Credentials({
  id: "sign-in",
  name: "Sign in",
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    if (!credentials?.email || !credentials.password) {
      throw new Error("Credentials not found");
    }

    try {
      const { email, password } = await signinSchema.parseAsync(credentials);

      const dbUser = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!dbUser) {
        // user not found, email do not match
        throw new Error("User not found");
      } else {
        // No password, wrong provider
        if (!dbUser?.password) {
          throw new Error("No password is associated with this account");
        }

        const isMatch = await bcrypt.compare(password, dbUser.password);

        // Password does not match
        if (!isMatch) {
          throw new Error("Credentials are not correct");
        }
      }

      return exclude(dbUser, ["password", "grantEmail", "grantId"]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error?.message ?? "Oops, something went wrong!");
    }
  },
});

const signupProvider = Credentials({
  id: "sign-up",
  name: "Sign up",
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    if (!credentials?.email || !credentials.password) {
      throw new Error("Credentials not found");
    }

    try {
      const { email, password } = await signinSchema.parseAsync(credentials);

      let dbUser: User | null = null;

      dbUser = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!dbUser) {
        // create new user
        const saltRounds = 14;

        const hashedPassword: string = await new Promise((resolve, reject) => {
          if (password) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
              if (err) {
                console.error("Error hashing password:", err);
                reject(err);
              } else {
                resolve(hash);
              }
            });
          } else {
            throw new Error("Password not found");
          }
        });

        // create new user
        // save the hashed password to compare
        dbUser = await prisma.user.create({
          data: {
            email: email,
            password: hashedPassword,
          },
        });
      } else {
        throw new Error("User already exists");
      }

      return exclude(dbUser, ["password", "grantEmail", "grantId"]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error?.message ?? "Something went wrong");
    }
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [Github, Google, signinProvider, signupProvider],
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
    newUser: "/onboarding",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    session: async ({ session, user, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user?.id ?? token?.id,
        },
      };
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },
  },
});
