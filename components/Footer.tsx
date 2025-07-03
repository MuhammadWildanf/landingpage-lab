import React from "react";
import { FaBehance, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="w-full text-[#EAEAEA] font-mono pt-12 pb-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center md:flex-row md:items-stretch md:justify-between gap-y-8 md:gap-y-0 md:gap-x-10">
                {/* Left - Socials */}
                <div className="flex flex-col items-center md:items-start mb-0 md:mb-0">
                    <div className="flex items-center gap-6 text-2xl mb-2">
                        <a href="#" aria-label="Behance" className="hover:opacity-70"><FaBehance /></a>
                        <a href="https://www.instagram.com/imajiwa.lab/" aria-label="Instagram" className="hover:opacity-70"><FaInstagram /></a>
                        {<a href="#" aria-label="LinkedIn" className="hover:opacity-70"><FaLinkedin /></a>}
                    </div>
                </div>

                {/* Center - Message */}
                <div className="flex flex-col items-center justify-center text-center flex-1">
                    <p className="text-lg sm:text-xl mb-1">Got a project?</p>
                    <p className="text-lg sm:text-xl">Want to collaborate?</p>
                </div>

                {/* Right - Contact Info */}
                <div className="flex flex-col items-center text-center md:items-end md:text-right text-xs sm:text-sm gap-1">
                    <p className="font-bold">Contact</p>
                    <p>visual.lab@imajiwa.com</p>
                    <p>0217181433</p>
                    <p>
                        Jakarta Selatan,<br />
                        DKI Jakarta 12730,<br />
                        Indonesia
                    </p>
                </div>
            </div>

            {/* Copyright di bawah grid utama */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-8 text-center md:text-left">
                <p className="text-xs">
                    © Copyright 2025. IMAJIWA LAB. All rights reserved.
                </p>
            </div>

            {/* Bottom Gradient Text */}
            <div className="w-full mt-10 text-6xl sm:text-4xl md:text-7xl font-bebas-neue font-bold leading-tight tracking-tight text-center">
                <span className="bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] text-transparent bg-clip-text">
                    LET’S WORK TOGETHER
                </span>
            </div>
        </footer>
    );
};

export default Footer;
