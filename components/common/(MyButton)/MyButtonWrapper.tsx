import { Button } from 'antd'
import React, { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { MyButtonProps } from './MyButtonProps'

export default function MyButtonWrapper(props: MyButtonProps) {
    let className = 'p-1 h-fit w-fit text-fs-inherit border-0 group';
    if (props.rounded)
        className += ' rounded-full'
    return (
        <Button
            {...props}
            className={twMerge(className, props.className)}
        >
            {props.children}
        </Button>
    )
}
