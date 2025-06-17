import Image from "next/image";

export default function About() {
    return (
        <section className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4 px-4 sm:px-8" data-aos="fade-left">
            {/* Gambar Tim */}
            <div className="w-full sm:w-2/4 relative">
                <Image
                    src="/assets/images/team.png"
                    alt="Tim Imajiwa"
                    width={800}
                    height={600}
                    className="w-full object-cover grayscale"
                />
            </div>

            {/* Deskripsi */}
            <div className="w-full sm:w-2/4 text-left font-mono text-sm leading-relaxed tracking-wide space-y-6">
                <p>
                    <span className="font-bold text-white">At Imajiwa Lab</span>, we're not just creators—we're a bunch of{" "}
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
                    turning spaces into playgrounds of interaction and emotion. We don't just deliver tech—we translate our
                    deep knowledge into engaging, human-centered experiences.
                </p>

                <p className="text-[#EEFF41]">
                    If it hasn't been done before,<br />
                    we're probably already building it.
                </p>
            </div>
        </section>
    );
} 