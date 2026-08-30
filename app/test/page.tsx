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
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { MoveRight, UserMinus, UserPlus } from "lucide-react";

function TestPoint() {
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
      <div className="flex align-center justify-center min-h-dvh w-full bg-amber-200">
        <div className="flex flex-col align-center justify-center min-h-dvh max-w-2xl bg-amber-200">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                Scrollable Content
              </Button>
            </DrawerTrigger>
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
                        className="text-sm text-white/50 cursor-pointer hover:underline"
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
                    className="bg-transparent text-fluid-base text-midnight-purple hover:bg-muted/80 py-5 px-10 cursor-pointer
                focus-visible:border-midnight-purple/60 focus-visible:ring focus-visible:ring-midnight-purple"
                    variant="outline"
                    onClick={handleSkip}
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
        </div>
      </div>
    </>
  );
}

export default TestPoint;
