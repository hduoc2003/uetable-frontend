import React from 'react'
import { IconProps } from './IconProps'
import { THEME } from '@/styles/theme'

export default function ExclamationIcon({
    size, color, className
}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={size ?? 15}
            height={size ?? 15}
            fill={color ?? THEME.DANGER_COLOR}
            className={className}
        >
            <g xmlns="http://www.w3.org/2000/svg">
                <path d="M256,512c141.385,0,256-114.615,256-256S397.385,0,256,0S0,114.615,0,256C0.153,397.322,114.678,511.847,256,512z    M234.667,128c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333v170.667   c0,11.782-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333V128z M256,384c11.782,0,21.333,9.551,21.333,21.333   s-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333S244.218,384,256,384z" />
            </g>
        </svg>
    )
}

