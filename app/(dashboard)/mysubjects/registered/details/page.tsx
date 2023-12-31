'use client'
import { RegisteredSubjectAPI } from "@/api/subjectAPI";
import Main from "@/components/layouts/Main";
import Content from "@/components/mysubjects/registered/details/Content/Content";
import SubjectInfo from "@/components/mysubjects/registered/details/SubjectInfo";
import { PageProps } from "@/types/PageProps";
import genId from "@/utils/genId";
import { Divider } from "antd";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetchId = genId();

export type RegisteredSubjectDetailsPageProps = PageProps<{
    subjectId: string
}>

export default function RegisteredSubjectDetailsPage() {

    const searchParams = useSearchParams();
    const subjectId = searchParams.get('subjectId') || '';
    console.log({subjectId})
    const { data: subject, isLoading } = useSWR([fetchId, subjectId], ([_, subjectId]) => RegisteredSubjectAPI.getSubjectById(subjectId));
    // console.log(subject)
    return (
        <Main title='Môn học của tôi'>
            <div className="flex">
                <div className="w-3/4">
                    <Content subjectId={subjectId} subjectName={subject?.name ?? ''}/>
                </div>
                <Divider type="vertical" className="h-auto" />
                <SubjectInfo subject={subject} />
            </div>
        </Main>
    );
}
