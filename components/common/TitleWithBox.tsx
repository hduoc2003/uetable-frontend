import React from 'react'
import DecorBox from './DecorBox';
import { twMerge } from 'tailwind-merge';

interface Props {
    color?: string;
    title: React.ReactNode;
    titleClassName?: string;
    size?: 'small' | 'middle' | 'large';
    boxContent?: React.ReactNode;
    className?: string
}

export default function TitleWithBox({
    color,
    title,
    titleClassName,
    size = 'large',
    boxContent,
    className
}: Props) {
    const textSize = (size === 'large' ? 'text-2xl' : (size === 'middle' ? 'text-xl' : 'text-lg'))
    return (
        <div className={twMerge("flex gap-4 items-center", className)}>
            <DecorBox color={color}>
                {boxContent}
            </DecorBox>
            <span className={twMerge(`font-semibold ${textSize}`, titleClassName)}>{title}</span>
        </div>
    )
}
