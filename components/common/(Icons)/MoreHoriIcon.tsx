import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function MoreHoriIcon({
    size,
    color,
    className
}: IconProps) {
    return (
        <svg
            viewBox="0 0 16 16"
            width={size ?? 20}
            height={size ?? 20}
            fill={color ?? THEME.ROYAL_GRAY_COLOR}
            className={className}
        >
            <path d="M5.334 8.006c0 .736-.597 1.333-1.333 1.333s-1.333-.597-1.333-1.333S3.264 6.673 4 6.673s1.333.597 1.333 1.333zm4 0c0 .736-.597 1.333-1.333 1.333s-1.333-.597-1.333-1.333S7.264 6.673 8 6.673s1.333.597 1.333 1.333zm4 0c0 .736-.597 1.333-1.333 1.333s-1.333-.597-1.333-1.333.597-1.333 1.333-1.333 1.333.597 1.333 1.333z"></path>
        </svg>


    )
}
