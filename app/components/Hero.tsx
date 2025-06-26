"use client";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative w-full min-h-[70vh] flex flex-col justify-center items-center px-4" data-aos="fade-up">
            <main className="flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-16 w-full max-w-6xl mx-auto">

                {/* Logo kiri */}
                <div
                    className={`w-full sm:w-full md:w-3/4 lg:w-2/3 flex justify-center sm:justify-start cursor-pointer transition-transform duration-300 ${isHovered ? "z-10 scale-110" : "scale-100"}`}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                    onTouchCancel={() => setIsHovered(false)}
                >
                    <div style={{ width: '100%', aspectRatio: '2647 / 996' }} className="h-full">
                        <Image
                            src={isHovered ? "/assets/imajiwalab_logo_glitch_2.gif" : "/assets/images/logohero.png"}
                            alt="IMAJIWA LAB"
                            width={800}
                            height={400}
                            className="h-full w-full max-w-[1200px] md:max-w-[900px] sm:max-w-[98vw] object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Teks kanan */}
                <div className="w-full sm:w-full md:w-1/4 lg:w-1/3 text-center sm:text-left text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide leading-relaxed whitespace-pre-line mt-6 sm:mt-0">
                    Experimenting{"\n"}
                    Creating{"\n"}
                    Geeking Out{"\n"}
                    For Experience.
                </div>
            </main>
        </div>
    );
}
