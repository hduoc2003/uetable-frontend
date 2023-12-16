import React from 'react'
import { IconProps } from './IconProps'
import { THEME } from '@/styles/theme'

export default function EditIcon({
    size, color, className
}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width={size ?? 16}
            height={size ?? 16}
            fill={color ?? THEME.ROYAL_GRAY_COLOR}
            className={className}
        >
            <path d="M12.518 2.545l.943.943a2 2 0 0 1 0 2.828l-6.928 6.928c-.093.093-.212.157-.341.182l-3.536.707c-.466.093-.878-.318-.784-.784l.707-3.536c.026-.129.089-.248.182-.341L9.69 2.545a2 2 0 0 1 2.828 0zM8.747 5.373l-4.9 4.9-.471 2.357 2.357-.471 4.9-4.9-1.886-1.886zm2.828-1.886c-.26-.26-.682-.26-.943 0h0l-.943.943 1.886 1.886.943-.943c.26-.26.26-.682 0-.943h0z"></path>
        </svg>
    )
}
