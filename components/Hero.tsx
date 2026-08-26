"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

type HeroProps = {
  onSelect: (value: "yes" | "no") => void;
  onLeaveNote: () => void;
};

function Hero({ onSelect, onLeaveNote }: HeroProps) {
  return (
    <section className="flex min-h-dvh flex-col border-2">
      <div className="flex flex-1 flex-col items-center justify-center text-center border-2">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          We're getting married
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight text-gray-900">
          Names Here
        </h1>

        <p className="mt-6 text-base text-gray-600">
          Saturday, December 12, 2026
        </p>
        <p className="mt-1 text-base text-gray-600">Venue Name, City</p>
      </div>

      <div className="w-full self-center pb-10 border-2">
        <div className="flex flex-col gap-2 ">
          <span className="text-sm font-medium text-center text-gray-700">
            Will you be attending?
          </span>
          <div className="flex gap-3">
            <Button onClick={() => onSelect("yes")}>Joyfully accepts</Button>
            <Button onClick={() => onSelect("no")}>Regretfully declines</Button>
          </div>
        </div>
        <div className="flex items-center justify-center w-90 text-center text-md leading-normal mt-3">
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
