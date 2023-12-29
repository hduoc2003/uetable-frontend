'use client';

import Documents from "@/components/all-subjects/details/Documents";
import Overview from "@/components/all-subjects/details/Overview";
import RelatedSubject from "@/components/all-subjects/details/Related";
import TitleWithBox from "@/components/common/TitleWithBox";
import Main from "@/components/layouts/Main";
import { PageProps } from "@/types/PageProps";
import { SubjectAll } from "@/types/subject";
import { Divider, Typography } from "antd";
import useSWR from "swr";
import Comment  from "@/components/common/Comment/Comment"
import { SubjectAllAPI } from "@/api/subjectAPI";

const { Text, Title } = Typography;

export type AllSubjectsDetailsPageProps = PageProps<{
  subjectId: string
}>

export default function AllSubjectsDetailsPage({
  searchParams: {
    subjectId
  }
}: AllSubjectsDetailsPageProps) {
  const { data: subject, isLoading } = useSWR<SubjectAll>(subjectId, SubjectAllAPI.getSubjectById);
  return (
    <Main title={'Thông tin học phần'}>
      <div className="flex">
        <div className="flex flex-col gap-8 w-3/4">
          <Overview subject={subject} />
          <Divider />
          <Documents subjectId={subjectId} />
          <Divider />
          <Comment pageId={1} pageType='S'/>
        </div>
        <Divider type="vertical" className="h-auto" />
        <div className="w-1/4 pl-5">
          <RelatedSubject subjectCode={subject?.code} />
        </div>
      </div>
    </Main>
  );
}
