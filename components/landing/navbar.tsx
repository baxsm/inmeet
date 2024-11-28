import { FC } from "react";
import Logo from "@/components/logo";
import { User } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

interface NavbarProps {
  user: User | undefined;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-between py-5">
      <Logo />

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <div className="hidden lg:block">
          {user ? (
            <Link href="/dashboard" className={buttonVariants()}>
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/sign-in"
              >
                Sign in
              </Link>
              <Link className={buttonVariants()} href="/sign-up">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
