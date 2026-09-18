"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { Plus } from "lucide-react";

const SKILL_GROUPS = [
  {
    
    title: "AI / MACHINE LEARNING",
    skills: [
      "Python",
      "PyTorch",
      "Transformers",
      "Hugging Face",
      "Computer Vision",
      "Deep Learning",
      "Evidential Deep Learning",
      "Model Evaluation",
      "OpenCV",
      "Albumentations",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "Prompt Engineering",
    ],
  },
  {
    
    title: "SOFTWARE / DEVELOPMENT",
    skills: [
      "C",
      "C++",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "FastAPI",
      "Flutter",
      "Dart",
      "Firebase",
      "MongoDB",
      "MySQL",
    ],
  },
  {
    
    title: "CLOUD / DEVOPS",
    skills: ["AWS", "Git", "GitHub", "GitHub Actions", "Debian CLI"],
  },
  {
    
    title: "DESIGN / CREATIVE",
    skills: ["Figma", "Photoshop", "DaVinci Resolve", "Canva", "Premiere Pro"],
  },
];

export function Skills() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = scope.current;

    if (!section) return;

    const hasAnimated = { current: false };

    const headingEl = section.querySelector(".skills-heading");
    const groupEls = section.querySelectorAll(".skill-group");

    if (!headingEl || groupEls.length === 0) return;

    const animateSkills = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const tl = createTimeline({
        defaults: {
          ease: "outQuad",
        },
      });

      tl.add(headingEl, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
      });

      groupEls.forEach((groupEl, index) => {
        const titleEl = groupEl.querySelector(".skill-group-heading");
        const pillEls = groupEl.querySelectorAll(".skill-pill");

        if (!titleEl) return;

        tl.add(
          titleEl,
          {
            opacity: [0, 1],
            translateX: [-12, 0],
            duration: 400,
          },
          index === 0 ? "-=250" : "-=200",
        );

        tl.add(
          pillEls,
          {
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 350,
            delay: stagger(28),
          },
          "-=230",
        );
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scope} className="w-full text-center">
      {/* Heading */}
      <div className="mb-14 sm:mb-16">
        <h2 className="mx-auto skills-heading max-w-3xl font-display text-3xl font-semibold tracking-tight opacity-0 sm:text-5xl">
          things i know my way around~
        </h2>

        <p className="mt-4 mx-auto max-w-xl font-mono text-xs leading-6 text-muted-foreground sm:text-sm">
          tools, technologies, and disciplines I use to build, design, and ship
          things.
        </p>
      </div>

      {/* Skill groups */}
      <div className="space-y-12 sm:space-y-14">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="skill-group">
            {/* Group heading */}
            <div className="skill-group-heading mb-5 flex items-center justify-center gap-3 opacity-0">

              <Plus className="h-4 w-4 text-primary" strokeWidth={2.5} />

              <h3 className="font-mono text-sm font-medium tracking-[0.16em] text-muted-foreground">
                {group.title}
              </h3>
            </div>

            {/* Group divider */}
            <div className="mb-5 h-px w-full bg-gradient-to-r from-border justify-center via-border/60 to-transparent" />

            {/* Skill pills */}
            <div className="flex mx-auto justify-center w-full center max-w-4xl flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    skill-pill
                    rounded-full
                    border border-border/70
                    bg-foreground/[0.035]
                    px-3.5 py-1.5
                    font-mono text-xs
                    text-foreground/85
                    opacity-0
                    backdrop-blur-sm
                    transition-colors duration-300
                    hover:border-white
                    hover:bg-white/[0.06]
                    hover:text-white
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
