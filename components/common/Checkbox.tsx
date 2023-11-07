'use client';

import { Space } from "antd";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";

interface MyCheckboxProps {
    onClick: () => void
    children: React.ReactNode,
    checked: boolean
}

export default function MyCheckbox({
    onClick,
    children,
    checked = false
}: MyCheckboxProps) {

    return (
        <div className={`flex w-fit gap-1 group ${checked ? 'bg-light-primary rounded-md pr-2' : ''}`}>
            <Checkbox
                checked={checked}
                onClick={onClick}
                className="group-hover:bg-light-primary rounded-md p-2"
            >
            </Checkbox>
            <button onClick={onClick}>{children}</button>
        </div>
    );
}
