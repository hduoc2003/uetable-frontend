import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function InfoIcon({
    size,
    color,
    className
}: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size ?? 18}
            height={size ?? 18}
            fill={color ?? THEME.ROYAL_GRAY_COLOR}
            className={className}
        >
            <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/><path d="M12,10H11a1,1,0,0,0,0,2h1v6a1,1,0,0,0,2,0V12A2,2,0,0,0,12,10Z"/><circle cx="12" cy="6.5" r="1.5"/>
        </svg>
    )
}
