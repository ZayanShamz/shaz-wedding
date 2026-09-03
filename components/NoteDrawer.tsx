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
import { HatGlasses, Heart } from "lucide-react";
import { Textarea } from "./ui/textarea";

const NAME_MAX_LENGTH = 50;
const MESSAGE_MAX_LENGTH = 500;

type NoteDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function NoteDrawer({ open, onOpenChange }: NoteDrawerProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setName("");
    setMessage("");
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError("What you submitting? There's nothing here!");
      return;
    }
    if (trimmedMessage.length > MESSAGE_MAX_LENGTH) {
      setError(`You're yapping tooo much...`);
      return;
    }

    const trimmedName = name.trim();
    if (trimmedName.length > NAME_MAX_LENGTH) {
      setError(`your name toooo long!`);
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "notes"), {
        name: trimmedName || null, // null for anonymous
        message: trimmedMessage,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
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
                Thank you!{" "}
                <Heart className="inline-block h-full w-4 text-crimson-violet fill-crimson-violet mb-1" />
              </p>
            </DrawerTitle>
            <DrawerDescription className="font-cg text-xl text-white/80 my-5">
              Your message has been left for the couple.
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
              <p className="text-fluid-lg font-cg font-semibold text-midnight-purple tracking-wide">
                Leave a message for us.
              </p>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto p-4">
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex flex-col justify-center items-start gap-1 w-90 leading-normal ">
                <Input
                  placeholder="Let us know who you are"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={NAME_MAX_LENGTH}
                />
                <div className="pl-3 flex items-center gap-1 text-xs text-gray-700">
                  <HatGlasses className="h-4 w-4" /> Or stay anonymous if you
                  want, no one will know.
                </div>
              </div>
              <div className="flex flex-col items-center w-90 leading-normal ">
                <Textarea
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={MESSAGE_MAX_LENGTH}
                />
                <div className="block self-end text-xs text-white/50">
                  {message.length}/{MESSAGE_MAX_LENGTH}
                </div>
              </div>
              {error && (
                <p className="font-cg text-fluid-sm text-background">{error}</p>
              )}
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
                Maybe Later
              </Button>
            </DrawerClose>
            <Button
              className="font-cg font-medium bg-midnight-purple text-amber-50 border-black/60 hover:bg-midnight-violet hover:text-amber-50
                focus-visible:border-midnight-purple/60 focus-visible:ring focus-visible:ring-midnight-purple py-5 px-10 cursor-pointer"
              variant="outline"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NoteDrawer;
