import React, { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > 400;
            if (shouldShow !== isVisible) {
                setIsVisible(shouldShow);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    const scrollToTop = () => {
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
            window.scrollTo(0, 0);
        }
    };

    if (!isVisible) return null;

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-[9998] cursor-pointer group"
        >
            <div className="rounded-full p-3 bg-slate-800/90 border border-slate-700 shadow-xl backdrop-blur-sm transition-all group-hover:bg-purple-700 group-hover:shadow-2xl">
                <i className="fa-solid fa-arrow-up text-white"></i>
            </div>
        </button>
    );
}


