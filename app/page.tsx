import Particles from "../blocks/Backgrounds/Particles/Particles";
import CanvasCursor from './components/CanvasCursor';

import AOSInitializer from "./components/AOSInitializer";
import Hero from "./components/Hero";
import LabCards from "./components/LabCards";
import About from "./components/About";
import TechCreativity from "./components/TechCreativity";
import ClientLogos from "./components/ClientLogos";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <div className="relative text-white font-mono px-4 sm:px-6 md:px-20">
      <div className="absolute inset-0 -z-10">
        <CanvasCursor />
        <Particles />
      </div>
      <AOSInitializer />
      <Hero />
      <LabCards />
      <About />
      <div id="tech-creativity" className="pt-16 scroll-mt-20">
        <TechCreativity />
      </div>
      <ClientLogos />
      <ContactSection />
    </div>
  );
}
