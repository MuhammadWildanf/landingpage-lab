'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(path)
    }

    return (
        <>
            <nav className="sticky top-4 z-50 px-4 sm:px-8">
                <div
                    className={`w-full max-w-6xl mx-auto flex items-center justify-between gap-x-10 h-16 text-sm font-mono text-white rounded-full shadow-md transition-all px-6 sm:px-10
                    ${isScrolled ? 'backdrop-blur-md' : 'bg-gradient-to-r from-[#2F2F2F] to-[#4A4A4A]'}
                    `}
                    style={isScrolled ? { backgroundColor: 'rgba(217,217,217,0.3)' } : {}}
                >

                    <div className="flex items-center">
                        <Image
                            src="/assets/images/logo.png"
                            alt="IMAJIWA LAB Logo"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>

                    <div className="hidden md:flex space-x-8 items-center text-xs tracking-widest uppercase">
                        <Link
                            href="/"
                            className={`${isActive('/') ? 'font-bold underline underline-offset-4' : ''} hover:text-gray-300 transition-colors`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about-us"
                            className={`${isActive('/about-us') ? 'font-bold underline underline-offset-4' : ''} hover:text-gray-300 transition-colors`}
                        >
                            ABOUT US
                        </Link>
                        <Link
                            href="/interactive"
                            className={`${isActive('/interactive') ? 'font-bold underline underline-offset-4' : ''} hover:text-gray-300 transition-colors`}
                        >
                            INTERACTIVE
                        </Link>
                        {/* <Link
                            href="/get-in-touch"
                            className={`${isActive('/get-in-touch') ? 'font-bold underline underline-offset-4' : ''} hover:text-gray-300 transition-colors`}
                        >
                            GET IN TOUCH
                        </Link> */}
                    </div>

                    <div className="flex items-center">
                        {/* Desktop: DISCOVER MAGIC Button */}
                        <div className="hidden md:block">
                            <Link href="/#tech-creativity" className="border border-white rounded-full px-4 py-1.5 text-xs flex items-center gap-2 hover:bg-white hover:text-black transition-all">
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
                            </Link>
                        </div>

                        {/* Mobile: Hamburger Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="flex flex-col items-center justify-center w-8 h-8 space-y-1 hover:bg-white/10 rounded-md transition-all"
                            >
                                <span className={`block w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                                <span className={`block w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`block w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeMobileMenu}
                    ></div>

                    {/* Menu Content - Full Screen */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2F2F2F] to-[#4A4A4A]">
                        <div className="flex flex-col h-full p-6">
                            {/* Header with close button */}
                            <div className="flex justify-end mb-8">
                                <button
                                    onClick={closeMobileMenu}
                                    className="text-white hover:text-gray-300 transition-colors p-2"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Navigation Links - Centered */}
                            <div className="flex flex-col items-center justify-center flex-1 space-y-8 text-white">
                                <Link
                                    href="/"
                                    className={`text-2xl tracking-widest uppercase hover:text-gray-300 transition-colors ${isActive('/') ? 'font-bold underline underline-offset-4' : ''}`}
                                    onClick={closeMobileMenu}
                                >
                                    HOME
                                </Link>
                                <Link
                                    href="/about-us"
                                    className={`text-2xl tracking-widest uppercase hover:text-gray-300 transition-colors ${isActive('/about-us') ? 'font-bold underline underline-offset-4' : ''}`}
                                    onClick={closeMobileMenu}
                                >
                                    ABOUT US
                                </Link>
                                <Link
                                    href="/interactive"
                                    className={`text-2xl tracking-widest uppercase hover:text-gray-300 transition-colors ${isActive('/interactive') ? 'font-bold underline underline-offset-4' : ''}`}
                                    onClick={closeMobileMenu}
                                >
                                    INTERACTIVE
                                </Link>
                                {/* <Link
                                    href="/get-in-touch"
                                    className={`text-2xl tracking-widest uppercase hover:text-gray-300 transition-colors ${isActive('/get-in-touch') ? 'font-bold underline underline-offset-4' : ''}`}
                                    onClick={closeMobileMenu}
                                >
                                    GET IN TOUCH
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
