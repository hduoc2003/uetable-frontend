'use client'

import { Button, ButtonProps, Spin } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MyButtonProps } from './MyButtonProps'
import { isAsyncFunction } from '@/utils/typeChecking'
import { isUndefined, omit } from 'lodash'
import { LoadingOutlined } from '@ant-design/icons'
import { IoMdDoneAll } from 'react-icons/io'

export default function MyButtonWrapper(props: MyButtonProps) {
    const {displayChildrenWhenLoading = true } = props;
    let className = 'p-1 h-fit w-fit text-fs-inherit border-0 group hover:!border-contrast hover:!text-contrast';
    const [loading, setLoading] = useState<boolean>(props.loading as boolean ?? false);
    const handleEndloading = useCallback(() => {
        setFinished(true);
        setTimeout(() => {
            setFinished(false);
            setLoading(false);
            props.onDoneAnimationEnd?.()
        }, 1500)
    }, [props])
    const [finished, setFinished] = useState(false);
    if (props.rounded)
        className += ' rounded-full'
    const onClick: ButtonProps['onClick'] = (e) => {
        if (isAsyncFunction(props.onClick)) {
            setLoading(true);
            props.onClick().then(() => {
                handleEndloading();
            })
        }
        else
            props.onClick?.(e);
    }
    return (
        <Button
            {...omit(props, ['rounded', 'loading'])}
            onClick={onClick}
            className={twMerge(className, props.className)}
            disabled={loading && !finished}
        >
            <div className="flex gap-3 items-center">
                {
                    loading ? displayChildrenWhenLoading && props.children
                    : props.children
                }
                {loading && (
                    finished ?
                        <IoMdDoneAll size='1.2em' /> :
                        <Spin indicator={<LoadingOutlined />} className='text-current' />
                )}
            </div>
        </Button>
    )
}
