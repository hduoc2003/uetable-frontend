import React from 'react'
import { IconProps } from '../IconProps'
import { SUBJECT_STYLE } from '@/styles/subjects'
import { PiChalkboardTeacherFill } from 'react-icons/pi'

export default function SubjectTeacherNameIcon(props: IconProps) {
  return (
    <PiChalkboardTeacherFill color={SUBJECT_STYLE.ICON_COLOR} size={SUBJECT_STYLE.ICON_SIZE} {...props}/>
  )
}
