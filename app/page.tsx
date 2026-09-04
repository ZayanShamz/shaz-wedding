"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import RSVPDrawer from "@/components/RSVPDrawer";
import NoteDrawer from "@/components/NoteDrawer";
import DeclineDrawer from "@/components/DeclineDrawer";
import IntroSplash from "@/components/IntroSplash";

import { hasAlreadySubmitted, markAsSubmitted } from "@/lib/rsvp-storage";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [declineDrawerOpen, setDeclineDrawerOpen] = useState(false);
  const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);

  const [alreadyResponded, setAlreadyResponded] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlreadyResponded(hasAlreadySubmitted());
      setHasChecked(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const handleSelect = (value: "yes" | "no") => {
    if (alreadyResponded) return;

    if (value === "yes") {
      setDrawerOpen(true);
    } else {
      setDeclineDrawerOpen(true);
    }
  };

  const handleResponded = () => {
    markAsSubmitted();
    setAlreadyResponded(true);
  };

  return (
    <>
      <IntroSplash />
      <div className="pointer-events-none fixed inset-3 z-40 border-2 border-crimson-violet" />
      <main className="mx-auto flex flex-col items-center w-full px-4 md:px-6">
        <Hero
          onSelect={handleSelect}
          onLeaveNote={() => setNoteDrawerOpen(true)}
          alreadyResponded={alreadyResponded}
          hasChecked={hasChecked}
        />
        <RSVPDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          onSubmitted={handleResponded}
        />
        <DeclineDrawer
          open={declineDrawerOpen}
          onOpenChange={setDeclineDrawerOpen}
          onSubmitted={handleResponded}
        />
        <NoteDrawer open={noteDrawerOpen} onOpenChange={setNoteDrawerOpen} />
      </main>
    </>
  );
}
