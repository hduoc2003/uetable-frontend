import { Button } from 'antd'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function MyButtonWrapper({
    className,
    children
}: {
    children?: React.ReactNode
    className?: string
}) {
    return (
        <Button className={twMerge('p-1 h-fit w-fit text-fs-inherit', className)}>
            {children}
        </Button>
    )
}
