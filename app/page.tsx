import SplashCursor from "../blocks/Animations/SplashCursor/SplashCursor";
import Hero from "./components/Hero";
import LabCards from "./components/LabCards";
import About from "./components/About";
import TechCreativity from "./components/TechCreativity";
import ClientLogos from "./components/ClientLogos";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white font-mono px-6 sm:px-20 pt-16 pb-12 space-y-40">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <SplashCursor />
      </div>
      <Hero />
      <LabCards />
      <About />
      <TechCreativity />
      <ClientLogos />
      <ContactSection />
    </div>
  );
}
