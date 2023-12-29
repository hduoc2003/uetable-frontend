import { Button } from 'antd'
import { BaseButtonProps } from 'antd/es/button/button'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { MyButtonProps } from './MyButtonProps'
import MyButtonWrapper from './MyButtonWrapper'

export default function DangerButton(props : MyButtonProps) {
    return (
        <MyButtonWrapper {...props} className={twMerge('group hover:bg-danger border-2 px-2 hover:!border-danger', props.className)}>
            <div className='text-danger group-hover:text-secondary font-semibold'>{props.children}</div>
        </MyButtonWrapper>
    )
}
