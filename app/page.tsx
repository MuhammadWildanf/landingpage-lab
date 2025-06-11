import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white font-mono px-6 sm:px-20 pt-16 pb-12">
      {/* Icon panah kanan atas */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>

      {/* Konten utama */}
      <main className="flex flex-col sm:flex-row items-start justify-between mt-12 sm:mt-24 gap-10 px-4 sm:px-16">
        {/* Logo kiri */}
        <div className="flex-shrink-0">
          <Image
            src="/assets/images/logo-hero.png"
            alt="IMAJIWA LAB"
            width={400}
            height={160}
            className="w-[300px] sm:w-[400px] h-auto"
          />
        </div>

        {/* Teks kanan */}
        <div className="text-xs sm:text-sm tracking-wider leading-loose sm:leading-loose mt-4 sm:mt-12 whitespace-pre-line">
          Experimenting{"\n"}
          Creating{"\n"}
          Geeking Out{"\n"}
          For Experience.
        </div>
      </main>

      {/* Section Card LAB */}
      <section className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16">
        {/* Card L */}
        <div className="bg-[#181C1C] rounded-2xl p-8 w-[340px] sm:w-[360px] h-[420px] flex flex-col justify-between shadow-lg">
          <div className="text-lg font-mono mb-2">LOREM IPSUM</div>
          <div className="flex-1 flex items-center justify-center">
            <Image src="/assets/images/l.png" alt="L" width={120} height={120} className="object-contain" />
          </div>
          <div className="flex items-end justify-between mt-4">
            {/* Panah kiri bawah */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">LOREM IPSUM</button>
              <button className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">LOREM IPSUM</button>
              <button className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">LOREM IPSUM</button>
            </div>
          </div>
        </div>
        {/* Card A */}
        <div className="bg-[#181C1C] rounded-2xl p-8 w-[340px] sm:w-[360px] h-[420px] flex flex-col justify-between shadow-lg">
          <div className="text-lg font-mono mb-2">LOREM IPSUM</div>
          <div className="flex-1 flex items-center justify-center">
            <Image src="/assets/images/a.png" alt="A" width={120} height={120} className="object-contain" />
          </div>
          <div className="flex items-end justify-between mt-4">
            {/* Panah kiri bawah */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">LOREM IPSUM</button>
              <button className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">LOREM IPSUM</button>
              <button className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">LOREM IPSUM</button>
            </div>
          </div>
        </div>
        {/* Card B */}
        <div className="bg-[#181C1C] rounded-2xl p-8 w-[340px] sm:w-[360px] h-[420px] flex flex-col justify-between shadow-lg">
          <div className="text-lg font-mono mb-2">LOREM IPSUM</div>
          <div className="flex-1 flex items-center justify-center">
            <Image src="/assets/images/b.png" alt="B" width={120} height={120} className="object-contain" />
          </div>
          <div className="flex items-end justify-between mt-4">
            {/* Panah kiri bawah */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">LOREM IPSUM</button>
              <button className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">LOREM IPSUM</button>
              <button className="px-3 py-1 rounded-full border border-[#666] text-[#ccc] text-xs font-mono">LOREM IPSUM</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
