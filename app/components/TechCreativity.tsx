'use client';

import { useEffect, useState } from 'react';

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

    // Filter products by active category
    const filteredProducts = activeCategory
        ? products.filter((p) => p.category_id === activeCategory)
        : [];
    // Get active category object
    const activeCategoryObj = categories.find((cat) => cat.id === activeCategory);

    // Reset slide if activeCategory changes
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

    // Function to get media URL
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
        <section className="px-4 sm:px-8 lg:px-20 relative text-white font-mono">
            <h2 className="text-center text-3xl sm:text-4xl font-medium tracking-widest mb-8 uppercase">
                TECH CREATIVITY = <span className="ml-1 bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] bg-clip-text text-transparent">MAGIC</span>
            </h2>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-12 text-base sm:text-lg tracking-widest uppercase font-mono">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`transition-all px-1 pb-1 border-b-2 font-mono ${activeCategory === category.id
                            ? 'font-bold text-[#E9FF4E] border-[#E9FF4E]'
                            : 'text-white border-transparent hover:text-[#E9FF4E] hover:border-[#E9FF4E]'
                            }`}
                        style={{ letterSpacing: '0.08em' }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Carousel */}
            <div className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[420px]">
                {/* Arrow Left */}
                <button
                    onClick={handlePrevSlide}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/40 bg-black/40 hover:bg-[#E9FF4E]/20 hover:border-[#E9FF4E] text-xl sm:text-2xl md:text-3xl absolute left-2 sm:left-4 md:left-[-56px] top-1/2 -translate-y-1/2 z-10 transition-all"
                    aria-label="Previous"
                    disabled={filteredProducts.length === 0}
                >
                    &#8592;
                </button>

                {/* Media card */}
                {filteredProducts.length > 0 ? (
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-xl w-full bg-[#202020]" style={{ boxShadow: '0 0 32px 0 #a259ff55' }}>
                        {(() => {
                            const currentProduct = filteredProducts[currentSlide];
                            const mediaUrl = getMediaUrl(currentProduct);
                            const isVideoFile = isVideo(mediaUrl);

                            if (isVideoFile) {
                                return (
                                    <video
                                        src={mediaUrl}
                                        className="w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[520px] object-cover transition-all duration-500 ease-in-out"
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
                                        className="w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[520px] object-cover transition-all duration-500 ease-in-out"
                                        loading="lazy"
                                    />
                                );
                            }
                        })()}

                        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6 bg-gradient-to-t from-[#202020] via-[#202020]/40 to-transparent">
                            <p className="text-xs text-purple-300 mb-1">{filteredProducts[currentSlide].category?.name || 'Project'}</p>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight mb-1">{filteredProducts[currentSlide].name}</p>
                            {/* Location: pakai field location jika ada, atau kosong */}
                            {filteredProducts[currentSlide].location && (
                                <p className="text-sm sm:text-base text-white mb-1 font-normal">{filteredProducts[currentSlide].location}</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] flex items-center justify-center text-gray-400 bg-[#202020]">
                        No project for this category.
                    </div>
                )}

                {/* Arrow Right */}
                <button
                    onClick={handleNextSlide}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/40 bg-black/40 hover:bg-[#E9FF4E]/20 hover:border-[#E9FF4E] text-xl sm:text-2xl md:text-3xl absolute right-2 sm:right-4 md:right-[-56px] top-1/2 -translate-y-1/2 z-10 transition-all"
                    aria-label="Next"
                    disabled={filteredProducts.length === 0}
                >
                    &#8594;
                </button>
            </div>

            {/* Carousel Indicators */}
            {filteredProducts.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {filteredProducts.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all border border-[#E9FF4E] ${currentSlide === index ? 'bg-[#E9FF4E]' : 'bg-transparent'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Description with gradient border top */}
            <div className="relative mt-12 max-w-3xl mx-auto">
                <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-2/3 h-1 bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] rounded-full blur-sm opacity-80" />
                <p className="text-center text-base sm:text-lg text-white font-mono leading-relaxed mt-6">
                    {filteredProducts.length > 0 ? filteredProducts[currentSlide].description : 'Select a category to see project details.'}
                </p>
            </div>
        </section>
    );
} 