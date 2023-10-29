import React from 'react'
import { IconProps } from '../IconProps'
import { SUBJECT_STYLE } from '@/styles/subjects'
import { MdPlace } from 'react-icons/md'

export default function SubjectPlaceIcon(props: IconProps) {
  return (
    <MdPlace color={SUBJECT_STYLE.ICON_COLOR} size={SUBJECT_STYLE.ICON_SIZE} {...props}/>
  )
}
