import { THEME } from "@/styles/theme"
import { Button } from "antd"
import { BiCopy } from "react-icons/bi"
import { twMerge } from "tailwind-merge"
import MyButtonWrapper from "./MyButtonWrapper"

export default function CopyButton({
    size = '1em',
    color = THEME.ROYAL_GRAY_COLOR,
    className
} : {
    size?: number | string
    color?: string
    className?: string
}) {
    return (
        <MyButtonWrapper className={className}>
            <BiCopy size={size} color={color}></BiCopy>
        </MyButtonWrapper>
    )
}
