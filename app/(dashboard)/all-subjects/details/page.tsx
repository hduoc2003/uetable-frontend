'use client';

import { SubjectAllAPI } from "@/api/subjectAPI";
import { CommentAPI } from "@/api/commentAPI";
// import { CommentType } from "@/types/comment";
import Documents from "@/components/all-subjects/details/Documents";
import Overview from "@/components/all-subjects/details/Overview";
import RelatedSubject from "@/components/all-subjects/details/Related";
import Taskbar from "@/components/all-subjects/details/TaskBar";
// import CommentInfo from "@/components/common/Comment/CommentInfo";
import DecorBox from "@/components/common/DecorBox";
import Tag from "@/components/common/Tag";
import TitleWithBox from "@/components/common/TitleWithBox";
import Main from "@/components/layouts/Main";
import { LetterGradeTag } from "@/components/mysubjects/SemesterInfoTable/SemesterInfoTable";
import { PageProps } from "@/types/PageProps";
import { SubjectAll } from "@/types/subject";
import { Divider, Skeleton, Typography } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Fetcher from '@/api/Fetcher'
import Comment  from "@/components/common/Comment/Comment"
import genId from "@/utils/genId";

const { Text, Title } = Typography;
const fetchKey = genId()

export type AllSubjectsDetailsPageProps = PageProps<{
  subjectId: string
}>

export default function AllSubjectsDetailsPage({
  searchParams: {
    subjectId
  }
}: AllSubjectsDetailsPageProps) {
  const { data: subject, isLoading } = useSWR([fetchKey, subjectId], ([_, subjectId]) => {
    // console.log('refetch');
    return SubjectAllAPI.getSubjectById(subjectId)
  });

  return (
    <Main title={'Thông tin học phần'}>
      <div className="flex">
        <div className="flex flex-col gap-8 w-3/4">
          <Overview subject={subject} />
          <Divider />
          <Documents subjectId={subjectId} />
          <Divider />
          <Comment pageId={subjectId} pageType='S'/>
        </div>
        <Divider type="vertical" className="h-auto" />
        <div className="w-1/4 pl-5">
          <RelatedSubject subjectId={subjectId} />
        </div>
      </div>
    </Main>
  );
}
