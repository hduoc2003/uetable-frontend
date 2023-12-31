import React from 'react'
import DecorBox from './DecorBox';
import { twMerge } from 'tailwind-merge';

interface Props {
    color?: string;
    title: React.ReactNode;
    titleClassName?: string;
    size?: 'small' | 'middle' | 'large' | 'ultra';
    boxContent?: React.ReactNode;
    className?: string
    boxClassName?: string
}

export default function TitleWithBox({
    color,
    title,
    titleClassName,
    size = 'large',
    boxContent,
    className,
    boxClassName
}: Props) {
    const textSize = (size === 'ultra'? 'text-3xl': ('large' ? 'text-2xl' : (size === 'middle' ? 'text-xl' : 'text-lg')))
    return (
        <div className={twMerge("flex gap-4 items-center", className)}>
            <DecorBox color={color} className={boxClassName}>
                {boxContent}
            </DecorBox>
            <span className={twMerge(`font-semibold ${textSize}`, titleClassName)}>{title}</span>
        </div>
    )
}
