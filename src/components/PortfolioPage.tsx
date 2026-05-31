"use client";

import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { PortfolioMagazineSection } from "@/components/sections/PortfolioMagazineSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";

export function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ProjectShowcase />
        <ProcessSection />
        <AboutSection />
        <PortfolioMagazineSection />
      </main>
      <Footer />
    </>
  );
}
