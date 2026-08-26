"use client";

import { useEffect, useState } from "react";
import { couple } from "@/content";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getTimeLeft(targetMs: number): TimeLeft {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  return { days, hours, minutes, seconds, done: false };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type CountdownProps = {
  className?: string;
};

export function Countdown({ className = "" }: CountdownProps) {
  const targetMs = new Date(couple.wedding.ceremonyAt).getTime();
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(targetMs));
    const id = window.setInterval(() => {
      setTime(getTimeLeft(targetMs));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  if (!time) {
    return (
      <div
        className={`mx-auto w-full max-w-md ${className}`}
        aria-hidden
        style={{ minHeight: "7.5rem" }}
      />
    );
  }

  if (time.done) {
    return (
      <div className={`mx-auto w-full max-w-md text-center ${className}`}>
        <p className="font-display text-xl tracking-wide text-primary-700 md:text-2xl">
          The celebration has begun
        </p>
        <p className="mt-2 font-body text-xs tracking-[0.28em] text-accent-600 uppercase">
          With love & blessings
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: String(time.days) },
    { label: "Hours", value: pad(time.hours) },
    { label: "Mins", value: pad(time.minutes) },
    { label: "Secs", value: pad(time.seconds) },
  ] as const;

  return (
    <div
      className={`mx-auto w-full max-w-md text-center ${className}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Countdown to the wedding: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`}
    >
      <p className="mb-5 font-body text-[0.65rem] tracking-[0.35em] text-primary-400 uppercase md:text-xs">
        Until we meet
      </p>

      <div className="flex items-stretch justify-center gap-0">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-stretch">
            {i > 0 && (
              <div
                className="mx-2 w-px self-stretch bg-gradient-to-b from-transparent via-accent-400/50 to-transparent md:mx-3"
                aria-hidden
              />
            )}
            <div className="flex min-w-[3.4rem] flex-col items-center px-1 md:min-w-[4.25rem]">
              <span className="font-display text-3xl leading-none tracking-wide text-primary-700 tabular-nums md:text-4xl">
                {unit.value}
              </span>
              <span className="mt-2 font-body text-[0.6rem] tracking-[0.22em] text-accent-600 uppercase md:text-[0.65rem]">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
