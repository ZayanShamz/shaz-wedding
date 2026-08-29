"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import RSVPDrawer from "@/components/RSVPDrawer";
import NoteDrawer from "@/components/NoteDrawer";

export default function Home() {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);

  const handleSelect = (value: "yes" | "no") => {
    setAttending(value);
    if (value === "yes") {
      setDrawerOpen(true);
    } else {
      alert("Sorry you can't make it — we'll miss you!");
    }
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-3 z-40 border-2 border-[#4C3032]" />
      <main className="mx-auto flex flex-col items-center w-full">
        <Hero
          onSelect={handleSelect}
          onLeaveNote={() => setNoteDrawerOpen(true)}
        />
        <RSVPDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
        <NoteDrawer open={noteDrawerOpen} onOpenChange={setNoteDrawerOpen} />
      </main>
    </>
  );
}
