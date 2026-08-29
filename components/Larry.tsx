"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Larry() {
  const [isVisible, setIsVisible] = useState(false);
  const hasSeeded = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  });

  const velocityX = useRef(0);
  const velocityY = useRef(0);

  const previousX = useRef(0);
  const previousY = useRef(0);

  const rotate = useMotionValue(0);
  const smoothRotate = useSpring(rotate, {
    stiffness: 100,
    damping: 15,
    mass: 0.5,
  });

  const rotation = useTransform(smoothRotate, [-20, 20], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const targetX = x + 28;
      const targetY = y + 28;

      // First real signal of where the cursor is — snap straight there
      // (via .jump, no spring travel) instead of letting it glide in
      // from the (0,0)-adjacent position the motion values start at.
      if (!hasSeeded.current) {
        hasSeeded.current = true;
        previousX.current = x;
        previousY.current = y;

        mouseX.set(targetX);
        mouseY.set(targetY);
        smoothX.jump(targetX);
        smoothY.jump(targetY);

        setIsVisible(true);
        return;
      }

      mouseX.set(targetX);
      mouseY.set(targetY);

      velocityX.current = x - previousX.current;
      velocityY.current = y - previousY.current;

      const tilt = Math.max(-15, Math.min(15, velocityX.current * 0.5));
      rotate.set(tilt);

      previousX.current = x;
      previousY.current = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, rotate, smoothX, smoothY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-10 hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.4 } }}
    >
      <motion.div
        style={{
          rotate: rotation,
        }}
        animate={{
          y: [0, -8, 0],
          rotateZ: [0, 360],
        }}
        transition={{
          y: {
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotateZ: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="relative h-12 w-12 md:h-[60px] md:w-[60px] lg:h-20 lg:w-20"
      >
        <Image
          src="/coc_larry.png"
          alt=""
          fill
          sizes="(max-width: 768px) 96px, 144px"
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
