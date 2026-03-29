"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text?: string;
  className?: string;
  letterDelay?: number;
}

export function RevealText({
  text = "STUNNING",
  className = "",
  letterDelay = 0.06,
}: RevealTextProps) {
  return (
    <span className="inline-flex">
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          className={className}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: index * letterDelay,
            type: "spring",
            damping: 8,
            stiffness: 200,
            mass: 0.8,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
