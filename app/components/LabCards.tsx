"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

interface LabCardProps {
    imageSrc: string;
    imageAlt: string;
    tags: string[];
    backMediaSrc?: string;
    backMediaAlt?: string;
}

function isVideo(src: string) {
    return /\.(mp4|webm|ogg)$/i.test(src);
}

function LabCard({ imageSrc, imageAlt, tags, backMediaSrc, backMediaAlt }: LabCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if screen is mobile size
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Handler untuk touch dan mouse
    const handleTouchStart = () => {
        if (isMobile) setIsFlipped(true);
    };
    const handleTouchEnd = () => {
        if (isMobile) setIsFlipped(false);
    };
    const handleMouseEnter = () => {
        if (!isMobile) setIsFlipped(true);
    };
    const handleMouseLeave = () => {
        if (!isMobile) setIsFlipped(false);
    };

    const frontMedia = (
        <Image src={imageSrc} alt={imageAlt} width={120} height={120} className="object-contain w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" />
    );

    let backMedia = null;
    if (backMediaSrc) {
        backMedia = isVideo(backMediaSrc) ? (
            <video
                src={backMediaSrc}
                className="object-cover w-full h-full rounded-2xl"
                autoPlay
                loop
                muted
                playsInline
            />
        ) : (
            <Image src={backMediaSrc} alt={backMediaAlt || imageAlt} width={320} height={220} className="object-contain w-full h-[220px] rounded-2xl" />
        );
    } else {
        backMedia = (
            <Image src={imageSrc} alt={imageAlt} width={320} height={220} className="object-contain w-full h-[220px] rounded-2xl" />
        );
    }

    return (
        <div
            className="group perspective w-full max-w-[420px] sm:max-w-[360px] md:max-w-[400px] min-h-[520px] sm:min-h-[600px] md:min-h-[700px] cursor-pointer"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "rotate-y-180" : ""}`}
            >
                <div className="absolute inset-0 bg-[#181C1C] rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-lg min-h-[520px] sm:min-h-[600px] md:min-h-[700px] backface-hidden">
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-center h-[180px]">
                            {frontMedia}
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2 mt-4">
                        {tags.map((tag, index) => (
                            <button key={index} className="px-2 py-1 rounded-full border border-[#666] text-[#ccc] text-xs sm:text-xs md:text-sm font-mono">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-0 bg-[#232323] rounded-2xl flex items-center justify-center min-h-[520px] sm:min-h-[600px] md:min-h-[700px] rotate-y-180 backface-hidden">
                    {backMedia}
                </div>
            </div>
        </div>
    );
}

export default function LabCards() {
    const cards = [
        {
            title: "LOREM IPSUM",
            imageSrc: "/assets/images/l.png",
            imageAlt: "L",
            backMediaSrc: "https://hybrid-website.ams3.cdn.digitaloceanspaces.com/Home/1-3.mp4", // contoh: back pakai video
            backMediaAlt: "Demo Video",
            tags: ["Immersive ", "Interactive", "Virtual Production"]
        },
        {
            title: "LOREM IPSUM",
            imageSrc: "/assets/images/a.png",
            imageAlt: "A",
            tags: ["AR/VR/XR", "AI & Generative Systems", "Motion & Real-Time Visualization"]
        },
        {
            title: "LOREM IPSUM",
            imageSrc: "/assets/images/b.png",
            imageAlt: "B",
            tags: ["Custom Software", "Custom Hardware"]
        }
    ];

    return (
        <section className="w-full min-h-screen flex justify-center items-center mb-24" data-aos="fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
                {cards.map((card, index) => (
                    <LabCard key={index} {...card} />
                ))}
            </div>
        </section>
    );
} 