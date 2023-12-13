'use client';

import { SubjectAPI } from "@/api/subjectAPI";
import Documents from "@/components/all-subjects/details/Documents";
import Overview from "@/components/all-subjects/details/Overview";
import RelatedSubject from "@/components/all-subjects/details/Related";
import Taskbar from "@/components/all-subjects/details/TaskBar";
import DecorBox from "@/components/common/DecorBox";
import Tag from "@/components/common/Tag";
import TitleWithBox from "@/components/common/TitleWithBox";
import Main from "@/components/layouts/Main";
import { LetterGradeTag } from "@/components/mysubjects/SemesterInfoTable/SemesterInfoTable";
import { PageProps } from "@/types/PageProps";
import { SubjectAll } from "@/types/subject";
import { letterGrade } from "@/utils/subjects";
import { Divider, Skeleton, Typography } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

const { Text, Title } = Typography;

export type AllSubjectsDetailsPageProps = PageProps<{
  subjectId: string
}>

export default function AllSubjectsDetailsPage({
  searchParams: {
    subjectId
  }
}: AllSubjectsDetailsPageProps) {
  const { data: subject, isLoading } = useSWR<SubjectAll>(subjectId, SubjectAPI.getSubjectById);

  return (
    <Main title={'Thông tin học phần'}>
      <div className="flex">
        <div className="flex flex-col gap-8 w-3/4">
          <Overview subject={subject} />
          <Divider />
          <Documents subjectId={subjectId}/>
          <Divider />
          <div className="flex flex-col">
            <TitleWithBox title={'Bình luận'} boxContent={4} size="middle"/>
          </div>
        </div>
        <Divider type="vertical" className="h-auto" />
        <div className="w-1/4 pl-5">
          <RelatedSubject subjectId={subjectId} />
        </div>
      </div>
    </Main>
  );
}
