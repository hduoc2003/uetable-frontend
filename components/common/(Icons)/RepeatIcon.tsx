import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function RepeatIcon({
    size,
    color,
    className
}: IconProps) {
    return (
        <svg
            viewBox="0 0 16 16"
            width={size ?? 16}
            height={size ?? 16}
            fill={color ?? THEME.ROYAL_GRAY_COLOR}
            className={className}
        >
            <path d="M10.805 1.862a.67.67 0 0 0-.943 0c-.261.26-.26.682 0 .943l.526.526H6.667A4.67 4.67 0 0 0 2 7.998v.667c0 .368.298.667.667.667s.667-.299.667-.667v-.667c0-1.841 1.492-3.333 3.333-3.333h3.724l-.529.529a.67.67 0 0 0 0 .943c.26.261.682.26.943 0l1.43-1.43a1 1 0 0 0 0-1.414l-1.43-1.43zM9.332 12.667A4.67 4.67 0 0 0 13.999 8v-.667c0-.368-.298-.667-.667-.667s-.667.298-.667.667V8c0 1.841-1.492 3.333-3.333 3.333H5.608l.529-.529a.67.67 0 0 0 0-.943c-.26-.261-.682-.26-.943 0l-1.43 1.43a1 1 0 0 0 0 1.414l1.43 1.43a.67.67 0 0 0 .943 0c.261-.26.26-.682 0-.943l-.526-.526h3.721z"></path>

        </svg>
    )
}

