import { Button } from 'antd'
import { BaseButtonProps } from 'antd/es/button/button'
import React from 'react'

export default function DangerButton({
    children,
    onClick,
    disable = false
} : {
    children: React.ReactNode
    onClick?: () => void
    disable?: boolean
}) {
    return (
        <Button danger className='group hover:bg-danger' onClick={onClick} disabled={disable}>
            <div className='group-hover:text-secondary'>{children}</div>
        </Button>
    )
}
