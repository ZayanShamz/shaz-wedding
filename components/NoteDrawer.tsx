import React from "react";
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
import { HatGlasses } from "lucide-react";
import { Textarea } from "./ui/textarea";

type NoteDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function NoteDrawer({ open, onOpenChange }: NoteDrawerProps) {
  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="mx-auto max-w-lg w-full">
          <DrawerHeader>
            <DrawerTitle>
              <p className="text-fluid-lg font-cg font-semibold text-midnight-purple tracking-wide">
                Leave something fun?
              </p>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto p-4">
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex flex-col justify-center items-start gap-1 w-90 leading-normal ">
                <Input placeholder="Your name if you may" />
                <div className="pl-3 flex items-center gap-1 text-xs text-gray-700">
                  <HatGlasses className="h-4 w-4" /> Stay anonymous if you want,
                  we won&apos;t judge.
                </div>
              </div>
              <div className="flex items-center w-90 leading-normal ">
                <Textarea placeholder="Write your message here..." />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                className="bg-transparent text-fluid-base text-midnight-purple hover:bg-muted/80 py-5 px-10 cursor-pointer
                focus-visible:border-midnight-purple/60 focus-visible:ring focus-visible:ring-midnight-purple"
                variant="outline"
              >
                Skip
              </Button>
            </DrawerClose>
            <Button
              className="bg-midnight-purple text-amber-50 border-black/60 hover:bg-midnight-violet hover:text-amber-50
                focus-visible:border-midnight-purple/60 focus-visible:ring focus-visible:ring-midnight-purple py-5 px-10 cursor-pointer"
              variant="outline"
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NoteDrawer;
