import Image from "next/image";

const clients = [
    { name: "PLN", src: "/assets/clients/pln.png" },
    { name: "Sampoerna", src: "/assets/clients/sampoerna.png" },
    { name: "Sinarmas Land", src: "/assets/clients/sinarmasland.png" },
    { name: "TikTok Live", src: "/assets/clients/tiktoklive.png" },
    { name: "Bayer", src: "/assets/clients/bayer.png" },
    { name: "Dell", src: "/assets/clients/dell.png" },
    { name: "Kemendikbud", src: "/assets/clients/kemendikbud.png" },
    { name: "City Vision", src: "/assets/clients/cityvision.png" },
    { name: "ISCA", src: "/assets/clients/isca.png" },
    { name: "Mastercard", src: "/assets/clients/mastercard.png" },
    { name: "Infocomm Asia", src: "/assets/clients/infocomm.png" },
    { name: "IGX", src: "/assets/clients/igx.png" },
    { name: "Frank & Co", src: "/assets/clients/frankco.png" },
    { name: "Telkomsel", src: "/assets/clients/telkomsel.png" },
    { name: "Spotify", src: "/assets/clients/spotify.png" },
    { name: "Astra Financial", src: "/assets/clients/astra.png" },
    { name: "Golden Farm", src: "/assets/clients/goldenfarm.png" },
    { name: "Indosat", src: "/assets/clients/indosat.png" },
    { name: "Pertamina Hulu Energi", src: "/assets/clients/phe.png" },
    { name: "Adidas", src: "/assets/clients/adidas.png" },
    { name: "Bank Indonesia", src: "/assets/clients/bankindonesia.png" },
];

export default function ClientLogos() {
    return (
        <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex flex-col items-center justify-center bg-transparent mb-24">
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-center mb-10 tracking-widest uppercase">
                <span className="bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] bg-clip-text text-transparent">OUR CLIENT</span>
            </h2>
            <div className="w-full bg-[#ffffff] shadow-lg py-0 px-0 flex flex-col items-center">
                <div className="marquee overflow-hidden w-full">
                    <div className="marquee-content flex flex-nowrap items-center gap-x-8">
                        {[...clients, ...clients].map((client, idx) => (
                            <div key={client.name + idx} className="flex items-center justify-center h-16 w-32 flex-shrink-0">
                                <Image
                                    src={client.src}
                                    alt={client.name}
                                    width={120}
                                    height={64}
                                    className="object-contain max-h-14 w-auto h-full transition duration-300"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 