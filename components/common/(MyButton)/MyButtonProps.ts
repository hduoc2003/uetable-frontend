export interface MyButtonProps {
    className?: string
    children?: React.ReactNode
    onClick?: () => void
    iconSize?: string | number
    style?: React.CSSProperties
    ref?: React.RefObject<HTMLButtonElement>
    rounded?: boolean
}
