"use client";

import { useState } from "react";
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
import { UserRoundPlus, UserRoundX } from "lucide-react";

function TestPoint() {
  const [currentName, setCurrentName] = useState("");
  const [names, setNames] = useState<string[]>([]);

  const handleAdd = () => {
    const trimmed = currentName.trim();
    if (!trimmed) return;

    setNames((prev) => [...prev, trimmed]);
    setCurrentName("");
  };

  const updateAddedName = (index: number, value: string) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
  };

  const removeAddedName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex align-center justify-center min-h-dvh w-full bg-amber-200">
        <div className="flex flex-col align-center justify-center min-h-dvh max-w-2xl bg-amber-200">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Scrollable Content</Button>
            </DrawerTrigger>
            <DrawerContent className="mx-auto max-w-lg w-full">
              <DrawerHeader>
                <DrawerTitle>Scribble your name in History</DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <div className="no-scrollbar overflow-y-auto p-4">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div className="relative flex items-center w-90 leading-normal ">
                    <Input
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
                    <UserRoundPlus
                      className="absolute right-3 h-5 w-5 cursor-pointer"
                      onClick={handleAdd}
                    />
                  </div>
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
                      <UserRoundX
                        aria-label="Remove name"
                        className="absolute right-3 h-5 w-5 cursor-pointer"
                        onClick={() => removeAddedName(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    className="bg-transparent text-foreground hover:bg-muted/80 py-5 px-10 cursor-pointer"
                    variant="outline"
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
        </div>
      </div>
    </>
  );
}

export default TestPoint;
