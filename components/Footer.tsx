import React from "react";
import { FaBehance, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="w-full  text-[#EAEAEA] font-mono pt-16 pb-10">
            <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-stretch gap-10">
                {/* Left - Socials */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-6 text-2xl">
                        <a href="#" aria-label="Behance" className="hover:opacity-70"><FaBehance /></a>
                        <a href="#" aria-label="Instagram" className="hover:opacity-70"><FaInstagram /></a>
                        <a href="#" aria-label="LinkedIn" className="hover:opacity-70"><FaLinkedin /></a>
                    </div>
                </div>

                {/* Center - Message */}
                <div className="flex flex-col items-center justify-center text-center flex-1">
                    <p className="text-xl mb-1">Got a project?</p>
                    <p className="text-xl">Want to collaborate?</p>
                </div>

                {/* Right - Contact Info */}
                <div className="flex flex-col items-end text-right text-sm gap-2">
                    <p className="font-bold">Contact</p>
                    <p>lab@imajiwa.com</p>
                    <p>+62821-0000-0000</p>
                    <p>
                        Jakarta Selatan,<br />
                        DKI Jakarta 12730,<br />
                        Indonesia
                    </p>
                </div>
            </div>

            {/* Copyright di bawah grid utama */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 mt-8">
                <p className="text-xs text-left">
                    © Copyright 2025. IMAJIWA LAB. All rights reserved.
                </p>
            </div>

            {/* Bottom Gradient Text */}
            <div className="w-full mt-16 text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-center">
                <span className="bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] text-transparent bg-clip-text">
                    LET’S WORK TOGETHER
                </span>
            </div>
        </footer>
    );
};

export default Footer;
