"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { Plus } from "lucide-react";

const SKILL_GROUPS = [
  {
    title: "development",
    skills: [
      "Python",
      "C",
      "C++",
      "JavaScript",
      "Tailwind CSS",
      "Typescript",
      "Debian CLI",
      "Flutter",
      "Dart",
      "React.js",
      "Next.js",
      "Firebase",
      "MySQL",
      
    ],
  },
  {
    title: "creatives",
    skills: ["figma", "davinci resolve", "canva", "photoshop", "premiere pro"],
  },
  {
    title: "ai & devops",
    skills: [
      "git",
      "github",
      "AWS",
      "cursor ai",
      "antigravity",
      "hugging face",
      "prompt engineering",
      "git kraken",
      "github actions",
    ],
  },
];

export function Skills() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = scope.current;
    if (!section) return;

    const headingEl = section.querySelector(".skills-heading");
    const groupEls = section.querySelectorAll(".skill-group");

    if (!headingEl || groupEls.length === 0) return;

    const tl = createTimeline({ defaults: { ease: "outQuad" } });
    tl.add(headingEl, { opacity: [0, 1], translateY: [16, 0], duration: 600 });

    groupEls.forEach((groupEl, i) => {
      const titleEl = groupEl.querySelector(".skill-group-heading");
      const pillEls = groupEl.querySelectorAll(".skill-pill");

      if (!titleEl) return;

      tl.add(
        titleEl,
        { opacity: [0, 1], translateX: [-10, 0], duration: 400 },
        i === 0 ? "-=250" : "-=200",
      ).add(
        pillEls,
        {
          opacity: [0, 1],
          translateY: [8, 0],
          duration: 300,
          delay: stagger(30),
        },
        "-=250",
      );
    });
  }, []);

  return (
    <section
      id="skills"
      ref={scope}
      className="mx-auto max-w-5xl scroll-mt-40 px-6 pb-24 pt-40 pb-40"
    >
      <h2 className="skills-heading mb-16 font-display text-3xl font-semibold tracking-tight opacity-0 sm:text-5xl">
        things i know my way around~
      </h2>

      <div className="space-y-14">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="skill-group">
            <div className="skill-group-heading mb-4 flex items-center gap-2 opacity-0">
              <Plus className="h-5 w-5 text-accent" strokeWidth={2.5} />
              <h3 className="font-display text-lg font-semibold sm:text-xl">
                {group.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill rounded-full bg-gradient-to-r from-neutral-800 to-neutral-900 px-4 py-2 font-mono text-sm text-white opacity-0 transition-all duration-700 hover:from-violet-500 hover:to-fuchsia-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
