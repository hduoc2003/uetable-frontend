import { Typography } from 'antd';
import React from 'react'
import { twMerge } from 'tailwind-merge';

const {Text} = Typography;

interface Props {
    className?: string;
    color?: string;
    children?: React.ReactNode;
}

export default function Tag({
    color = '#B5E4CA', className, children
}: Props) {
  return (
    <div className={twMerge("py-1 px-2 rounded-md", className)} style={{backgroundColor: color}}>
        <Text strong>{children}</Text>
    </div>
  )
}
