import SplashCursor from "../../blocks/Animations/SplashCursor/SplashCursor";
import Particles from "../../blocks/Backgrounds/Particles/Particles";

import AOSInitializer from "../components/AOSInitializer";
import AboutComponent from "../components/About";
import ContactSection from "../components/ContactSection";
export default function About() {
    return (
        <div className="relative text-white font-mono px-4 sm:px-6 md:px-20 pt-16 pb-12 space-y-40">
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <SplashCursor />
            </div>
            <div className="absolute inset-0 -z-10">
                <Particles />
            </div>
            <AOSInitializer />

            {/* Page Title */}
            <div className="pt-20 pb-10" data-aos="fade-up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-center">
                    <span className="bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] bg-clip-text text-transparent">ABOUT US</span>
                </h1>
            </div>

            <AboutComponent />
            <ContactSection />
        </div>
    );
}