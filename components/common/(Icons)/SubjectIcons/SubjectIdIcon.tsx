import React from 'react'
import { IconProps } from '../IconProps'
import { MdTopic } from 'react-icons/md'
import { SUBJECT_STYLE } from '@/styles/subjects'

export default function SubjectIdIcon(props: IconProps) {
  return (
    <MdTopic key={0} size={SUBJECT_STYLE.ICON_SIZE} color={SUBJECT_STYLE.ICON_COLOR} {...props}/>
  )
}
