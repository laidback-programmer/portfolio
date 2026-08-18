"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";
import Image from "next/image";
import meImage from "./me.png";

const CYCLE_WORDS = ["developer", "builder", "learner"];

function RotatingWord() {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;

    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const cycle = () => {
      animate(el, {
        translateY: [0, -14],
        opacity: [1, 0],
        duration: 280,
        ease: "inQuad",
        onComplete: () => {
          index = (index + 1) % CYCLE_WORDS.length;
          el.textContent = CYCLE_WORDS[index];
          animate(el, {
            translateY: [14, 0],
            opacity: [0, 1],
            duration: 280,
            ease: "outQuad",
            onComplete: () => {
              timeoutId = setTimeout(cycle, 1400);
            },
          });
        },
      });
    };

    timeoutId = setTimeout(cycle, 1400);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <span className="relative inline-block h-[1.3em] w-24 overflow align-baseline">
      <span ref={wordRef} className="inline-block text-xl font-medium text-primary">
        {CYCLE_WORDS[0]}
      </span>
    </span>
  );
}

export function About() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = scope.current;
    if (!section) return;

    const eyebrowEl = section.querySelector(".about-eyebrow");
    const photoEl = section.querySelector(".about-photo");
    const badgeEl = section.querySelector(".about-badge");
    const leadEl = section.querySelector(".about-lead");
    const bodyEl = section.querySelector(".about-body");
    const tagEl = section.querySelector(".about-tag");

    if (
      !eyebrowEl ||
      !photoEl ||
      !badgeEl ||
      !leadEl ||
      !bodyEl ||
      !tagEl
    )
      return;

    const tl = createTimeline({ defaults: { ease: "outQuad" } });
    tl.add(eyebrowEl, { opacity: [0, 1], translateY: [8, 0], duration: 400 })
    
      .add(
        photoEl,
        { opacity: [0, 1], translateX: [16, 0], duration: 600 },
        "-=350",
      )
      .add(
        badgeEl,
        { opacity: [0, 1], translateY: [12, 0], duration: 450 },
        "-=450",
      )
      .add(
        leadEl,
        { opacity: [0, 1], translateY: [14, 0], duration: 500 },
        "-=300",
      )
      .add(
        bodyEl,
        { opacity: [0, 1], translateY: [14, 0], duration: 500 },
        "-=300",
      )
      .add(
        tagEl,
        { opacity: [0, 1], translateY: [10, 0], duration: 400 },
        "-=250",
      );
  }, []);

  return (
    <section
      id="me"
      ref={scope}
      className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24"
    >
      <p className="about-eyebrow mb-6 text-5xl font-semibold text-sm text-muted-foreground opacity-0 sm:text-3xl">
        a little about me ~
      </p>

      
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_320px] md:items-center md:gap-24">
        <div>
          <span className="about-badge mb-6 inline-flex items-center rounded-full border-border bg-card px-4 py-2 font-display text-xs font-mono ">
            Computer Vision
          </span>
          <span className="about-badge mb-6 inline-flex items-center rounded-full border-border bg-card px-4 py-2 font-display text-xs font-mono ">
            Evidential Deep Learning
          </span>

          <p className="about-lead mb-6 text-lg leading-relaxed opacity-0 sm:text-xl">
            I&apos;m an AI Engineer currently pursuing my final-year Computer
            Science degree at MIET, Meerut, focusing on building{" "}
            <span className="text-primary font-semibold text-xl sm:text-2xl">
              practical intelligent systems that solve real-world problems
            </span>{" "}
            — building models that don&apos;t just predict, but know when to be
            unsure.
          </p>

          <p className="about-body mb-6 text-[15.5px] leading-loose text-muted-foreground opacity-0">
            Alongside coursework, I lead design as Graphics Head at{" "}
            <span className="text-red-400 border-white-300 rounded-full bg-card px-3 py-1">
              Google
            </span>{" "}
            <span className="text-green-500 border-white-300 rounded-full bg-card px-3 py-1">
              Developer
            </span>{" "}
            <span className="text-yellow-500 border-white-300 rounded-full bg-card px-3 py-1">
              Groups
            </span>{" "}
            and{" "}
            <span className="text-blue-500 border-white-300 rounded-full bg-card px-3 py-1">
              MLSA
            </span>
            , including organizing and managing national-level hackathons. I
            like taking projects the full distance — from{" "}
            <span className="text-green-300 border-white-300 rounded-full bg-card px-3 py-1">
              Contract Guard
            </span>
            , an AI-driven contract analysis platform, to{" "}
            <span className="text-orange-400 border-white-300 rounded-full bg-card px-3 py-1">
              TARANG
            </span>
            , a crowdsourced disaster-response cross-platform app
          </p>

          <p className="about-tag text-[15.5px] leading-loose text-muted-foreground">
            I am a <RotatingWord />, and someone who believes every project has something to teach you.
          </p>
        </div>

        <div className="about-photo relative aspect-square w-64 md:w-80 lg:w-[28rem] overflow-hidden rounded-full border-2 border-whiite-400 bg-card opacity-0">
          <Image
            src={meImage}
            alt="Arya"
            fill
            sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 448px"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>
    </section>
  );
}
