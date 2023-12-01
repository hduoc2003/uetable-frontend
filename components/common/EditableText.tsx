'use client';

import { Input, InputRef } from "antd";
import React, { useEffect } from "react";
import { useRef, useState } from "react";

interface EditableTextProps {
    defaultValue: string
    normalText: React.ReactNode
    placeholder?: string
    editing?: boolean
    mode?: 'normal' | 'editable'
    onComplete?: (value: string) => void
    onStartEditing?: () => void
    className?: string
}

export default function EditableText({
    defaultValue,
    placeholder,
    normalText,
    editing: _editing = false,
    mode = 'editable',
    onComplete,
    onStartEditing,
    className
}: EditableTextProps): JSX.Element {
    const [editing, setEditing] = useState(() => _editing);

    const inputRef = useRef<InputRef>(null);
    const handleComplete = () => {
        setEditing(false);
        onComplete?.(inputRef.current?.input?.value ?? '')
    }

    if (!editing)
        return (
            <button
                onClick={() => {
                    if (mode === 'editable') {
                        onStartEditing?.();
                        setEditing(true);}
                    }
                }
                className={mode === 'editable' ? 'cursor-pointer' : 'cursor-default'}
            >
                {normalText}
            </button>
        )
    return (
        <Input
            ref={inputRef}
            className="w-fit"
            placeholder={placeholder}
            defaultValue={defaultValue}
            onPressEnter={handleComplete}
            autoFocus
        />
    );
}
