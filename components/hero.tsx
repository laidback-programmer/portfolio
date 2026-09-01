"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline, stagger } from "animejs";
import { Mail, ChevronsDown, Loader2 } from "lucide-react";


function ResumeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="19" x2="12" y2="11" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIALS = [
  {
    icon: GithubIcon,
    href: "https://github.com/laidback-programmer",
    label: "GitHub",
    external: true,
    hoverClass: "hover:border-white hover:text-white",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/arya-kant-rajvanshi-141bbb28a",
    label: "LinkedIn",
    external: true,
    hoverClass: "hover:border-blue-500 hover:text-blue-300",
  },
  {
    icon: Mail,
    href: "mailto:atwork.arya@gmail.com",
    label: "Email",
    external: false,
    hoverClass: "hover:border-red-500 hover:text-red-300",
  },
  {
    icon: ResumeIcon,
    href: "/resume.pdf",
    label: "Resume",
    external: true,
    hoverClass: "hover:border-green-500 hover:text-green-300",
  },
];

export function Hero() {
  const scope = useRef<HTMLDivElement>(null);
  const [loadingLabel, setLoadingLabel] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    if (label === "Resume") {
      setLoadingLabel(label);
      // Simulate loading state for 500ms
      setTimeout(() => setLoadingLabel(null), 500);
    }
  };

  useEffect(() => {
    const tl = createTimeline({ defaults: { ease: "outQuad" } });
    tl.add(".hero-greeting", {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 600,
    })
      .add(
        ".hero-role",
        { opacity: [0, 1], translateY: [12, 0], duration: 500 },
        "-=300",
      )
      .add(
        ".hero-social",
        {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 350,
          delay: stagger(60),
        },
        "-=250",
      )
      .add(".hero-scroll", { opacity: [0, 1], duration: 400 }, "-=150");
  }, []);

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-6 text-center"
    >
      {/* Bottom glowing line */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.8)]"
        aria-hidden="true"
      />
      <h1 className="hero-greeting font-display text-11xl font-semibold tracking-tight opacity-0 sm:text-7xl">
        Hi, I&apos;m Arya Kant Rajvanshi
      </h1>

      <p className="hero-role mt-6 font-display text-5xl font-medium text-primary opacity-0 sm:text-4xl">
        AI Engineer
      </p>

      {/* Socials row */}
      <div className="mt-6 flex items-center gap-4 pb-4">
        {SOCIALS.map(({ icon: Icon, href, label, external, hoverClass }) => (
          <div key={label} className="relative">
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={label}
              onClick={(e) => handleSocialClick(e, label)}
              onMouseEnter={() => setHoveredLabel(label)}
              onMouseLeave={() => setHoveredLabel(null)}
              className={`hero-social flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground opacity-0 transition-colors ${hoverClass}`}
            >
              {loadingLabel === label ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Icon className="h-4 w-4" />
              )}
            </a>
            {hoveredLabel === label && (
              <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 transform rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-gray-200 whitespace-nowrap">
                {label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scroll button — now sits below the socials */}
      <a
        href="#me"
        aria-label="Scroll to about section"
        className="hero-scroll mt-16 flex h-11 w-11 animate-bounce items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-transform hover:scale-105"
      >
        <ChevronsDown className="h-5 w-5" />
      </a>
    </section>
  );
}
