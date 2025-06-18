import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative w-full min-h-[60vh] flex flex-col justify-center items-center" data-aos="fade-up">


            {/* Konten utama */}
            <main className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-20 sm:gap-24 w-full mx-auto px-4 sm:px-0 transform -translate-y-8">
                {/* Logo kiri */}
                <div className="flex-shrink-0 sm:w-2/3">
                    <Image
                        src="/assets/images/logo-hero.png"
                        alt="IMAJIWA LAB"
                        width={1500}
                        height={600}
                        className="w-full h-auto"
                    />
                </div>

                {/* Teks kanan */}
                <div className="sm:w-1/3 text-left text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide leading-relaxed whitespace-pre-line flex flex-col justify-end h-full">
                    Experimenting{"\n"}
                    Creating{"\n"}
                    Geeking Out{"\n"}
                    For Experience.
                </div>
            </main>
        </div>
    );
} 