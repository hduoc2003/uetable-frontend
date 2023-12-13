import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function NewTabIcon({
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
            <path xmlns="http://www.w3.org/2000/svg" d="M20,11v8c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5V9c0-2.757,2.243-5,5-5H13c.552,0,1,.448,1,1s-.448,1-1,1H5c-1.654,0-3,1.346-3,3v10c0,1.654,1.346,3,3,3H15c1.654,0,3-1.346,3-3V11c0-.552,.448-1,1-1s1,.448,1,1ZM21,0h-7c-.552,0-1,.448-1,1s.448,1,1,1h6.586L8.293,14.293c-.391,.391-.391,1.023,0,1.414,.195,.195,.451,.293,.707,.293s.512-.098,.707-.293L22,3.414v6.586c0,.552,.448,1,1,1s1-.448,1-1V3c0-1.654-1.346-3-3-3Z"/>
        </svg>
    )
}
