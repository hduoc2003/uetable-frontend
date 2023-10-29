import React from 'react'
import { IconProps } from '../IconProps'
import { MdTopic } from 'react-icons/md'
import { NAVBAR_STYLE } from '@/styles/navBar'

export default function AllSubjectsIcon(props: IconProps) {
  return (
    <MdTopic size={NAVBAR_STYLE.ICON_SIZE} color={NAVBAR_STYLE.ICON_COLOR} {...props}/>
  )
}
