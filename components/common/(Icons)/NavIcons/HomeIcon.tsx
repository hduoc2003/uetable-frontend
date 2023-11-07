import React from 'react'
import { IconProps } from '../IconProps'
import { IoHome } from 'react-icons/io5'
import { NAVBAR_STYLE } from '@/styles/navBar'

export default function HomeIcon(props: IconProps) {
  return (
    <IoHome size={NAVBAR_STYLE.ICON_SIZE} color={NAVBAR_STYLE.ICON_COLOR} {...props} />
  )
}
