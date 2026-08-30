"use client";

import { useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Minus, MoveRight, Plus, UserMinus, UserPlus } from "lucide-react";

type RsvpDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function RSVPDrawer({ open, onOpenChange }: RsvpDrawerProps) {
  const [currentName, setCurrentName] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const hasAddedFirstName = names.length > 0;

  const handleAdd = () => {
    const trimmed = currentName.trim();
    if (!trimmed) return;

    const newNames = [...names, trimmed];
    setNames(newNames);
    setCurrentName("");
    inputRef.current?.focus();

    setGuestCount((prev) => Math.max(prev, newNames.length));
  };

  const updateAddedName = (index: number, value: string) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
  };

  const removeAddedName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  const incrementCounter = () => setGuestCount((prev) => prev + 1);

  const decrementCounter = () => {
    setGuestCount((prev) => Math.max(prev - 1, Math.max(1, names.length)));
  };

  const handleSkip = () => {
    setNames([]);
    setCurrentName("");
    setGuestCount(1);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);
    console.log("submitting");

    const trimmedCurrent = currentName.trim();
    const finalNames = trimmedCurrent ? [...names, trimmedCurrent] : names;
    const finalGuestCount = Math.max(guestCount, finalNames.length);

    try {
      await addDoc(collection(db, "rsvps"), {
        attending: true,
        guestCount: finalGuestCount,
        names: finalNames,
        timestamp: serverTimestamp(),
      });
      console.log("submitted");
      setSubmitted(true);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="mx-auto max-w-lg w-full">
          <DrawerHeader>
            <DrawerTitle>
              <p className="text-fluid-lg font-cg font-semibold text-midnight-purple">
                Thank you!
              </p>
            </DrawerTitle>
            <DrawerDescription className="font-cg text-xl text-white/80 my-5">
              Your RSVP has been received.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="mx-auto max-w-lg w-full">
          <DrawerHeader>
            <DrawerTitle>
              <p className="text-fluid-lg font-cg font-semibold text-midnight-purple">
                Scribble your names
              </p>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto p-4">
            <div className="flex flex-col gap-4 justify-center items-center">
              {names.map((name, index) => (
                <div
                  key={index}
                  className="relative flex items-center w-90 leading-normal"
                >
                  <Input
                    type="text"
                    className="w-full pr-10"
                    value={name}
                    onChange={(e) => updateAddedName(index, e.target.value)}
                  />
                  <UserMinus
                    aria-label="Remove name"
                    className="absolute right-3 h-5 w-5 cursor-pointer"
                    onClick={() => removeAddedName(index)}
                  />
                </div>
              ))}
              <div className="relative flex items-center w-90 leading-normal ">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Your name if you may"
                  className="w-full pr-10"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAdd();
                    }
                  }}
                />
                {hasAddedFirstName && (
                  <UserPlus
                    className="absolute right-3 h-5 w-5 cursor-pointer"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleAdd}
                  />
                )}
              </div>
              {!hasAddedFirstName && (
                <div className="w-90 flex items-center justify-end">
                  <p
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleAdd}
                    className="text-fluid-base text-white/50 cursor-pointer hover:underline"
                  >
                    Add more names{" "}
                    <MoveRight className="inline-block ms-0.5 h-full w-4" />
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between w-90 mt-1">
                <span className="text-fluid-base text-white/80 font-cg">
                  Total guests
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease guest count"
                    onClick={decrementCounter}
                    disabled={guestCount <= Math.max(1, names.length)}
                    className="flex items-center justify-center h-7 w-7 rounded-full border border-border disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-fluid-base font-mono w-6 text-center tabular-nums">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase guest count"
                    onClick={incrementCounter}
                    className="flex items-center justify-center h-7 w-7 rounded-full border border-border cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                className="bg-transparent text-fluid-base text-midnight-purple hover:bg-muted/80 py-5 px-5 cursor-pointer
                focus-visible:border-midnight-purple/60 focus-visible:ring focus-visible:ring-midnight-purple"
                variant="outline"
                onClick={handleSkip}
              >
                Lemme think on it
              </Button>
            </DrawerClose>
            <Button
              className="bg-midnight-purple text-amber-50 border-black/60 hover:bg-midnight-violet hover:text-amber-50
                focus-visible:border-midnight-purple/60 focus-visible:ring focus-visible:ring-midnight-purple py-5 px-10 cursor-pointer"
              variant="outline"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default RSVPDrawer;
