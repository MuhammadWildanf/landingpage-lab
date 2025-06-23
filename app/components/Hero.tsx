import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative w-full flex flex-col justify-center items-center mb-12 sm:mb-20 md:mb-32" data-aos="fade-up">
            {/* Konten utama */}
            <main className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8 sm:gap-24 w-full max-w-6xl mx-auto px-4 sm:px-0 transform -translate-y-8">
                {/* Logo kiri */}
                <div className="flex-shrink-0 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                    <Image
                        src="/assets/images/logo-hero.png"
                        alt="IMAJIWA LAB"
                        width={1500}
                        height={600}
                        className="w-full h-auto"
                        priority
                    />
                </div>

                {/* Teks kanan */}
                <div className="sm:w-1/3 w-full text-left text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide leading-relaxed whitespace-pre-line flex flex-col justify-end h-full mt-6 sm:mt-0">
                    Experimenting{"\n"}
                    Creating{"\n"}
                    Geeking Out{"\n"}
                    For Experience.
                </div>
            </main>
        </div>
    );
} 