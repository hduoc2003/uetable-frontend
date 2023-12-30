'use client';

import { THEME } from "@/styles/theme";
import { Button } from "antd";
import { BiDownload } from "react-icons/bi";
import { FaDownload } from "react-icons/fa6";
import { MyButtonProps } from "./MyButtonProps";
import MyButtonWrapper from "./MyButtonWrapper";

export default function DownloadButton(props: MyButtonProps) {
  return (
    <MyButtonWrapper {...props}>
      <FaDownload size={'1.5em'} color={THEME.PRIMARY_COLOR}></FaDownload>
    </MyButtonWrapper>
  );
}
