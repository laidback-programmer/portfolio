"use client";

import { useState } from "react";
import { About } from "@/components/about";
import { GreetingLoader } from "@/components/greeting-loader";
import { Hero } from "@/components/hero";
import { Activities } from "@/components/activities"
import { Skills } from "@/components/skills";
import { ContactForm } from "@/components/contact_form";
import Projects from "@/components/projects";
import Larry from "@/components/Larry";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className=" relative pt-24">
      <Larry />
      {loading && <GreetingLoader onComplete={() => setLoading(false)} />}

      <section id="hero" className="relative z-20">
        <Hero />
      </section>

      <section id="about" className="relative z-20">
        <About />
      </section>

      <section id="projects" className="relative z-20">
        <Projects />
      </section>

      <section id="skills" className="relative z-20">
        <Skills />
      </section>

      <section id="activities" className="relative z-20">
        <Activities />
      </section>

      <section id="contact" className="relative z-20">
        <ContactForm />
      </section>
    </main>
  );
}
