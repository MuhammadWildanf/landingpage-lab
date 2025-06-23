'use client';

import { useEffect, useRef } from "react";

const COLORS = [
    "rgba(205,29,166,0.4)", // pink
    "rgba(46,196,255,0.4)", // blue
    "rgba(233,255,78,0.3)", // yellow
];

export default function CursorEffect() {
    const ref = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            target.current.x = e.clientX - 150;
            target.current.y = e.clientY - 150;
        };
        window.addEventListener("mousemove", move);

        let running = true;
        function animate() {
            pos.current.x += (target.current.x - pos.current.x) * 0.18;
            pos.current.y += (target.current.y - pos.current.y) * 0.18;
            if (ref.current) {
                ref.current.style.left = `${pos.current.x}px`;
                ref.current.style.top = `${pos.current.y}px`;
            }
            if (running) requestAnimationFrame(animate);
        }
        animate();

        return () => {
            running = false;
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <div
            ref={ref}
            className="pointer-events-none fixed z-40"
            style={{
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: `radial-gradient(circle at 60% 40%, ${COLORS[0]} 0%, transparent 60%), 
                             radial-gradient(circle at 40% 60%, ${COLORS[1]} 0%, transparent 60%),
                             radial-gradient(circle at 50% 50%, ${COLORS[2]} 0%, transparent 70%)`,
                mixBlendMode: "screen",
                filter: "blur(60px)",
                opacity: 0.8,
                left: 0,
                top: 0,
            }}
        />
    );
} 