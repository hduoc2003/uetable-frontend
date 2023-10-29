import { Button } from "antd";
import React from "react";
import { twMerge } from "tailwind-merge";
export function SaveButton({
    editing,
    onClick,
    children,
    disable = false
}: {
    editing: boolean
    onClick: () => void
    disable?: boolean
    children: React.ReactNode
}) {
    return (
        <Button
            className={`group border-green-400 ${disable ? '' : 'hover:bg-green-500'} ${editing ? 'bg-green-400' : ''}`}
            onClick={onClick}
            disabled={disable}
        >
            <span
                className={twMerge(`group-hover:text-secondary ${disable ? '' : 'text-green-400'}`, `${editing ? 'text-secondary' : ''}`)}
            >
                {children}
            </span>
        </Button>
    );
}
