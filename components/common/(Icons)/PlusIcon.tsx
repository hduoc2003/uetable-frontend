import React from 'react'
import { IconProps } from './IconProps'
import { THEME } from '@/styles/theme'
import IconWrapper from './IconWrapper'

function InnerIcon({
    size, color, className, solid = false
}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size ?? 25}
            height={size ?? 25}
            fill={color ?? '#74E69D'}
            className={className}
        >
            {solid ?
                <path xmlns="http://www.w3.org/2000/svg" d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm4 13h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 0 2z"/>
                :
                <path xmlns="http://www.w3.org/2000/svg" d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z"/>
            }
        </svg>
    )
}

export default function PlusIcon(props: IconProps) {
    return <IconWrapper Icon={InnerIcon} iconProps={props}/>
}
