'use client'
import { RegisteredSubjectAPI } from "@/api/subjectAPI";
import TitleWithBox from "@/components/common/TitleWithBox";
import Main from "@/components/layouts/Main";
import Content from "@/components/mysubjects/registered/details/Content/Content";
import Note from "@/components/mysubjects/registered/details/Content/Note/Note";
import SubjectInfo from "@/components/mysubjects/registered/details/SubjectInfo";
import { PageProps } from "@/types/PageProps";
import genId from "@/utils/genId";
import { Divider } from "antd";
import useSWR from "swr";

const fetchId = genId();

export type RegisteredSubjectDetailsPageProps = PageProps<{
    subjectId: string
}>

export default function RegisteredSubjectDetailsPage({
    searchParams: {
        subjectId
    }
}: RegisteredSubjectDetailsPageProps) {
    const {data: subject, isLoading} = useSWR([fetchId, subjectId], ([_, subjectId]) => RegisteredSubjectAPI.getSubjectById(subjectId));
    console.log(subject)
    return (
        <Main title='Môn học của tôi'>
            <div className="flex">
                <div className="w-3/4">
                    <Content subjectId={subjectId} />
                </div>
                <Divider type="vertical" className="h-auto" />
                <SubjectInfo subject={subject}/>
            </div>
        </Main>
    );
}
