"use client";

import { useEffect, useRef } from "react";

export function useDrawerHistory(
  open: boolean,
  onOpenChange: (open: boolean) => void,
) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!open) return;

    if (!pushed.current) {
      window.history.pushState({ drawer: true }, "");
      pushed.current = true;
    }

    const handlePopState = () => {
      // User pressed back -- close the drawer
      onOpenChange(false);
      pushed.current = false;
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) return;

    if (pushed.current) {
      window.history.replaceState(null, "");
      pushed.current = false;
    }
  }, [open]);
}
