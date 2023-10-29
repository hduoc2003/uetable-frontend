import { NAVBAR_STYLE } from '@/styles/navBar'
import React from 'react'
import { BsPersonRolodex } from 'react-icons/bs'
import { IconProps } from '../IconProps'

export default function MySubjectIcon(props: IconProps) {
  return (
    <BsPersonRolodex size={NAVBAR_STYLE.ICON_SIZE} color={NAVBAR_STYLE.ICON_COLOR} {...props}/>
  )
}
