import React from 'react'
import { IconProps } from '../IconProps'
import { SUBJECT_STYLE } from '@/styles/subjects'
import { LuTextQuote } from 'react-icons/lu'

export default function SubjectDescriptionIcon(props: IconProps) {
  return (
    <LuTextQuote color={SUBJECT_STYLE.ICON_COLOR} size={SUBJECT_STYLE.ICON_SIZE} {...props}/>
  )
}
