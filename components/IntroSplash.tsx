"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

function IntroSplash() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null; // fully remove from DOM once the animation finishes

  return (
    <div className="fixed inset-0 z-50 flex flex-col pointer-events-none">
      <motion.div
        className="w-full h-1/2 bg-crimson-violet flex items-end justify-center pointer-events-auto"
        initial={{ y: 0 }}
        animate={{ y: open ? "-100%" : 0 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={() => open && setDismissed(true)}
      >
        <span className="font-arabic font-medium text-fluid-2xl text-burn-pink tracking-wider mb-5">
          بِاسْمِ اللهِ نَبْدَأ
        </span>
      </motion.div>

      <motion.div
        className="w-full h-1/2 bg-crimson-violet flex items-start justify-center pointer-events-auto"
        initial={{ y: 0 }}
        animate={{ y: open ? "100%" : 0 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
      >
        <span className="font-cg font-medium text-center text-fluid-md text-burn-pink tracking-wider mt-5">
          &quot;And among His signs is that He created for you spouses.&quot;
        </span>
      </motion.div>
    </div>
  );
}

export default IntroSplash;
