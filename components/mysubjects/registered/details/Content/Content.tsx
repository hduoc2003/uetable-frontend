'use client';

import TitleWithBox from "@/components/common/TitleWithBox";
import { Divider } from "antd";
import Documents from "./Document/Documents";
import { RegisteredSubject } from "@/types/subject";
import Note from "./Note/Note";

interface Props {
  subjectId: string
  subjectName: string
}

export default function Content({
  subjectId,
  subjectName
}: Props) {
  return (
    <div className="pr-5">
        <Documents subjectId={subjectId} subjectName={subjectName}/>
        <Divider />
        <Note />
        <Divider />
        <TitleWithBox title='Mục tiêu'/>
    </div>
  );
}
