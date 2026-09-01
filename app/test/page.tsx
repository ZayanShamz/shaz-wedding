"use client";

import { useEffect, useState } from "react";
import { backgrounds } from "@/app/backgrounds/backgrounds";

import { Separator } from "@/components/ui/separator";
import { Calendar, CalendarHeart, Link, MapPinned } from "lucide-react";

function TestPoint() {
  const [selectedBackground, setSelectedBackground] = useState(0);

  useEffect(() => {
    document.body.style.backgroundImage = backgrounds[selectedBackground];

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [selectedBackground]);

  return (
    <>
      <div className="flex align-center justify-center min-h-dvh w-full">
        <div className="flex flex-col align-center justify-center min-h-dvh max-w-2xl">
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="bg-crimson-violet/20 border border-crimson-violet/30 rounded-lg p-4">
              <p className="text-midnight-purple text-fluid-md text-center">
                Selected Background: {selectedBackground + 1}
              </p>
              <div className="flex flex-row gap-2 align-center justify-center mt-2">
                {[1, 2, 3, 4, 5, 6].map((number) => {
                  const index = number - 1;

                  return (
                    <button
                      key={number}
                      type="button"
                      onClick={() => setSelectedBackground(index)}
                      className={`px-2 rounded-sm cursor-pointer transition-all ${
                        selectedBackground === index
                          ? "bg-crimson-violet text-burn-pink scale-110"
                          : "bg-crimson-violet/40 text-burn-pink/70 hover:bg-crimson-violet hover:text-burn-pink"
                      }`}
                    >
                      {number}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-start gap-4 md:gap-20 px-5 mt-3">
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shaz+and+Renna+Wedding&dates=20261004T043000Z/20261004T083000Z&details=Join+us+for+our+wedding&location=Airport+Garden+Convention+Center%2C+Karipur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col justify-center items-center cursor-pointer min-w-0"
            >
              <div className="bg-crimson-violet rounded-3xl p-5 mb-2 shadow-lg">
                <CalendarHeart className="text-background h-8 w-8" />
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
              <div className="bg-crimson-violet rounded-3xl p-5 cursor-pointer mb-2 shadow-lg">
                <MapPinned className="text-background h-8 w-8 md:h-8 md:w-8" />
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
        </div>
      </div>
    </>
  );
}

export default TestPoint;
