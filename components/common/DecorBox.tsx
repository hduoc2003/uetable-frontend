import { Typography } from 'antd';
import { isUndefined } from 'lodash';
import randomInteger from 'random-int';
import React from 'react'
import { twMerge } from 'tailwind-merge'

const {Text} = Typography;

const COLORS = ['#7bb8ea', '#FFBC99', '#FFD88D', '#B5E4CA', '#CABDFF', '#B1E5FC', '#E0C9C1']

const DecorBox = ({
  color,
  className,
  children
}: {
  color?: string,
  className?: string,
  children?: React.ReactNode
}) => {
  if (isUndefined(color))
    color = COLORS[randomInteger(COLORS.length - 1)]
  if (children)
    return (
      <div className={twMerge("min-h-8 px-1 min-w-8 rounded-md flex items-center justify-center text-center", className)} style={{ backgroundColor: color }}>
        <Text strong className='font-semibold text-xl'>{children}</Text>
      </div>
    )

  return (
    <div className={twMerge('h-8 w-4 rounded', className)} style={{ backgroundColor: color }}/>
  )
}

export default React.memo(DecorBox)
