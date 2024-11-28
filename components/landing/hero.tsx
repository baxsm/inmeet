import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Hero: FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <Badge variant="secondary" className="text-sm font-medium text-primary">
          Introducing inMeet 1.0
        </Badge>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
          Scheduling made{" "}
          <span className="block text-primary -mt-2">super easy!</span>
        </h1>
        <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
          Scheduling a meeting can be a pain. But we at inMeet make it easy for
          your clients to schedule meetings with you.
        </p>
        <div className="mt-4 mb-12">
          <Link href="/sign-in" className={buttonVariants()}>
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      <div className="relative w-full h-full">
        <svg
          className="absolute inset-0 -mt-24 blur-3xl"
          style={{ zIndex: -1 }}
          fill="none"
          viewBox="0 0 400 400"
          height="100%"
          width="100%"
          xmlns="https://www.w3.org/2000.svg"
          opacity={0.4}
        >
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path
                d="M128.6 0H0v322.2L106.2 134.75L128.6 0Z"
                fill="#03FFE0"
              ></path>
              <path
                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                fill="#7C87F8"
              ></path>
              <path
                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                fill="#4C65E4"
              ></path>
              <path
                d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                fill="#043AFF"
              ></path>
            </g>
          </g>
        </svg>

        <div className="relative items-center w-full h-[500px] py-12 mx-auto mt-12 bg-white border rounded-lg shadow-2xl lg:rounded-2xl">
          <Image
            src="/hero.png"
            alt="hero image"
            fill
            className="relative w-full object-contain p-20"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
