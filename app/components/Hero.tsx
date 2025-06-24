"use client";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center items-center" data-aos="fade-up">
            <main className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-16 w-full max-w-6xl mx-auto px-4 sm:px-0">

                {/* Logo kiri */}
                <div
                    className="flex-shrink-0 cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={isHovered ? "/assets/imajiwalab_logo_glitch_2.gif" : "/assets/images/logohero.png"}
                        alt="IMAJIWA LAB"
                        width={800}
                        height={400}
                        className="h-auto"
                        priority
                    />
                </div>

                {/* Teks kanan */}
                <div className="sm:w-1/3 w-full text-left text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide leading-relaxed whitespace-pre-line mt-6 sm:mt-0">
                    Experimenting{"\n"}
                    Creating{"\n"}
                    Geeking Out{"\n"}
                    For Experience.
                </div>
            </main>
        </div>
    );
}
