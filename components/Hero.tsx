"use client";

import { CalendarHeart, ExternalLink, MapPinned } from "lucide-react";
import { Button } from "./ui/button";

type HeroProps = {
  onSelect: (value: "yes" | "no") => void;
  onLeaveNote: () => void;
};

function Hero({ onSelect, onLeaveNote }: HeroProps) {
  return (
    <section className="flex min-h-dvh flex-col border-2">
      <div className="flex flex-1 flex-col items-center justify-evenly text-center">
        <div>
          <h1 className="font-arabic text-2xl md:text-5xl text-[#4C3032] font-bold mt-2">
            يسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
          </h1>
          <p className="font-sans text-[10px] md:text-sm tracking-[0.2em]  text-zinc-600 md:mt-4">
            Together with our families,
            <br className="md:hidden" />
            we invite you to our Nikkah
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl md:text-5xl text-[#4C3032] tracking-wider flex items-center justify-center">
            SHAZ SHAHUL
          </h2>
          <p className="text-base text-gray-600">
            S/O P P Shahul Hameed And Absath Mullaveetil
          </p>
        </div>

        <p>&</p>

        <div>
          <h2 className="font-serif text-2xl md:text-5xl text-[#4C3032] tracking-wider flex items-center justify-center">
            RENNA RAHMATH
          </h2>
          <p className="text-base text-gray-600">
            D/O Rahmathulla C And Haseena A K
          </p>
        </div>
        <div className="flex justify-center items-start gap-4 md:gap-16">
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding&dates=20260904T063000Z/20260904T103000Z&details=Join+us+for+our+wedding&location=Airport+Garden+Convention+Center%2C+Karipur"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col justify-center items-center cursor-pointer"
          >
            <div className="bg-[#4C3032] rounded-3xl p-8 mb-2 shadow-xl  ">
              <CalendarHeart className="text-background h-12 w-12" />
            </div>
            <p>04 SEP 2026</p>
            <p>At 10 AM</p>
          </a>
          <div className="h-full self-center">
            <div className="w-px bg-[#4C3032] h-24"></div>
          </div>

          <a
            href="https://maps.app.goo.gl/JoyyoUn8gNfYwEi78"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col justify-center items-center cursor-pointer  "
          >
            <div className="bg-[#4C3032] rounded-3xl p-8 cursor-pointer mb-2 shadow-xl">
              <MapPinned className="text-background h-12 w-12" />
            </div>
            <p>Aiport Garden Convention Center, Karipur</p>
          </a>
        </div>
      </div>

      <div className="w-full self-center pb-5 border-2">
        <div className="flex flex-col gap-2 ">
          <span className="text-sm font-medium text-center text-gray-700">
            Will you be attending?
          </span>
          <div className="flex justify-center gap-3">
            <Button
              className="bg-pastel-green backdrop-blur-2xl  hover:bg-pastel-green/50 cursor-pointer text-white"
              onClick={() => onSelect("yes")}
            >
              Joyfully accepts
            </Button>
            <Button
              className="bg-[rgba(239,68,68,0.84)] hover:bg-[#dc2626] cursor-pointer text-white"
              onClick={() => onSelect("no")}
            >
              Regretfully declines
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center text-center text-md leading-normal mt-3">
          <button
            type="button"
            onClick={onLeaveNote}
            className="cursor-pointer underline underline-offset-2"
          >
            Leave a note for the couple{" "}
            <ExternalLink className="inline-block h-3.5 w-3.5 mb-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
