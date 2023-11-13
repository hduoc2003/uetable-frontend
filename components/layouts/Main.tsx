'use client';
import { FloatButton, Space, Typography } from 'antd'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import BackTopIcon from '../common/(Icons)/BackTopIcon'

const {Title} = Typography

export default function Main({
    className,
    children,
    title,
    goToTop = true
}: {
    className?: string
    children?: React.ReactNode
    title?: React.ReactNode
    goToTop?: boolean
}) {
    return (
        <div className='flex flex-col ml-layout-el w-auto mr-body-pd'>
            {title && <Title level={2} className='mt-3'>{title}</Title>}
            <main
                className={twMerge(`
                bg-secondary
                rounded-layout-el
                p-8
                overflow-auto
                min-h-[calc(100vh-109px)]
                shadow
            `,
                    className
                )}
            >
                {children}
                {goToTop &&
                    <FloatButton.BackTop
                        icon={<BackTopIcon className='absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 group-hover:fill-black'/>}
                        className='group'
                    />
                }
            </main>
        </div>
    )
}
