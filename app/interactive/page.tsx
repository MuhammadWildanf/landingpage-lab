"use client";
import Particles from "../../blocks/Backgrounds/Particles/Particles";
import CanvasCursor from '../components/CanvasCursor';
import AOSInitializer from "../components/AOSInitializer";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    thumbnail_url: string;
    category_id: number;
    price?: string;
    slug: string;
}

export default function Interactive() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCat, setSelectedCat] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch("https://api.imajiwa.id/api/category").then(res => res.json()),
            fetch("https://api.imajiwa.id/public/products").then(res => res.json())
        ])
            .then(([catData, prodData]) => {
                setCategories(catData);
                setProducts(prodData);
                setSelectedCat(catData[0]?.id ?? null);
                setLoading(false);
            })
            .catch(() => {
                setError("Gagal memuat data dari server.");
                setLoading(false);
            });
    }, []);

    const filteredProducts = selectedCat
        ? products.filter(prod => prod.category_id === selectedCat)
        : products;

    return (
        <div className="relative min-h-screen ">
            <CanvasCursor />
            <div className="absolute inset-0 -z-10"><Particles /></div>
            <AOSInitializer />
            {/* Judul Section */}
            <div className="pt-20 pb-8" data-aos="fade-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-center mb-8">
                    <span className="text-white">OUR </span>
                    <span className="bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] bg-clip-text text-transparent">PRODUCT</span>
                </h1>
            </div>
            {/* Container utama */}
            <div className="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-2 sm:mx-auto rounded-3xl bg-[#232323] border border-white/20 shadow-xl px-2 sm:px-4 md:px-8 pt-8 pb-16">

                {/* Tab Kategori */}
                <div className="flex justify-center mb-10">
                    <div className="flex gap-2 bg-[#181C1C] rounded-full px-2 py-1 shadow overflow-x-auto max-w-full scrollbar-thin scrollbar-thumb-[#CBAB79]/40 scrollbar-track-transparent">
                        <button
                            className={`px-6 py-2 rounded-full font-semibold transition text-sm md:text-base whitespace-nowrap ${selectedCat === null
                                ? "bg-[#CBAB79] text-white font-bold"
                                : "bg-transparent text-white hover:bg-[#333]"
                                }`}
                            onClick={() => setSelectedCat(null)}
                        >
                            All Project
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`px-6 py-2 rounded-full font-semibold transition text-sm md:text-base whitespace-nowrap ${selectedCat === cat.id
                                    ? "bg-[#CBAB79] text-white font-bold"
                                    : "bg-transparent text-white hover:bg-[#333]"
                                    }`}
                                onClick={() => setSelectedCat(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Produk Grid */}
                <div className="w-full px-2 sm:px-0">
                    {loading ? (
                        <div className="text-center text-[#CBAB79] text-lg py-20">
                            Loading...
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-400 text-lg py-20">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((prod) => (
                                    <Link
                                        key={prod.id}
                                        href={`/interactive/${prod.slug}`}
                                        className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[16/9] bg-[#2a2a2a] w-full min-h-[140px] sm:min-h-[180px] md:min-h-[0] cursor-pointer transition-transform hover:scale-[1.03] focus:outline-none"
                                    >
                                        {prod.thumbnail_url.match(/\.(mp4|webm)$/i) ? (
                                            <video
                                                src={prod.thumbnail_url}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            />
                                        ) : (
                                            <Image
                                                src={prod.thumbnail_url}
                                                alt={prod.name}
                                                width={800}
                                                height={450}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        )}

                                        <div className="absolute inset-0 bg-black/30 z-0" />
                                        <div className="absolute bottom-0 left-0 z-10 p-3 sm:p-4">
                                            <div className="text-white text-base sm:text-lg font-bold drop-shadow-md">
                                                {prod.name}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-[#aaa] italic col-span-full text-center">
                                    Belum ada produk ditemukan.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}