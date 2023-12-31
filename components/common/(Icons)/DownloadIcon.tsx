import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function DownloadIcon({
    size,
    color,
    className,
    solid
}: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className}
            width={size ?? 16}
            height={size ?? 16}
            fill={color ?? 'white'}
            viewBox="0 0 16 16">
            <path d="M13.333 9.333c.368 0 .667.298.667.667v1.333a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10c0-.368.298-.667.667-.667s.667.298.667.667v1.333c0 .368.298.667.667.667h8c.368 0 .667-.298.667-.667V10c0-.368.298-.667.667-.667zM8.001 2.666c.368 0 .667.298.667.667h0v5.391l1.861-1.861c.26-.26.682-.26.943 0s.26.682 0 .943h0l-2.527 2.527c-.521.521-1.365.521-1.886 0h0L4.53 7.804c-.26-.26-.26-.682 0-.943s.682-.26.943 0h0l1.862 1.862V3.333c0-.368.299-.667.667-.667z"></path>
        </svg>

    )
}

