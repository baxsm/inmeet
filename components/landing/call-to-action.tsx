import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "../ui/button";

const CallToAction: FC = () => {
  return (
    <div className="my-20 relative isolate overflow-hidden px-6 py-20 text-center sm:rounded-3xl sm:border sm:shadow-sm">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Start using inMeet now!
      </h2>
      <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-sm mx-auto">
        inMeet makes it easy for your clients to schedule a meeting with you!
      </p>
      <div className="mt-6">
        <Link href="/sign-in" className={buttonVariants()}>
          Get Started <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
