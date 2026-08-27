"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
}

const PROJECTS: Project[] = [
  {
    title: "Tarang",
    category: "Cross-platform Flutter Application",
    description:
      "A disaster management platform designed to improve real-time hazard awareness and response.",
    image: "/tarang.png",
    tech: ["Flutter", "FastAPI", "Firebase"],
    github: "https://github.com/laidback-programmer/Tarang",
  },
  {
    title: "Tether",
    category: "Custom ViT Model for brain classification and segmentation",
    description:
      "A deep learning pipeline for brain tumor segmentation and classification using modern transformer-based architectures.",
    image: "/projects/brain-tumor.jpg",
    tech: ["Python", "PyTorch", "Swin Transformer"],
    github: "https://github.com/laidback-programmer/tether",
  },
  {
    title: "Portfolio",
    category: "Personal Website",
    description:
      "A personal portfolio focused on interactive motion, visual storytelling, and experimental interfaces.",
    image: "/portfolio.png",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Shadcnui"],
    github: "https://github.com/laidback-programmer/portfolio",
  },
  {
    title: "ContractGuard",
    category: "Document Analyzer",
    description:
      "AI-powered contract analyzer that detects risks, simplifies legal clauses, and provides smart legal recommendations.",
    image: "/projects/contractguard.jpg",
    tech: [
      "React.js",
      "TailwindCSS",
      "FastAPI",
      "MongoDB",
      "PyPDF",
      "NumPy",
      "Axios",
    ],
    github: "https://github.com/laidback-programmer/ContractGuard",
  },
];

const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 0.5 };

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isInContainer, setIsInContainer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      mouseX.set(e.clientX + 16);
      mouseY.set(e.clientY + 16);
    },
    [mouseX, mouseY],
  );

  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32 md:pt-40"
    >
      <h2 className="mb-12 text-center font-display text-3xl font-semibold tracking-tight sm:mb-16 sm:text-4xl md:mb-20 md:text-5xl">
        the journey so far~
      </h2>

      <div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInContainer(true)}
        onMouseLeave={() => {
          setIsInContainer(false);
          setHoveredProject(null);
        }}
      >
        <div className="flex flex-col">
          {PROJECTS.map((project, index) => {
            const isHovered = hoveredProject?.title === project.title;
            const isDimmed = hoveredProject !== null && !isHovered;

            return (
              <article
                key={project.title}
                className="group border-t border-border transition-opacity duration-300 last:border-b"
                style={{ opacity: isDimmed ? 0.35 : 1 }}
                onMouseEnter={() => setHoveredProject(project)}
                onClick={() => {
                  window.open(project.github, "_blank", "noopener,noreferrer");
                }}
              >
                {/* Mobile / Tablet */}
                <div className="py-6 md:hidden">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium">
                        {project.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-900">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority={index === 0}
                      unoptimized
                    />
                  </div>

                  <p className="mb-4 w-full max-w-nonetext-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Desktop */}
                <div className="relative hidden cursor-pointer py-8 md:block md:py-10">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-4">
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-display text-2xl font-medium transition-transform duration-300 group-hover:translate-x-2 lg:text-3xl">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {project.category}
                          </p>
                        </div>
                      </div>
                      <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:text-base">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground transition-colors duration-300 group-hover:border-white/30 group-hover:text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -8,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-8 right-0 text-lg"
                  >
                    ↗
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {hoveredProject && isInContainer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ x: smoothX, y: smoothY }}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[300px] overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-md will-change-transform md:block lg:w-[380px]"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
              <Image
                src={hoveredProject.image}
                alt={`${hoveredProject.title} preview`}
                fill
                sizes="480px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-white">
                  {hoveredProject.title}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {hoveredProject.category}
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                preview
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
