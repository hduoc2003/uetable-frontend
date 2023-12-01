'use client';

import { useState } from "react";
import { IconProps } from "./IconProps";

export default function IconWrapper({
    Icon,
    iconProps
}: {
    Icon: React.FC<IconProps>
    iconProps: IconProps
}) {
    const [solid, setSolid] = useState(false);
    return (
        <div
            onMouseEnter={iconProps.solidOnHover ? () => {setSolid(true);} : undefined}
            onMouseLeave={iconProps.solidOnHover ? () => setSolid(false) : undefined}
        >
            <Icon {...iconProps}  solid={solid}/>
        </div>
    );
}
