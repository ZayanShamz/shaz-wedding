"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import RSVPDrawer from "@/components/RSVPDrawer";
import NoteDrawer from "@/components/NoteDrawer";
import DeclineDrawer from "@/components/DeclineDrawer";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [declineDrawerOpen, setDeclineDrawerOpen] = useState(false);
  const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);

  const handleSelect = (value: "yes" | "no") => {
    if (value === "yes") {
      setDrawerOpen(true);
    } else {
      setDeclineDrawerOpen(true);
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
        <DeclineDrawer
          open={declineDrawerOpen}
          onOpenChange={setDeclineDrawerOpen}
        />
        <NoteDrawer open={noteDrawerOpen} onOpenChange={setNoteDrawerOpen} />
      </main>
    </>
  );
}
