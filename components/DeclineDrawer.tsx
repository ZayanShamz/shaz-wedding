"use client";

import { useState } from "react";
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
import { Textarea } from "./ui/textarea";

const NAME_MAX_LENGTH = 50;
const MESSAGE_MAX_LENGTH = 500;

type DeclineDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
};

function DeclineDrawer({
  open,
  onOpenChange,
  onSubmitted,
}: DeclineDrawerProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setName("");
    setMessage("");
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    setSubmitting(true);
    try {
      await addDoc(collection(db, "rsvps"), {
        attending: false,
        name: trimmedName || null,
        message: trimmedMessage || null,
        timestamp: serverTimestamp(),
      });
      onSubmitted();
      setSubmitted(true);
    } catch (err) {
      console.error(err);
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
                Who are You???
              </p>
            </DrawerTitle>
            <DrawerDescription className="font-cg text-xl text-white/80 my-5">
              We don&apos;t know you...
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-lg w-full">
        <DrawerHeader>
          <DrawerTitle>
            <p className="text-fluid-lg font-cg font-semibold text-midnight-purple tracking-wide">
              Are you sure about this?.
            </p>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto p-4">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col justify-center items-start gap-1 w-90 leading-normal ">
              <Input
                placeholder="Your name if you dare"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={NAME_MAX_LENGTH}
              />
            </div>
            <div className="flex flex-col items-center w-90 leading-normal ">
              <Textarea
                placeholder="Got anything to say for this betrayal?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={MESSAGE_MAX_LENGTH}
              />
              <div className="block self-end text-xs text-white/50">
                {message.length}/{MESSAGE_MAX_LENGTH}
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              className="font-cg font-medium bg-transparent text-fluid-base text-midnight-purple hover:bg-muted/80 py-5 px-5 cursor-pointer
                focus-visible:border-midnight-purple/60 focus-visible:ring focus-visible:ring-midnight-purple"
              variant="outline"
              onClick={handleClose}
            >
              Wait
            </Button>
          </DrawerClose>
          <Button
            className="font-cg font-medium bg-midnight-purple text-amber-50 border-black/60 hover:bg-midnight-violet hover:text-amber-50
                focus-visible:border-midnight-purple/60 focus-visible:ring focus-visible:ring-midnight-purple py-5 px-10 cursor-pointer"
            variant="outline"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Sending betrayal" : "Not Coming"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DeclineDrawer;
