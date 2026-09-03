"use client";

import { motion } from "motion/react";
import { useState } from "react";

function IntroSplash() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null; // fully remove from DOM once the animation finishes

  return (
    <div className="fixed inset-0 z-50 flex flex-col pointer-events-none">
      <motion.div
        className="w-full h-1/2 bg-crimson-violet flex flex-col items-center justify-end pointer-events-auto"
        initial={{ y: 0 }}
        animate={{ y: open ? "-100%" : 0 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={() => open && setDismissed(true)}
      >
        <span className="font-arabic font-medium text-fluid-2xl text-burn-pink tracking-wider mb-10">
          بِاسْمِ اللهِ نَبْدَأ
        </span>
        <div className="w-16 h-8 bg-burn-pink rounded-t-full"></div>
      </motion.div>

      <motion.div
        className="w-full h-1/2 bg-crimson-violet flex flex-col items-center justify-start pointer-events-auto"
        initial={{ y: 0 }}
        animate={{ y: open ? "100%" : 0 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="w-16 h-8 bg-burn-pink rounded-b-full"></div>
        <span className="font-cg font-medium text-center text-fluid-md text-burn-pink tracking-wider mt-10">
          &quot;And among His signs is that He created for you spouses.&quot;
        </span>
      </motion.div>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto cursor-pointer border-2 border-burn-pink rounded-full w-18 h-18 m-auto transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burn-pink"
        >
          <span className="font-charis text-fluid-base text-crimson-violet tracking-wide">
            OPEN
          </span>
        </button>
      )}
    </div>
  );
}

export default IntroSplash;
