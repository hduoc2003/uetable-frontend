import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function AngleRightIcon({
    size,
    color,
    className
}: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size ?? 20}
            height={size ?? 20}
            fill={color ?? THEME.ROYAL_GRAY_COLOR}
            className={className}
        >
            <path xmlns="http://www.w3.org/2000/svg" d="M6.079,22.5a1.5,1.5,0,0,1,.44-1.06l7.672-7.672a2.5,2.5,0,0,0,0-3.536L6.529,2.565A1.5,1.5,0,0,1,8.65.444l7.662,7.661a5.506,5.506,0,0,1,0,7.779L8.64,23.556A1.5,1.5,0,0,1,6.079,22.5Z"/>
        </svg>
    )
}
