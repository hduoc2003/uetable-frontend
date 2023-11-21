import React from 'react'
import EditIcon from '../(Icons)/EditIcon'
import MyButtonWrapper from './MyButtonWrapper'
import { MyButtonProps } from './MyButtonProps'
import { twMerge } from 'tailwind-merge'

export default function EditButton(props: MyButtonProps) {
    return (
        <MyButtonWrapper {...props}>
            <EditIcon className='group-hover:fill-black' size={props.iconSize} />
        </MyButtonWrapper>
    )
}
