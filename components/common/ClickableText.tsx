import React from 'react'

interface Props {
    onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    children?: React.ReactNode
}
export default function ClickableText({
    onClick,
    children
}: Props) {
  return (
    <span className='cursor-pointer hover:text-clickable' onClick={onClick}>
        {children}
    </span>
  )
}
