import { useRef } from "react";

export const use3DTilt = () => {
    const ref = useRef<HTMLImageElement | null>(null);
    const frame = useRef<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;

        if (frame.current) cancelAnimationFrame(frame.current);

        frame.current = requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / 18;
            const rotateY = (x - centerX) / 18;

            el.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)
      `;
        });
    };

    const handleMouseLeave = () => {
        if (frame.current) cancelAnimationFrame(frame.current);

        if (ref.current) {
            ref.current.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        }
    };

    return { ref, handleMouseMove, handleMouseLeave };
};