'use client';

import { LetterGrade, SubjectAll } from "@/types/subject";
import Preview from "./Preview";
import { Space, Typography } from "antd";
import { LetterGradeTag } from "@/components/mysubjects/SemesterInfoTable/SemesterInfoTable";
import HeartIcon from "../(Icons)/HeartIcon";
import InfoIcon from "../(Icons)/InfoIcon";
import { useEffect, useState } from "react";
import { AllSubjectsDetailsPageProps } from "@/app/(dashboard)/all-subjects/details/page";
import { SubjectAllAPI } from "@/api/subjectAPI";
import { isUndefined } from "lodash";
import { getLetterGrade } from "@/utils/subjects";

interface Props {
    subject?: SubjectAll;
    loading?: boolean;
    imgHeight?: number | string;
    onStar?: (star: boolean) => void
}

const { Text, Title } = Typography;

export default function SubjectPreview(props: Props) {
    const { subject, loading = false, onStar, imgHeight } = props;
    const [stared, setStared] = useState(subject?.stared)
    const grade: LetterGrade = getLetterGrade(subject);
    const params: AllSubjectsDetailsPageProps['searchParams'] = {
        subjectId: subject?.id ?? ''
    }

    return (
        <Preview
            imgHeight={imgHeight}
            imgSrc={subject?.imgLink}
            url="/all-subjects/details"
            params={params}
            star={
                <button onClick={(e) => { e.stopPropagation(); handleStar(); }}>
                    <HeartIcon solidOnHover solid={stared} />
                </button>
            }
            stared={stared}
            title={subject?.name ?? ''}
            info={
                <Space className="flex items-center text-royal-gray text-[14px]">
                    <InfoIcon color="currentcolor" />
                    <Text strong className="text-inherit text-fs-inherit">{`${subject?.like} lượt thích, ${subject?.documents} tài liệu`}</Text>
                </Space>
            }
            tag={
                <div className="sm:max-xl:hidden">
                    <LetterGradeTag
                        grade={grade}
                        className={`${grade === 'Chưa hoàn thành' ? 'p-2' : 'p-1'} rounded-md min-w-[45px] h-fit`}
                    />
                </div>
            }
            loading={loading}
        // {...props}
        />
    );

    function handleStar() {
        setStared(!stared);
        onStar?.(!stared)
        if (!isUndefined(subject?.id))
            SubjectAllAPI.starSubject(subject.id, !stared)
    }
}
