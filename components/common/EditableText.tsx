'use client';

import { Input, InputRef } from "antd";
import { TextAreaRef } from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface EditableTextProps {
    defaultValue: string
    normalText: React.ReactNode
    placeholder?: string
    editing?: boolean
    mode?: 'normal' | 'editable'
    onComplete?: (value: string) => void
    onStartEditing?: () => void
    className?: string
    type?: 'input' | 'textarea'
}

export default function EditableText({
    defaultValue,
    placeholder,
    normalText,
    editing: _editing = false,
    mode = 'editable',
    onComplete,
    onStartEditing,
    type = 'input',
    className
}: EditableTextProps): JSX.Element {
    const [editing, setEditing] = useState(() => _editing);

    const inputRef = useRef<InputRef>(null);
    const areaText = useRef<string>('');
    const handleComplete = () => {
        setEditing(false);
        if (type === 'input')
            onComplete?.(inputRef.current?.input?.value ?? '');
        else {
            onComplete?.(areaText.current)
        }
    }
    const Element = (type === 'input' ? Input : Input.TextArea)

    if (!editing)
        return (
            <button
                onClick={() => {
                    if (mode === 'editable') {
                        onStartEditing?.();
                        setEditing(true);}
                    }
                }
                className={`text-left ${mode === 'editable' ? 'cursor-pointer' : 'cursor-default'}`}
            >
                {normalText}
                <div className="h-[2px]"></div>
            </button>
        )
    return (
        <Element
            ref={inputRef}
            className={twMerge("w-fit editable-text p-0 border-0 border-b-2 rounded-none", className)}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onPressEnter={handleComplete}
            // input
            classNames={{
                'textarea': 'text-fs-inherit',
                'input': 'text-fs-inherit'
            }}
            autoFocus
            onBlur={handleComplete}
            autoSize={{minRows: 3}}
            {...(type === 'textarea' ? {
                onChange(text) {areaText.current = text.target.value}
            }: undefined)}
        />
    );
}
