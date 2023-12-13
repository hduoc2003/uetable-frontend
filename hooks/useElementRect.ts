import { useCallback, useState } from "react";

export function useElementRect<ElementType extends HTMLElement>() {
    let [width, setWidth] = useState(0);
    const ref = useCallback((node: ElementType) => {
        const resizeObserver = new ResizeObserver(() => {
            setTimeout(() => {
                const newWidth = node.clientWidth;
                setWidth(newWidth);
            }, 100);
        });
        resizeObserver.observe(node);
    }, []);
    return {
        ref: ref,
        rect: {
            width
        }
    }
}
