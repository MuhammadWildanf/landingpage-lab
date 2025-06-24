'use client';

import { useEffect, useState } from 'react';
import React from 'react';

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

    const handlePrevSlide = () => {
        if (!filteredProducts.length) return;
        setCurrentSlide((prev) =>
            prev === 0 ? filteredProducts.length - 1 : prev - 1
        );
    };

    const handleNextSlide = () => {
        if (!filteredProducts.length) return;
        setCurrentSlide((prev) =>
            prev === filteredProducts.length - 1 ? 0 : prev + 1
        );
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

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8 sm:mb-12 text-sm sm:text-base tracking-widest uppercase font-mono">
                {categories.map((category) => {
                    return (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`transition-all px-2 pb-1 border-b-2 font-mono max-w-[140px] whitespace-pre-line text-center ${activeCategory === category.id
                                ? 'font-bold text-[#E9FF4E] border-[#E9FF4E]'
                                : 'text-white border-transparent hover:text-[#E9FF4E] hover:border-[#E9FF4E]'
                                }`}
                            style={{ letterSpacing: '0.08em' }}
                        >
                            {category.name
                                .replace(/ & /g, '\n& ')
                                .replace(/\//g, '/\n')
                                .split(' ')
                                .map((word, i, arr) => {
                                    if (word.includes('\n')) {
                                        return word.split('\n').map((w, j) => (
                                            <React.Fragment key={i + '-' + j}>
                                                {w}
                                                <br />
                                            </React.Fragment>
                                        ));
                                    }
                                    return (
                                        <React.Fragment key={i}>
                                            {word}
                                            {i < arr.length - 1 && ' '}
                                        </React.Fragment>
                                    );
                                })}
                        </button>
                    );
                })}
            </div>

            {/* Carousel */}
            <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto flex items-center justify-center min-h-[220px] sm:min-h-[320px] md:min-h-[400px]">
                <button
                    onClick={handlePrevSlide}
                    className="hidden sm:flex absolute sm:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/40 bg-black/60 hover:bg-[#E9FF4E]/20 hover:border-[#E9FF4E] text-2xl shadow-md transition-all"
                    aria-label="Previous"
                    disabled={filteredProducts.length === 0}
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {filteredProducts.length > 0 ? (
                    <div
                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-xl w-full bg-[#202020]"
                        style={{ boxShadow: '0 0 24px 0 #a259ff55' }}
                        onTouchStart={filteredProducts.length > 1 ? (e) => {
                            const startX = e.touches[0].clientX;
                            let moved = false;
                            const handleTouchMove = (moveEvent: TouchEvent) => {
                                const diff = moveEvent.touches[0].clientX - startX;
                                if (Math.abs(diff) > 40 && !moved) {
                                    moved = true;
                                    if (diff > 0) handlePrevSlide();
                                    else handleNextSlide();
                                }
                            };
                            const handleTouchEnd = () => {
                                window.removeEventListener('touchmove', handleTouchMove);
                                window.removeEventListener('touchend', handleTouchEnd);
                            };
                            window.addEventListener('touchmove', handleTouchMove);
                            window.addEventListener('touchend', handleTouchEnd);
                        } : undefined}
                    >
                        {(() => {
                            const currentProduct = filteredProducts[currentSlide];
                            const mediaUrl = getMediaUrl(currentProduct);
                            const isVideoFile = isVideo(mediaUrl);

                            if (isVideoFile) {
                                return (
                                    <video
                                        src={mediaUrl}
                                        className="w-full h-[180px] sm:h-[280px] md:h-[340px] lg:h-[400px] object-cover transition-all duration-500 ease-in-out"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls={false}
                                        preload="metadata"
                                    />
                                );
                            } else {
                                return (
                                    <img
                                        src={mediaUrl}
                                        alt={currentProduct.name}
                                        className="w-full h-[180px] sm:h-[280px] md:h-[340px] lg:h-[400px] object-cover transition-all duration-500 ease-in-out"
                                        loading="lazy"
                                    />
                                );
                            }
                        })()}

                        <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-5 bg-gradient-to-t from-[#202020] via-[#202020]/40 to-transparent">
                            <p className="text-xs sm:text-sm text-purple-300 mb-1">{filteredProducts[currentSlide].category?.name || 'Project'}</p>
                            <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight mb-1">{filteredProducts[currentSlide].name}</p>
                            {filteredProducts[currentSlide].location && (
                                <p className="text-xs sm:text-sm text-white mb-1 font-normal">{filteredProducts[currentSlide].location}</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl w-full h-[120px] sm:h-[180px] md:h-[220px] flex items-center justify-center text-gray-400 bg-[#202020]">
                        No project for this category.
                    </div>
                )}

                <button
                    onClick={handleNextSlide}
                    className="hidden sm:flex absolute sm:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/40 bg-black/60 hover:bg-[#E9FF4E]/20 hover:border-[#E9FF4E] text-2xl shadow-md transition-all"
                    aria-label="Next"
                    disabled={filteredProducts.length === 0}
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Carousel Indicators */}
            {filteredProducts.length > 1 && (
                <div className="flex justify-center gap-1 sm:gap-2 mt-3 sm:mt-4">
                    {filteredProducts.map((product, index) => (
                        <button
                            key={product.id || index}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all border border-[#E9FF4E] ${currentSlide === index ? 'bg-[#E9FF4E]' : 'bg-transparent'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            <div className="relative mt-8 sm:mt-10 max-w-2xl mx-auto">
                <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-2/3 h-1 bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] rounded-full blur-sm opacity-80" />
                <p className="text-center text-sm sm:text-base text-white font-mono leading-relaxed mt-4 sm:mt-6">
                    {filteredProducts.length > 0 ? filteredProducts[currentSlide].description : 'Select a category to see project details.'}
                </p>
            </div>
        </section>
    );
} 