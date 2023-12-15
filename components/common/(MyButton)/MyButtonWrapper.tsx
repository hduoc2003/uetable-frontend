'use client'

import { Button, ButtonProps, Spin } from 'antd'
import React, { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MyButtonProps } from './MyButtonProps'
import { isAsyncFunction } from '@/utils/typeChecking'
import { omit } from 'lodash'
import { LoadingOutlined } from '@ant-design/icons'
import { IoMdDoneAll } from 'react-icons/io'

export default function MyButtonWrapper(props: MyButtonProps) {
    let className = 'p-1 h-fit w-fit text-fs-inherit border-0 group hover:!border-contrast hover:!text-contrast';
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    if (props.rounded)
        className += ' rounded-full'
    const onClick: ButtonProps['onClick'] = (e) => {
        console.log('haha', isAsyncFunction(props.onClick), props.onDoneAnimationEnd)
        if (isAsyncFunction(props.onClick)) {
            setLoading(true);
            props.onClick().then(() => {
                setFinished(true);
                setTimeout(() => {
                    setFinished(false);
                    setLoading(false);
                    props.onDoneAnimationEnd?.()
                }, 1500)
            })
        }
        else
            props.onClick?.(e);
    }
    return (
        <Button
            {...omit(props, ['rounded'])}
            onClick={onClick}
            className={twMerge(className, props.className)}
            disabled={loading && !finished}
        >
            <div className="flex gap-3 items-center">
                {props.children}
                {loading && (
                    finished ?
                    <IoMdDoneAll size='1.2em'/> :
                    <Spin indicator={<LoadingOutlined/>} className='text-current' />
                )}
            </div>
        </Button>
    )
}
