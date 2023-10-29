import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function Box({
    children,
    className
}: {
    children?: React.ReactNode
    className?: string
}) {
  return (
    <div className={twMerge('border border-gray-200 p-2 rounded-md w-fit', className)}>
        {children}
    </div>
  )
}
