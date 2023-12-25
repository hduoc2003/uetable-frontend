import { Button } from 'antd'
import { BaseButtonProps } from 'antd/es/button/button'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { MyButtonProps } from './MyButtonProps'
import MyButtonWrapper from './MyButtonWrapper'

export default function DangerButton(props : MyButtonProps) {
    return (
        <MyButtonWrapper {...props} danger className={twMerge('group hover:bg-danger border px-2 hover:!border-danger', props.className)}>
            <div className='group-hover:text-secondary'>{props.children}</div>
        </MyButtonWrapper>
    )
}
