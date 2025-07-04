'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

export default function AOSInitializer() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Durasi animasi dalam ms
            once: true, // Animasi hanya berjalan sekali saat di-scroll ke view
            // easing: 'ease-out', // Jenis easing animasi
        });
    }, []);

    return null; // Komponen ini tidak merender apa-apa
} 