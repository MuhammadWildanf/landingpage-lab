'use client';

import Image from "next/image";
import { useState } from 'react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        agree: false,
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null); // Clear previous messages

        if (!formData.agree) {
            setMessage({ type: 'error', text: 'You must agree to the processing of personal data.' });
            return;
        }

        if (!formData.name || !formData.email || !formData.message) {
            setMessage({ type: 'error', text: 'Please fill in all required fields (Name, Email, Message).' });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: result.message || 'Email sent successfully!' });
                setFormData({ name: '', email: '', phone: '', message: '', agree: false }); // Clear form
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to send email. Please try again.' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-2 sm:px-8" data-aos="fade-up">
            <div className="bg-transparent flex flex-col md:flex-row gap-0 md:gap-0 border-t border-white/20">
                {/* Kiri */}
                <div className="w-full md:w-1/2 flex flex-col gap-8 py-12 pr-0 md:pr-12">
                    <h2 className="text-5xl sm:text-6xl font-mono font-bold uppercase leading-tight tracking-widest mb-6">
                        <span className="bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] bg-clip-text text-transparent">GET IN TOUCH</span>
                    </h2>
                    <div className="flex flex-col gap-6 text-base font-mono">
                        <div className="flex flex-wrap gap-6">
                            <div>
                                <div className="mb-1 text-white/80">For inquiries :</div>
                                <div className="flex items-center gap-2 border border-white rounded-full px-4 py-2 text-white">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Z" /><path stroke="#fff" strokeWidth="2" d="m4 6 8 7 8-7" /></svg>
                                    visual.lab@imajiwa.id
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 text-white/80">Social :</div>
                                <div className="flex gap-2">
                                    <a href="#" className="border border-white rounded-full p-2 flex items-center justify-center hover:bg-[#E9FF4E]/20 transition"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="2" /><circle cx="17" cy="7" r="1.5" fill="#fff" /></svg></a>
                                    <a href="#" className="border border-white rounded-full p-2 flex items-center justify-center hover:bg-[#E9FF4E]/20 transition"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" /><rect x="16.5" y="6.5" width="2" height="2" rx="1" fill="#fff" /></svg></a>
                                    <a href="#" className="border border-white rounded-full p-2 flex items-center justify-center hover:bg-[#E9FF4E]/20 transition"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" /><path stroke="#fff" strokeWidth="2" d="M8 12c1.5 2 6.5 2 8 0" /><path stroke="#fff" strokeWidth="2" d="M9 9h.01M15 9h.01" /></svg></a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <div>
                                <div className="mb-1 text-white/80">Address :</div>
                                <div className="flex items-center gap-2 border border-white rounded-full px-4 py-2 text-white">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M12 21c-4-4-7-7.5-7-11A7 7 0 0 1 19 10c0 3.5-3 7-7 11Z" /><circle cx="12" cy="10" r="3" stroke="#fff" strokeWidth="2" /></svg>
                                    IMAJIWA Creative Studio
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 text-white/80">Call Us :</div>
                                <div className="flex items-center gap-2 border border-white rounded-full px-4 py-2 text-white">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.96.37 1.89.72 2.78a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.89.35 1.82.59 2.78.72A2 2 0 0 1 22 16.92Z" /></svg>
                                    +62 823-4567-900
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12">
                        <Image src="/assets/images/logo-hero.png" alt="IMAJIWA LAB" width={120} height={40} className="w-32 h-auto" />
                    </div>
                </div>
                {/* Kanan */}
                <div className="w-full md:w-1/2 flex flex-col gap-8 py-12 pl-0 md:pl-12 border-t md:border-t-0 md:border-l border-white/20">
                    <h3 className="text-3xl sm:text-4xl font-mono font-bold mb-8 tracking-widest">
                        <span className="bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] bg-clip-text text-transparent">Tell us everything<span className="text-[#CD1DA6]">..</span></span>
                    </h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                        <div>
                            <label htmlFor="name" className="block font-bold mb-1 text-white">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Smith" className="w-full bg-transparent border-b border-white/40 py-2 px-0 text-white font-mono placeholder:text-gray-400 focus:outline-none" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block font-bold mb-1 text-white">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@mail.com" className="w-full bg-transparent border-b border-white/40 py-2 px-0 text-white font-mono placeholder:text-gray-400 focus:outline-none" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block font-bold mb-1 text-white">Phone</label>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="enter your phone" className="w-full bg-transparent border-b border-white/40 py-2 px-0 text-white font-mono placeholder:text-gray-400 focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block font-bold mb-1 text-white">Message</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Write about your project" className="w-full bg-transparent border-b border-white/40 py-2 px-0 text-white font-mono placeholder:text-gray-400 focus:outline-none min-h-[80px]" required />
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" id="agree" name="agree" checked={formData.agree} onChange={handleChange} className="accent-[#E9FF4E] w-4 h-4" />
                            <label htmlFor="agree" className="text-xs text-white font-mono">I agree to use and processing of my personal data</label>
                        </div>
                        {message && (
                            <div className={`text-sm mt-2 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {message.text}
                            </div>
                        )}
                        <button type="submit" disabled={loading} className="mt-4 w-fit px-10 py-2 rounded-full bg-gradient-to-r from-[#CED4D4] via-[#CBAB79] to-[#CD1DA6] text-black font-bold font-mono text-lg shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Sending...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
} 