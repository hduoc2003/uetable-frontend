import React from 'react'
import { AiFillSchedule } from 'react-icons/ai'
import { IconProps } from '../IconProps'
import { NAVBAR_STYLE } from '@/styles/navBar'

export default function ScheduleIcon(props: IconProps) {
  return (
    <AiFillSchedule size={NAVBAR_STYLE.ICON_SIZE} color={NAVBAR_STYLE.ICON_COLOR} {...props}/>
  )
}
