"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-10-04T10:00:00+05:30");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function CountDownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const initial = setTimeout(() => {
      setTimeLeft(getTimeLeft());
    }, 0);

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  const display = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const units: { label: string; value: number }[] = [
    { label: "days", value: display.days },
    { label: "hours", value: display.hours },
    { label: "min", value: display.minutes },
    { label: "sec", value: display.seconds },
  ];

  return (
    <div className="grid grid-flow-col gap-4 text-center auto-cols-max md:my-5">
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1 rounded-md bg-crimson-violet px-3 py-2 text-background"
        >
          <span
            key={value}
            className="font-mono text-fluid-lg tabular-nums transition-all duration-300 ease-out"
          >
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase tracking-wide opacity-80">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CountDownTimer;
