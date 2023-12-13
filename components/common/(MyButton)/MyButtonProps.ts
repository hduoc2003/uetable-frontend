export interface MyButtonProps {
    className?: string
    children?: React.ReactNode
    onClick?: () => (any | Promise<any>)
    onDoneAnimationEnd?: () => any
    iconSize?: string | number
    style?: React.CSSProperties
    ref?: React.RefObject<HTMLButtonElement>
    rounded?: boolean
    htmlType?: "button" | "reset" | "submit"
}
