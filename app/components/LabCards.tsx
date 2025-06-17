import Image from "next/image";

interface LabCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    tags: string[];
}

function LabCard({ title, imageSrc, imageAlt, tags }: LabCardProps) {
    return (
        <div className="bg-[#181C1C] rounded-2xl p-8 w-full max-w-[396px] h-[593px] flex flex-col justify-between shadow-lg">
            <div className="text-lg font-mono mb-2">{title}</div>
            <div className="flex-1 flex items-center justify-center">
                <Image src={imageSrc} alt={imageAlt} width={120} height={120} className="object-contain" />
            </div>
            <div className="flex items-end justify-between mt-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                </svg>
                <div className="flex gap-2">
                    {tags.map((tag, index) => (
                        <button key={index} className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">
                            {tag}
                        </button>
                    ))}
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
            tags: ["LOREM IPSUM", "LOREM IPSUM", "LOREM IPSUM"]
        },
        {
            title: "LOREM IPSUM",
            imageSrc: "/assets/images/a.png",
            imageAlt: "A",
            tags: ["LOREM IPSUM", "LOREM IPSUM", "LOREM IPSUM"]
        },
        {
            title: "LOREM IPSUM",
            imageSrc: "/assets/images/b.png",
            imageAlt: "B",
            tags: ["LOREM IPSUM", "LOREM IPSUM", "LOREM IPSUM"]
        }
    ];

    return (
        <section className="flex flex-col sm:flex-row gap-8 justify-center items-center" data-aos="fade-up">
            {cards.map((card, index) => (
                <LabCard key={index} {...card} />
            ))}
        </section>
    );
} 