import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function LikeIcon({
    size,
    color,
    className,
    solid
}: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} 
        width={size ?? 20}
        height={size ?? 20}
        // fill={color ?? 'rgb(246,80,102)'}
        viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
        </svg>

    )
}