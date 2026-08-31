"use client";

import { useState } from "react";
import { About } from "@/components/about";
import { GreetingLoader } from "@/components/greeting-loader";
import { Hero } from "@/components/hero";
import { Activities } from "@/components/activities";
import { Skills } from "@/components/skills";
import { ContactForm } from "@/components/contact_form";
import Projects from "@/components/projects";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <GreetingLoader onComplete={() => setLoading(false)} />}

      <main className="relative z-10">
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="activities">
          <Activities />
        </section>

        <section id="contact">
          <ContactForm />
        </section>
      </main>
    </>
  );
}