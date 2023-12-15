'use client';

import TitleWithBox from "@/components/common/TitleWithBox";
import { Divider } from "antd";
import Documents from "./Document/Documents";
import { RegisteredSubject } from "@/types/subject";
import Note from "./Note/Note";

interface Props {
  subject: RegisteredSubject | undefined
}

export default function Content({
  subject
}: Props) {
  return (
    <div className="pr-5">
        <Documents subject={subject}/>
        <Divider />
        <Note />
        <Divider />
        <TitleWithBox title='Mục tiêu'/>
    </div>
  );
}
