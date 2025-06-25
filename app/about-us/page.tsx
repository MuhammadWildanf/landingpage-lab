import Particles from "../../blocks/Backgrounds/Particles/Particles";
import CanvasCursor from '../components/CanvasCursor';

import AOSInitializer from "../components/AOSInitializer";
import AboutComponent from "../components/About";
import ContactSection from "../components/ContactSection";
export default function About() {
    return (
        <div className="relative text-white font-mono px-4 sm:px-6 md:px-20 pt-16 pb-12 space-y-40">
            <CanvasCursor />

            <div className="absolute inset-0 -z-10">
                <Particles />
            </div>
            <AOSInitializer />

            {/* Page Title */}
            <AboutComponent />
            <ContactSection />
        </div>
    );
}