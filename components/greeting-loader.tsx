// components/greeting-loader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { animate } from "animejs";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Hallo",
  "Olá",
  "Привет",
  "こんにちは",
  "안녕하세요",
  "नमस्ते",
];

const WORD_INTERVAL = 260; // ms per word swap

export function GreetingLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalDuration = GREETINGS.length * WORD_INTERVAL;

    const wordTimer = setInterval(() => {
      setIndex((i) => Math.min(i + 1, GREETINGS.length - 1));
    }, WORD_INTERVAL);

    // anime.js v4: note the API is `animate()`, not `anime()`, and
    // callbacks are onUpdate/onComplete (v3 used update/complete)
    const counter = { value: 0 };
    animate(counter, {
      value: 100,
      duration: totalDuration,
      ease: "inOutQuad", // v4 dropped the "ease" prefix from easing names
      onUpdate: () => {
        const v = Math.round(counter.value);
        setProgress(v);
        if (barRef.current) barRef.current.style.width = `${v}%`;
      },
      onComplete: () => {
        clearInterval(wordTimer);
        setVisible(false); // hands off to Motion's exit animation
      },
    });

    return () => clearInterval(wordTimer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        exit={{ clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="font-display text-2xl md:text-3xl text-muted-foreground tracking-tight"
          >
            <span className="mr-3 text-muted-foreground/50">•</span>
            {GREETINGS[index]}
          </motion.span>
        </AnimatePresence>
      
        <span className="font-mono absolute bottom-8 right-8 text-4xl md:text-5xl font-semibold text-foreground tabular-nums">
          {progress}%
        </span>
      
        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-border">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: '0%' }}
          />
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
