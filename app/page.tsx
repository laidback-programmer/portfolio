"use client";

import { useState } from "react";
import { About } from "@/components/about";
import { GreetingLoader } from "@/components/greeting-loader";
import { Hero } from "@/components/hero";
import { Activities } from "@/components/activities";
import { Skills } from "@/components/skills";
import { ContactForm } from "@/components/contact_form";
import Projects from "@/components/projects";
import GlassSection from "@/components/ui/glass-effect";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <GreetingLoader onComplete={() => setLoading(false)} />}

      <main className="relative z-10 flex flex-col gap-5 px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
        <section id="hero">
          <Hero />
        </section>

        {/* About */}
        <GlassSection id="about">
          <About />
        </GlassSection>

        {/* Projects */}
        <section id="projects">
          <Projects />
        </section>

        {/* Skills */}
        <GlassSection id="skills">
          <Skills />
        </GlassSection>

        {/* Activities */}
        <GlassSection id="activities">
          <Activities />
        </GlassSection>

        {/* Contact */}
        <GlassSection id="contact" className="py-6 sm:py-8 lg:py-10">
          <ContactForm />
        </GlassSection>
      </main>
    </>
  );
}
