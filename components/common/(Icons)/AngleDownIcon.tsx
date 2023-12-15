import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function AngleDownIcon({
    size,
    color,
    className
}: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size ?? '1em'}
            height={size ?? '1em'}
            fill={color ?? THEME.ROYAL_GRAY_COLOR}
            className={className}
        >
            <path xmlns="http://www.w3.org/2000/svg" d="M1.51,6.079a1.492,1.492,0,0,1,1.06.44l7.673,7.672a2.5,2.5,0,0,0,3.536,0L21.44,6.529A1.5,1.5,0,1,1,23.561,8.65L15.9,16.312a5.505,5.505,0,0,1-7.778,0L.449,8.64A1.5,1.5,0,0,1,1.51,6.079Z"/>
        </svg>
    )
}
