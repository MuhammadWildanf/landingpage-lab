"use client";
import React, { useEffect } from "react";
import Image from "next/image";

interface GlobalLoaderProps {
    finishLoading: () => void;
}

const GlobalLoader = ({ finishLoading }: GlobalLoaderProps) => {
    useEffect(() => {
        const timer = setTimeout(finishLoading, 1700); // durasi animasi + sedikit delay
        return () => clearTimeout(timer);
    }, [finishLoading]);

    return (
        <div className="flex h-screen items-center justify-center bg-black">
            <Image
                id="logo"
                src="/assets/images/logohero.png"
                alt="IMAJIWA LAB"
                width={800}
                height={400}
                className="object-cover animate-logo-pop"
                priority
            />
        </div>
    );
};

export default GlobalLoader;