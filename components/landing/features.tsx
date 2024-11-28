import { featuresList } from "@/constants/landing";
import { FC } from "react";

const Features: FC = () => {
  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Schedule faster</p>
        <h1 className="text-3xl mt-2 font-bold tracking-tight sm:text-4xl">
          Schedule meetings in minutes
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With inMeet you can schedule meetings in minutes. We make it easy for
          you to schedule meetings in minutes. The meetings are very fast and
          easy to schedule.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {featuresList.map((feature, index) => (
            <article key={index} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  {<feature.icon className="size-6 text-white" />}
                </div>
                {feature.title}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
