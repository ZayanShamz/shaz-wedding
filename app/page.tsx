"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import RSVPDrawer from "@/components/RSVPDrawer";
import NoteDrawer from "@/components/NoteDrawer";
import DeclineDrawer from "@/components/DeclineDrawer";

import { hasAlreadySubmitted, markAsSubmitted } from "@/lib/rsvp-storage";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [declineDrawerOpen, setDeclineDrawerOpen] = useState(false);
  const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);
  const [alreadyResponded, setAlreadyResponded] = useState(hasAlreadySubmitted);

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
      {/* <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-3 backdrop-blur-xs" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-3 backdrop-blur-xs" />
      <div className="pointer-events-none fixed left-0 top-3 bottom-3 z-40 w-3 backdrop-blur-xs" />
      <div className="pointer-events-none fixed right-0 top-3 bottom-3 z-40 w-3 backdrop-blur-xs" />
      <div className="pointer-events-none fixed inset-3 z-40 border-2 border-crimson-violet" /> */}
      <div className="pointer-events-none fixed inset-3 z-40 border-2 border-crimson-violet" />
      <main className="mx-auto flex flex-col items-center w-full px-4 md:px-6">
        <Hero
          onSelect={handleSelect}
          onLeaveNote={() => setNoteDrawerOpen(true)}
          alreadyResponded={alreadyResponded}
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
