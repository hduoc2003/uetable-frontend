import React from 'react'
import { IconProps } from '../IconProps'
import { SUBJECT_STYLE } from '@/styles/subjects'
import { IoMdColorPalette } from 'react-icons/io'

export default function SubjectColorIcon(props: IconProps) {
  return (
    <IoMdColorPalette color={SUBJECT_STYLE.ICON_COLOR} size={SUBJECT_STYLE.ICON_SIZE} {...props}/>
  )
}
