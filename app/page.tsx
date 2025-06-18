import SplashCursor from "../blocks/Animations/SplashCursor/SplashCursor";
import Particles from "../blocks/Backgrounds/Particles/Particles";

import AOSInitializer from "./components/AOSInitializer";
import Hero from "./components/Hero";
import LabCards from "./components/LabCards";
import About from "./components/About";
import TechCreativity from "./components/TechCreativity";
import ClientLogos from "./components/ClientLogos";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <div className="relative text-white font-mono px-4 sm:px-6 md:px-20 pt-16 pb-12 space-y-40">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <SplashCursor />
      </div>
      <div className="absolute inset-0 -z-10">
        <Particles />
      </div>
      <AOSInitializer />
      <Hero />
      <LabCards />
      <About />
      <TechCreativity />
      <ClientLogos />
      <ContactSection />
    </div>
  );
}
