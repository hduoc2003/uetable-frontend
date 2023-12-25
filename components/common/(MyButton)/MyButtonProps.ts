import { ButtonProps } from "antd"

export interface MyButtonProps extends ButtonProps {
    // className?: string
    // children?: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => (any | Promise<any>)
    onDoneAnimationEnd?: () => any
    iconSize?: string | number
    // style?: React.CSSProperties
    // ref?: React.RefObject<HTMLButtonElement>
    rounded?: boolean
    displayChildrenWhenLoading?: boolean
    // htmlType?: "button" | "reset" | "submit"
}
