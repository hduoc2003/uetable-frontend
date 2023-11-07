import React from 'react'
import { ImStatsDots } from 'react-icons/im'
import { IconProps } from '../IconProps'
import { NAVBAR_STYLE } from '@/styles/navBar'

export default function StatsIcon(props: IconProps) {
  return (
    <ImStatsDots size={NAVBAR_STYLE.ICON_SIZE} color={NAVBAR_STYLE.ICON_COLOR} {...props}/>
  )
}
