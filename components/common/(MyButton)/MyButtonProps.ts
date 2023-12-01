export interface MyButtonProps {
    className?: string
    children?: React.ReactNode
    onClick?: () => (void | Promise<void>)
    onDoneAnimationEnd?: () => void
    iconSize?: string | number
    style?: React.CSSProperties
    ref?: React.RefObject<HTMLButtonElement>
    rounded?: boolean
}
