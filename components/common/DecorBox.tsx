import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function DecorBox({
    color = '#7bb8ea',
    className
} : {
    color?: string,
    className?: string
}) {
  return (
    <div className={twMerge('h-8 w-4 rounded', className)} style={{backgroundColor: color}}></div>
  )
}
