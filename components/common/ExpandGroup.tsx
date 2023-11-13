'use client';

import React from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ExpandGroupProps {
    expandIcon: React.ReactNode
    collapseIcon?: React.ReactNode
    expand?: boolean
    className?: string
    children?: React.ReactNode
    direction?: 'up' | 'down' | 'left' | 'right'
}

export default function ExpandGroup({
    expandIcon,
    collapseIcon,
    expand: _expand,
    className,
    children,
    direction = 'down'
}: ExpandGroupProps) {
    const flexDirection = (direction === 'left' || direction === 'right') ? 'row' : 'col';
    const flexReverse = (direction === 'left' || direction === 'up') ? '-reverse' : '';
    const [expand, setExpand] = useState(_expand);
    // const [ref] = useAutoAnimate();
    return (
        <div
            className={twMerge(`flex flex-${flexDirection}${flexReverse} gap-4 items-center`, className)}
            // ref={ref}
        >
            <div onClick={() => setExpand(!expand)}>{expand ? expandIcon : (collapseIcon ?? expandIcon)}</div>
            {expand &&
                React.Children.map(children, (child) => {
                    return (
                        <div className="animate__animated animate__slideInLeft">
                            {child}
                        </div>
                    )
                })
            }
        </div>
    );
}
