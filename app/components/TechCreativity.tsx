'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import Image from "next/image";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
    description: string;
    slug: string;
}

interface ProductMedia {
    id: number;
    product_id: number;
    url: string;
    sort_order: number;
}

interface Product {
    id: number;
    category_id: number;
    name: string;
    description: string;
    slug: string;
    thumbnail_url?: string;
    media?: ProductMedia[];
    category?: Category;
    location?: string; // fallback if ada
}

export default function TechCreativity() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Fetch categories and products from external API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [catRes, prodRes] = await Promise.all([
                    fetch('https://api.imajiwa.id/api/sub-category'),
                    fetch('https://api.imajiwa.id/public/products'),
                ]);
                if (!catRes.ok || !prodRes.ok) throw new Error('Failed to fetch data');
                const catData = await catRes.json();
                const prodData = await prodRes.json();
                setCategories(catData);
                setProducts(prodData);
                // Set default active category to first
                if (catData.length > 0) setActiveCategory(catData[0].id);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = activeCategory
        ? products.filter((p) => p.category_id === activeCategory)
        : [];

    useEffect(() => {
        setCurrentSlide(0);
    }, [activeCategory]);

    const handleCategoryClick = (categoryId: number) => {
        setActiveCategory(categoryId);
    };

    // Function to check if media is video
    const isVideo = (url: string): boolean => {
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
        const lowerUrl = url.toLowerCase();
        return videoExtensions.some(ext => lowerUrl.includes(ext));
    };

    const getMediaUrl = (product: Product): string => {
        let mediaUrl = product.thumbnail_url;
        if (!mediaUrl && product.media && product.media[0]?.url) {
            mediaUrl = product.media[0].url;
        }
        if (!mediaUrl) return '/assets/images/projects/default.jpg';
        // Jika sudah absolut, return langsung
        if (mediaUrl.startsWith('http://') || mediaUrl.startsWith('https://')) {
            return mediaUrl;
        }
        // Jika relative, tambahkan prefix
        return `https://api.imajiwa.id${mediaUrl}`;
    };

    if (loading) {
        return (
            <section className="mt-20 sm:mt-24 px-4 sm:px-8 lg:px-20 relative text-white">
                <div className="text-center">Loading...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="mt-20 sm:mt-24 px-4 sm:px-8 lg:px-20 relative text-white">
                <div className="text-center text-red-500">Error: {error}</div>
            </section>
        );
    }

    if (!categories.length) return null;

    return (
        <section className="px-2 sm:px-6 lg:px-16 relative text-white font-mono mb-16 sm:mb-24">
            <h2 className="text-center text-2xl sm:text-4xl font-bold tracking-widest mb-6 sm:mb-8 uppercase">
                TECH CREATIVITY = <span className="ml-1 bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] bg-clip-text text-transparent">MAGIC</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-6xl mx-auto items-stretch">
                {/* Sidebar Kategori Vertikal (hanya di desktop) */}
                <div className="hidden md:flex flex-col gap-3 w-1/4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-left font-mono text-base transition-all ${activeCategory === category.id
                                ? 'bg-gradient-to-r from-[#2B2B2B] via-[#CBAB79] to-[#CD1DA6] font-bold shadow-lg'
                                : 'bg-[#232323] text-white border-transparent hover:border-[#CBAB79] hover:bg-[#181818]'}
                                `}
                        >
                            <span className="inline-block w-6 h-6 bg-white/10 rounded mr-2" />
                            <span className="whitespace-pre-line">{category.name}</span>
                        </button>
                    ))}
                </div>
                {/* Kategori Horizontal Bar (hanya di mobile) */}
                <div className="flex md:hidden flex-nowrap overflow-x-auto gap-x-2 mb-4 category-scrollbar w-full">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`transition-all px-4 py-2 border-b-2 font-mono max-w-[180px] text-center ${activeCategory === category.id
                                ? 'font-bold text-[#E9FF4E] border-[#E9FF4E]'
                                : 'text-white border-transparent hover:text-[#E9FF4E] hover:border-[#E9FF4E]'}
                                `}
                            style={{ letterSpacing: '0.08em' }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                {/* Konten Utama */}
                <div className="w-full md:flex-1 flex items-center justify-center md:h-full">
                    {filteredProducts.length > 0 ? (
                        (() => {
                            const currentProduct = filteredProducts[currentSlide] as Product;
                            const mediaUrl = getMediaUrl(currentProduct);
                            const isVideoFile = isVideo(mediaUrl);
                            return (
                                <Link
                                    href={`/interactive/${currentProduct.slug}`}
                                    className="block"
                                    tabIndex={0}
                                    aria-label={currentProduct.name}
                                >
                                    <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl w-full max-w-3xl bg-[#202020]">
                                        {isVideoFile ? (
                                            <video
                                                src={mediaUrl}
                                                className="w-full h-[320px] md:h-[500px] object-cover"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                controls={false}
                                                preload="metadata"
                                            />
                                        ) : (
                                            <Image
                                                src={mediaUrl}
                                                alt={currentProduct.name}
                                                width={900}
                                                height={500}
                                                className="w-full h-[320px] md:h-[500px] object-cover"
                                                loading="lazy"
                                            />
                                        )}
                                        {/* Overlay info project hanya di desktop */}
                                        <div className="hidden md:block absolute left-0 bottom-0 p-6 text-left z-10">
                                            <p className="text-xs text-blue-300 mb-1">Study Case</p>
                                            <p className="text-xl font-bold text-white mb-1">{currentProduct.name}</p>
                                            {currentProduct.location && (
                                                <p className="text-base text-white">{currentProduct.location}</p>
                                            )}
                                        </div>
                                        {/* Overlay info project di mobile (opsional, bisa dihilangkan jika tidak ingin) */}
                                        <div className="block md:hidden absolute left-0 bottom-0 p-3 text-left z-10">
                                            <p className="text-xs text-blue-300 mb-1">Study Case</p>
                                            <p className="text-base font-bold text-white mb-1">{currentProduct.name}</p>
                                            {currentProduct.location && (
                                                <p className="text-xs text-white">{currentProduct.location}</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })()
                    ) : (
                        <div className="rounded-2xl border border-white/20 shadow-xl w-full h-[220px] flex items-center justify-center text-gray-400 bg-[#202020]">
                            No project for this category.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
} 