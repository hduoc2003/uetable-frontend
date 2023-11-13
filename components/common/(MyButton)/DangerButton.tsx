import { Button } from 'antd'
import { BaseButtonProps } from 'antd/es/button/button'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function DangerButton({
    children,
    onClick,
    disable = false,
    className
} : {
    children: React.ReactNode
    onClick?: () => void
    disable?: boolean
    className?: string
}) {
    return (
        <Button danger className={twMerge('group hover:bg-danger', className)} onClick={onClick} disabled={disable}>
            <div className='group-hover:text-secondary'>{children}</div>
        </Button>
    )
}
