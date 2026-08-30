"use client";

import {
  Calendar,
  CalendarHeart,
  ExternalLink,
  Link,
  MapPinned,
  UserRound,
} from "lucide-react";
import { Button } from "./ui/button";
import CountDownTimer from "./CountDownTimer";
import { Separator } from "./ui/separator";

type HeroProps = {
  onSelect: (value: "yes" | "no") => void;
  onLeaveNote: () => void;
};

function Hero({ onSelect, onLeaveNote }: HeroProps) {
  return (
    <section className="flex h-dvh md:max-w-3xl flex-col">
      <div className="flex flex-1 flex-col items-center justify-evenly text-center">
        <div>
          <h1 className="font-cg text-fluid-xl text-midnight-purple tracking-widest font-semibold mt-3 md:mt-8">
            يسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:gap-4 md:mt-6">
          <div className="flex flex-col">
            <p className="font-cg font-bold text-fluid-2xl text-midnight-purple tracking-wider leading-none">
              SHAZ SHAHUL
            </p>
            <p className="font-cg italic font-medium text-fluid-base text-zinc-600">
              S/O P P Shahul Hameed And Absath Mullaveetil
            </p>
          </div>

          <p className="font-script text-fluid-xl text-choco-plum mt-2">And</p>

          <div>
            <h2 className="font-serif text-fluid-2xl text-midnight-purple tracking-wider leading-none">
              RENNA RAHMATH
            </h2>
            <p className="font-cg italic font-medium text-fluid-sm text-zinc-600">
              D/O Rahmathulla C And Haseena A K
            </p>
          </div>
        </div>
        <p className="font-candy text-fluid-sm tracking-wide text-zinc-800 md:my-4">
          together with our families,
          <br className="md:hidden block" /> invite you to our Nikkah
        </p>
        <div className="w-full flex justify-center items-start gap-4 md:gap-20 px-5 mt-3">
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shaz+and+Renna+Wedding&dates=20261004T043000Z/20261004T083000Z&details=Join+us+for+our+wedding&location=Airport+Garden+Convention+Center%2C+Karipur"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col justify-center items-center cursor-pointer"
          >
            <div className="bg-crimson-violet rounded-3xl p-5 mb-2 shadow-xl">
              <CalendarHeart className="text-background h-8 w-8 md:h-10 md:w-10" />
            </div>
            <p className="font-mono leading-tight text-midnight-purple text-fluid-xs">
              04 OCT 2026 <br />
              At 10 AM
            </p>
            <p className="font-mono cursor-pointer text-fluid-xs text-gray-600">
              Add to Calendar
              <Calendar className="inline-block ms-1 h-full w-3" />
            </p>
          </a>
          <div className="hidden md:flex h-full md:self-center md:mt-0 mt-3">
            <Separator
              orientation="vertical"
              className="bg-[#4C3032]/30 h-24"
            />
          </div>

          <a
            href="https://maps.app.goo.gl/JoyyoUn8gNfYwEi78"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col justify-center items-center cursor-pointer  "
          >
            <div className="bg-crimson-violet rounded-3xl p-5 cursor-pointer mb-2 shadow-xl">
              <MapPinned className="text-background h-8 w-8 md:h-10 md:w-10" />
            </div>
            <p className="font-mono leading-tight text-midnight-purple text-fluid-xs">
              Aiport Garden Convention Center, Karipur
            </p>
            <p className="font-mono cursor-pointer text-fluid-xs text-gray-600">
              Open in Maps
              <Link className="inline-block ms-1 h-full w-3" />
            </p>
          </a>
        </div>

        <CountDownTimer />
      </div>

      {/* RSVP Section */}
      <div className="w-full self-center pb-5 mb-3">
        <div className="flex flex-col gap-2 ">
          <span className="font-candy text-fluid-sm text-center text-gray-600">
            Will you be attending?
          </span>
          <div className="flex justify-center gap-3">
            <Button
              className="bg-transparent backdrop-blur-2xl border-pastel-green text-pastel-green hover:bg-pastel-green hover:text-white cursor-pointer rounded-md"
              onClick={() => onSelect("yes")}
            >
              Joyfully accept
            </Button>
            <Button
              className="bg-transparent border backdrop-blur-3xl border-[#ef4444d6] rounded-md hover:bg-[#ef4444d6] hover:text-white cursor-pointer text-[#ef4444d6]"
              onClick={() => onSelect("no")}
            >
              Regretfully decline
            </Button>
          </div>
        </div>
        <div className="md:hidden flex items-center justify-center text-center text-md leading-normal mt-3">
          <button
            type="button"
            onClick={onLeaveNote}
            className="font-candy text-fluid-sm cursor-pointer underline underline-offset-3"
          >
            Leave a note for the couple{" "}
            <ExternalLink className="inline-block h-3.5 w-3.5 mb-1" />
          </button>
        </div>
        <div className="hidden md:flex absolute bottom-7 right-7 ">
          <div className="flex items-center justify-center py-1 px-3 bg-crimson-violet rounded-b-lg rounded-tl-lg">
            <p
              className="font-candy text-fluid-sm text-background cursor-pointer"
              onClick={onLeaveNote}
            >
              Leave a note for the couple
            </p>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white ms-2">
            <UserRound className="h-5 w-5 text-midnight-purple" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
