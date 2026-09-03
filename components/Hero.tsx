"use client";

import CountDownTimer from "./CountDownTimer";

import {
  Calendar,
  CalendarHeart,
  Heart,
  Link,
  MapPinned,
  PencilLine,
  UserRound,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type HeroProps = {
  onSelect: (value: "yes" | "no") => void;
  onLeaveNote: () => void;
  alreadyResponded: boolean;
  hasChecked: boolean;
};

function Hero({
  onSelect,
  onLeaveNote,
  alreadyResponded,
  hasChecked,
}: HeroProps) {
  return (
    <section className="flex flex-col h-dvh w-full md:max-w-2xl overflow-hidden">
      <div className="mt-5 md:mt-1 shrink-0 text-center flex flex-col items-center justify-top">
        <h1 className="font-arabic text-fluid-lg text-midnight-purple tracking-widest font-semibold mt-3 md:mt-8">
          يسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
        </h1>
      </div>
      <div className="flex flex-1 min-h-0 flex-col  items-center justify-evenly text-center">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-4 md:mt-6">
          <div className="flex flex-col">
            <p className="font-cg font-bold text-fluid-2xl text-midnight-purple tracking-wider leading-none">
              SHAZ SHAHUL
            </p>
            <p className="font-cg italic font-medium text-fluid-sm text-zinc-600">
              S/O P P Shahul Hameed And Absath Mullaveetil
            </p>
          </div>

          <p className="font-script font-medium text-fluid-xl text-choco-plum mt-2">
            And
          </p>

          <div>
            <h2 className="font-cg font-bold text-fluid-2xl text-midnight-purple tracking-wider leading-none">
              RENNA RAHMATH
            </h2>
            <p className="font-cg italic font-medium text-fluid-sm text-zinc-600">
              D/O Rahmathulla C And Haseena A K
            </p>
          </div>
        </div>
        <p className="font-charis font-medium text-fluid-md tracking-wide text-zinc-800 md:my-4 leading-tight">
          together with our families,
          <br className="md:hidden block" /> we invite you to our Nikkah
        </p>
        <div className="w-full flex justify-evenly items-start gap-4 md:gap-20 mt-3">
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shaz+and+Renna+Wedding&dates=20261004T043000Z/20261004T083000Z&details=Join+us+for+our+wedding&location=Airport+Garden+Convention+Center%2C+Karipur"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col justify-center items-center cursor-pointer min-w-0"
          >
            <div className="bg-crimson-violet rounded-lg p-3 mb-2 shadow-lg">
              <CalendarHeart className="text-background h-9 w-9" />
            </div>
            <p className="font-charis font-medium leading-tight text-midnight-purple text-fluid-sm text-center">
              04 OCT 2026 <br />
              <span className="whitespace-nowrap">At 10 AM</span>
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
            className="flex-1 flex flex-col min-w-0 justify-center items-center cursor-pointer"
          >
            <div className="bg-crimson-violet rounded-lg p-3 cursor-pointer mb-2 shadow-lg">
              <MapPinned className="text-background h-9 w-9" />
            </div>
            <p className="font-charis font-medium leading-tight text-midnight-purple text-fluid-sm text-center">
              Airport Garden <br />
              <span className="whitespace-nowrap">Convention Center</span>
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
      <div className="w-full self-center pb-5 shrink-0">
        <div className="flex flex-col gap-2 ">
          {!hasChecked ? (
            // Reserve the same vertical space so nothing visually jumps once
            // the real content appears a moment later.
            <div className="h-14" />
          ) : alreadyResponded ? (
            <span className="font-cg text-fluid-md text-center text-gray-600">
              You&apos;ve already responded, thank you!{" "}
              <Heart className="inline-block h-full w-4 text-crimson-violet fill-crimson-violet mb-1" />
            </span>
          ) : (
            <>
              <span className="font-cg font-semibold text-fluid-sm text-center text-choco-plum tracking-wide">
                Will you be attending?
              </span>
              <div className="flex justify-center gap-3">
                <Button
                  className="font-cg font-medium bg-transparent backdrop-blur-xs border-pastel-green text-pastel-green hover:bg-pastel-green hover:text-white cursor-pointer rounded-md"
                  onClick={() => onSelect("yes")}
                >
                  Joyfully accept
                </Button>
                <Button
                  className="font-cg font-medium bg-transparent border backdrop-blur-xs border-[#ef4444d6] rounded-md hover:bg-[#ef4444d6] hover:text-white cursor-pointer text-[#ef4444d6]"
                  onClick={() => onSelect("no")}
                >
                  Regretfully decline
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center justify-center text-center text-md leading-normal mt-3">
          <button
            type="button"
            onClick={onLeaveNote}
            className="font-cg font-semibold text-crimson-violet text-fluid-base cursor-pointer underline underline-offset-2 hover:text-crimson-violet/80"
          >
            Leave a note for the couple{" "}
            <PencilLine className="inline-block h-[1em] w-[1em]" />
          </button>
        </div>
        <div className="hidden md:flex absolute bottom-7 right-7 ">
          <div className="flex items-center justify-center py-1 px-3 bg-crimson-violet rounded-b-lg rounded-tl-lg">
            <p
              className="font-cg font-medium text-fluid-base text-background cursor-pointer"
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
