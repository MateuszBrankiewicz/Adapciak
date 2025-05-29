import { useState, useEffect } from "react";

interface UseResponsiveReturn {
    isMobile: boolean;
}

export const useResponsive = (breakpoint: number = 760): UseResponsiveReturn => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth <= breakpoint) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [breakpoint]);

    return { isMobile };
};
