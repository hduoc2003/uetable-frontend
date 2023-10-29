'use client';

import { THEME } from "@/styles/theme";
import { Button } from "antd";
import { BiDownload } from "react-icons/bi";
import { FaDownload } from "react-icons/fa6";

export default function Download() {
  return (
    <Button icon={<FaDownload size={'1.5em'} color={THEME.PRIMARY_COLOR}></FaDownload>}>
    </Button>
  );
}
