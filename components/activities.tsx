"use client";

import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";

export function Activities() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = scope.current;
    if (!section) return;

    const headingEl = section.querySelector(".skills-heading");
    const bodyEl = section.querySelector(".skills-body");

    if (!headingEl || !bodyEl) return;

    const tl = createTimeline({ defaults: { ease: "outQuad" } });
    tl.add(headingEl, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 600,
    }).add(
      bodyEl,
      { opacity: [0, 1], translateY: [12, 0], duration: 500 },
      "-=300",
    );
  }, []);

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-10 text-center"
    >
      <h2 className="skills-heading mb-4 text-3xl font-bold text-primary">
        Skills
      </h2>
      <p className="skills-body max-w-xl text-lg text-secondary">
        I have a strong foundation in web development and a passion for creating
        innovative solutions. My skills include:
      </p>
      <ul className="skills-list mt-6 grid grid-cols-2 gap-4 text-left text-secondary sm:grid-cols-3">
        <li>JavaScript (ES6+)</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>Next.js</li>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB</li>
        <li>SQL</li>
        <li>HTML & CSS</li>
        <li>Git & GitHub</li>
      </ul>
    </section>
  );
}
