import { Button } from "antd";
import React from "react";
import { twMerge } from "tailwind-merge";
import { MyButtonProps } from "./MyButtonProps";
import MyButtonWrapper from "./MyButtonWrapper";
export function SaveButton(props: MyButtonProps) {
    // let butClassName = `group border !border-green-400 text-green-400 px-3
    //                     hover:!text-white hover:bg-green-400 hover:!border-green-400 font-bold
    //                     `;
    let butClassName = `group text-white px-4 py-2 bg-blue-400
        hover:bg-blue-500 font-bold hover:!text-white
    `;
    butClassName = twMerge(butClassName, props.className)
    return (
        <MyButtonWrapper
            {...props}
            className={butClassName}
        >
            {props.children}
        </MyButtonWrapper>
    );
}
