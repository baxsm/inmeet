import { FC } from "react";
import YoutubeIcon from "../youtube-icon";

const Testimonials: FC = () => {
  return (
    <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <blockquote className="text-center lg:mx-auto lg:w-3/5">
        <YoutubeIcon className="mx-auto w-20 h-auto sm:w-28 dark:invert" />
        <p className="relative text-xl sm:text-2xl md:text-3xl md:leading-normal font-medium">
          Wow inMeet is the best platform I have ever used. Definitely recommend
          it to you guys, try it out!
        </p>

        <footer className="mt-6">
          <p className="font-semibold">John Doe</p>
          <p className="text-sm text-muted-foreground">Programmer | Youtuber</p>
        </footer>
      </blockquote>
    </div>
  );
};

export default Testimonials;
