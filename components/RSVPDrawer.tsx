"use client";

import { useRef, useState } from "react";
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
import { MoveRight, UserMinus, UserPlus } from "lucide-react";

type RsvpDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function RSVPDrawer({ open, onOpenChange }: RsvpDrawerProps) {
  const [currentName, setCurrentName] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasAddedFirstName = names.length > 0;

  const handleAdd = () => {
    const trimmed = currentName.trim();
    if (!trimmed) return;

    setNames((prev) => [...prev, trimmed]);
    setCurrentName("");
    inputRef.current?.focus();
  };

  const updateAddedName = (index: number, value: string) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
  };

  const removeAddedName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSkip = () => {
    setNames([]);
    setCurrentName("");
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="mx-auto max-w-lg w-full">
          <DrawerHeader>
            <DrawerTitle>Scribble your name in History</DrawerTitle>
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
                    className="text-sm text-white cursor-pointer"
                  >
                    Add more guests{" "}
                    <MoveRight className="inline-block ms-0.5 h-full w-4" />
                  </p>
                </div>
              )}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                className="bg-transparent text-foreground hover:bg-muted/80 py-5 px-10 cursor-pointer"
                variant="outline"
                onClick={handleSkip}
              >
                Skip
              </Button>
            </DrawerClose>
            <Button
              className="bg-black/60 text-amber-50 border-black/60 hover:bg-black/10 hover:backdrop-blur-3xl hover:text-amber-50 py-5 px-10 cursor-pointer"
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

export default RSVPDrawer;
