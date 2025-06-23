import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative w-full flex flex-col justify-center items-center py-12 sm:py-20 md:py-28" data-aos="fade-up">
            <main className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-16 w-full max-w-6xl mx-auto px-4 sm:px-0">

                {/* Logo kiri */}
                <div className="flex-shrink-0">
                    <Image
                        src="/assets/images/logo-hero.png"
                        alt="IMAJIWA LAB"
                        width={600}
                        height={300}
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
