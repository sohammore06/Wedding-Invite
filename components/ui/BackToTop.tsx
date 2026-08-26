"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScroll } from "@/components/providers/SmoothScrollProvider";

export function BackToTop() {
  const { isScrollLocked, scrollTo } = useScroll();
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useLenis((lenis) => {
    if (isScrollLocked) return;
    const shouldShow = lenis.progress > 0.08;
    if (shouldShow !== visibleRef.current) {
      visibleRef.current = shouldShow;
      setVisible(shouldShow);
    }
  }, [isScrollLocked]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollTo(0)}
          className="fixed right-5 bottom-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-accent-400/40 bg-neutral-50/90 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5 text-accent-600" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
