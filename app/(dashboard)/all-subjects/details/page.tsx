'use client';

import { SubjectAllAPI } from "@/api/subjectAPI";
// import { CommentType } from "@/types/comment";
import Documents from "@/components/all-subjects/details/Documents";
import Overview from "@/components/all-subjects/details/Overview";
import RelatedSubject from "@/components/all-subjects/details/Related";
// import CommentInfo from "@/components/common/Comment/CommentInfo";
import Main from "@/components/layouts/Main";
import { PageProps } from "@/types/PageProps";
import { Divider, Typography } from "antd";
import useSWR from "swr";
import Comment  from "@/components/common/Comment/Comment"
import genId from "@/utils/genId";
import { useSearchParams } from "next/navigation";

const { Text, Title } = Typography;
const fetchKey = genId()

export type AllSubjectsDetailsPageProps = PageProps<{
  subjectId: string
}>

export default function AllSubjectsDetailsPage() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId') || '';
  console.log({subjectId})
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
          <RelatedSubject subjectCode={subject?.code} />
        </div>
      </div>
    </Main>
  );
}
