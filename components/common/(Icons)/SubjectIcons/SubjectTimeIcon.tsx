import React from 'react'
import { IconProps } from '../IconProps'
import { SUBJECT_STYLE } from '@/styles/subjects'
import { BiSolidTimeFive } from 'react-icons/bi'

export default function SubjectTimeIcon(props: IconProps) {
  return (
    <BiSolidTimeFive color={SUBJECT_STYLE.ICON_COLOR} size={SUBJECT_STYLE.ICON_SIZE} {...props}/>
  )
}
