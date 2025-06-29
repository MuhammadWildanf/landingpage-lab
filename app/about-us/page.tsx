import Particles from "../../blocks/Backgrounds/Particles/Particles";
import CanvasCursor from '../components/CanvasCursor';
import Image from "next/image";
import AOSInitializer from "../components/AOSInitializer";
import ContactSection from "../components/ContactSection";
export default function About() {
    return (
        <div className="relative text-white font-mono px-4 sm:px-6 md:px-20 pt-16 pb-12 space-y-40">
            <CanvasCursor />

            <div className="absolute inset-0 -z-10">
                <Particles />
            </div>
            <AOSInitializer />
            <h2 className="text-2xl sm:text-4xl font-bold tracking-widest mb-6 sm:mb-8 uppercase text-center">
                <span className="ml-1 bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] bg-clip-text text-transparent">ABOUT US</span>
            </h2>
            <section
                className="flex flex-col items-start gap-6 w-full"
                data-aos="fade-left"
            >
                {/* Gambar Tim - full width di atas */}
                <div className="w-full relative">
                    <Image
                        src="/assets/images/team.png"
                        alt="Tim Imajiwa"
                        width={1200}
                        height={700}
                        className="w-full object-cover"
                    />
                </div>

                {/* Deskripsi */}
                <div className="w-full text-left font-mono text-sm leading-relaxed tracking-wide space-y-6 text-justify">
                    <p>
                        <span className="font-bold text-white">At Imajiwa Lab</span>, we&apos;re not just creators&mdash;we&apos;re a bunch of{" "}
                        <span className="text-[#EEFF41]">curious geeks</span>,{" "}
                        <span className="text-[#EEFF41]">relentless go-getters</span>, and{" "}
                        <span className="text-[#EEFF41]">passionate tinkerers</span>. We thrive on exploring the unknown, constantly
                        pushing the boundaries of multimedia and technology to craft experiences that stick with people long after
                        the moment has passed.
                    </p>

                    <p>
                        We love to meddle with{" "}
                        <span className="text-[#EEFF41]">
                            tech—from writing custom programs, building interactive systems, playing with motion capture,
                            to experimenting with artificial intelligence and extended reality
                        </span>. For us, every line of code, every circuit, every pixel is a chance to create something unforgettable.
                    </p>

                    <p>
                        Our work spans <span className="text-[#EEFF41]">events, brand activations, and experience centers</span>,
                        turning spaces into playgrounds of interaction and emotion. We don&apos;t just deliver tech&mdash;we translate our
                        deep knowledge into engaging, human-centered experiences.
                    </p>

                    <p className="text-[#EEFF41]">
                        If it hasn&apos;t been done before,<br />
                        we&apos;re probably already building it.
                    </p>
                </div>
            </section>


            <ContactSection />
        </div>
    );
}