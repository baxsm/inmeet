import CallToAction from "@/components/landing/call-to-action";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Logos from "@/components/landing/logos";
import Navbar from "@/components/landing/navbar";
import Testimonials from "@/components/landing/testimonials";
import { auth } from "@/lib/auth";

import { FC } from "react";

const Home: FC = async () => {
  const session = await auth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar user={session?.user} />
      <Hero />
      <Logos />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
