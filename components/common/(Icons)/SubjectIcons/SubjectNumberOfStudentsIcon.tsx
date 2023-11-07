import React from 'react'
import { IconProps } from '../IconProps'
import { SUBJECT_STYLE } from '@/styles/subjects'
import { HiUserGroup } from 'react-icons/hi'

export default function SubjectNumberOfStudentsIcon(props: IconProps) {
  return (
    <HiUserGroup color={SUBJECT_STYLE.ICON_COLOR} size={SUBJECT_STYLE.ICON_SIZE} {...props}/>
  )
}
