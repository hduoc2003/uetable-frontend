import React from 'react'
import { IconProps } from '../IconProps'
import { SUBJECT_STYLE } from '@/styles/subjects'
import { BiSolidGroup } from 'react-icons/bi'

export default function SubjectGroupIcon(props: IconProps) {
  return (
    <BiSolidGroup color={SUBJECT_STYLE.ICON_COLOR} size={SUBJECT_STYLE.ICON_SIZE} {...props}/>
  )
}
