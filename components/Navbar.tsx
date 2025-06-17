'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="sticky top-4 z-50 px-4 md:px-8">
            <div
                className={`mx-auto flex items-center justify-between text-sm font-mono text-white px-6 py-2 md:py-3 rounded-full shadow-md transition-all
                ${isScrolled ? 'backdrop-blur-md' : 'bg-gradient-to-r from-[#2F2F2F] to-[#4A4A4A]'}
                `}
                style={isScrolled ? { backgroundColor: 'rgba(217,217,217,0.3)' } : {}}
            >

                {/* KIRI: Logo */}
                <div className="flex items-center">
                    <Image
                        src="/assets/images/logo.png"
                        alt="IMAJIWA LAB Logo"
                        width={100}
                        height={100}
                        priority
                    />
                </div>

                {/* TENGAH: Navigation */}
                <div className="hidden md:flex space-x-8 items-center text-xs tracking-widest uppercase">
                    <Link href="/" className="font-bold underline underline-offset-4">
                        Home
                    </Link>
                    <Link href="/technical-support">Technical Sup<span className="hidden sm:inline">port</span></Link>
                    <Link href="/interactive">Interactive</Link>
                    <Link href="/get-in-touch">Get in Touch</Link>
                </div>

                {/* KANAN: Button */}
                <div>
                    <button className="border border-white rounded-full px-4 py-1.5 text-xs flex items-center gap-2 hover:bg-white hover:text-black transition-all">
                        DISCOVER MAGIC
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}
