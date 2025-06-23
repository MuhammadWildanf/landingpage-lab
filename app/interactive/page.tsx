"use client";
import Particles from "../../blocks/Backgrounds/Particles/Particles";
import CanvasCursor from '../components/CanvasCursor';
import AOSInitializer from "../components/AOSInitializer";
import { useEffect, useState } from "react";

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
            <div className="w-full max-w-6xl mx-auto rounded-3xl bg-[#232323] border border-white/20 shadow-xl p-4 sm:p-8 mb-16 mx-2">
                {/* Tab Kategori */}
                <div className="flex justify-center mb-10">
                    <div className="flex gap-2 bg-[#181C1C] rounded-full px-2 py-1 shadow overflow-x-auto whitespace-nowrap">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`px-6 py-2 rounded-full font-semibold transition text-base min-w-max
            ${selectedCat === cat.id
                                        ? "bg-[#888] text-white font-bold"
                                        : "bg-transparent text-white hover:bg-[#333]"
                                    }`}
                                onClick={() => setSelectedCat(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                        <button
                            className={`px-6 py-2 rounded-full font-semibold transition text-base min-w-max
          ${selectedCat === null
                                    ? "bg-[#888] text-white font-bold"
                                    : "bg-transparent text-white hover:bg-[#333]"
                                }`}
                            onClick={() => setSelectedCat(null)}
                        >
                            All Project
                        </button>
                    </div>
                </div>
                {/* Produk Grid */}
                <div className="w-full">
                    {loading ? (
                        <div className="text-center text-[#CBAB79] text-lg py-20">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-400 text-lg py-20">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredProducts.length > 0 ? filteredProducts.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="relative rounded-xl overflow-hidden shadow-lg group aspect-[4/3] bg-[#232323] flex items-start"
                                >
                                    <img
                                        src={prod.thumbnail_url}
                                        alt={prod.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-0 left-0 z-10 p-4">
                                        <div className="text-white text-lg font-bold drop-shadow-lg">{prod.name}</div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-[#aaa] italic col-span-full">Belum ada produk ditemukan.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}