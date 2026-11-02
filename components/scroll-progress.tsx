"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold progress rule pinned to the top edge, springing with the scroll. */
export function ScrollProgress() {
  // Reduced motion hides the bar with CSS (motion-reduce:hidden). Returning
  // null here instead made the client tree differ from the server HTML.
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gold motion-reduce:hidden"
    />
  );
}
