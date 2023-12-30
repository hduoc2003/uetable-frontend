import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function MessageIcon({
    size,
    color,
    className,
    solid
}: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} 
        width={size ?? 20}
        height={size ?? 20}
        fill={color ?? '#2A85FF'}
        viewBox="0 0 16 16">
            <path d="M4.666 6c0-.368.298-.667.667-.667h5.333c.368 0 .667.298.667.667s-.298.667-.667.667H5.333c-.368 0-.667-.298-.667-.667zm0 2.667c0-.368.298-.667.667-.667H8c.368 0 .667.298.667.667s-.298.667-.667.667H5.333c-.368 0-.667-.298-.667-.667zm8-6.667a2 2 0 0 1 2 2h0v6.667a2 2 0 0 1-2 2h0-7.333L3.52 14.178c-.868.724-2.187.106-2.187-1.024h0V4a2 2 0 0 1 2-2h0zm0 1.333H3.333c-.368 0-.667.298-.667.667v9.153l1.813-1.511c.24-.2.542-.309.854-.309h7.333c.368 0 .667-.298.667-.667V4c0-.368-.298-.667-.667-.667z"></path>
        </svg>

    )
}
