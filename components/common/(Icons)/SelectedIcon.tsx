import { THEME } from "@/styles/theme";
import { IconProps } from "./IconProps";

export default function SelectedIcon({
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
            <path d="M1.528 8.195c.26-.26.682-.26.943 0h0l1.724 1.724.009.009 1.325 1.325a2 2 0 0 1-2.277-.391h0L1.528 9.138c-.26-.26-.26-.682 0-.943zm12.943-3.367c.26.26.26.682 0 .943l-5.091 5.091a2 2 0 0 1-2.828 0L4.828 9.138c-.26-.26-.26-.682 0-.943s.682-.26.943 0l1.724 1.724c.26.26.682.26.943 0l5.091-5.091c.26-.26.682-.26.943 0zm-4.276.033c.26-.26.682-.26.943 0s.26.682 0 .943h0L7.966 8.976l-.943-.943z"></path>
        </svg>
    )
}
