import React from 'react'
import { IconProps } from '../IconProps'
import { NAVBAR_STYLE } from '@/styles/navBar'

export default function MySubjectIcon({
  size, color, className
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size ?? NAVBAR_STYLE.ICON_SIZE}
      height={size ?? NAVBAR_STYLE.ICON_SIZE}
      fill={color ?? NAVBAR_STYLE.ICON_COLOR}
      className={className}
    >
      <path d="m12,10c-1.93,0-3.5,1.57-3.5,3.5s1.57,3.5,3.5,3.5,3.5-1.57,3.5-3.5-1.57-3.5-3.5-3.5Zm0,5c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5.673,1.5,1.5-.673,1.5-1.5,1.5Zm7.949-9.464l-3.484-3.486c-1.323-1.322-3.081-2.05-4.95-2.05h-4.515C4.243,0,2,2.243,2,5v14c0,2.757,2.243,5,5,5h10c2.757,0,5-2.243,5-5v-8.515c0-1.871-.729-3.628-2.051-4.95Zm-1.414,1.415c.318.317.587.67.805,1.05h-4.341c-.552,0-1-.449-1-1V2.659c.38.218.733.487,1.051.805l3.484,3.486Zm-9.363,15.05c.413-1.164,1.524-2,2.828-2s2.415.836,2.828,2h-5.656Zm10.828-3c0,1.654-1.346,3-3,3h-.101c-.465-2.279-2.485-4-4.899-4s-4.435,1.721-4.899,4h-.101c-1.654,0-3-1.346-3-3V5c0-1.654,1.346-3,3-3h4.515c.163,0,.325.008.485.023v4.977c0,1.654,1.346,3,3,3h4.977c.015.16.023.322.023.485v8.515Z" />
    </svg>
  )
}
