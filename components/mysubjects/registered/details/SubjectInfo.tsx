'use client';

import loading from "@/app/(dashboard)/loading";
import TitleWithBox from "@/components/common/TitleWithBox";
import { RegisteredSubject } from "@/types/subject";
import { List, Skeleton, Space, Typography } from "antd";
import _, { isUndefined } from "lodash";
import { LetterGradeTag } from "../../SemesterInfoTable/SemesterInfoTable";
import { getLetterGrade } from "@/utils/subjects";
import Image from "next/image";
const { Title, Text } = Typography;
import AngleDownIcon from "@/components/common/(Icons)/AngleDownIcon";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import { useState } from "react";
import Link from "next/link";
import { getURL } from "@/utils/navigation";
import { AllSubjectsDetailsPageProps } from "@/app/(dashboard)/all-subjects/details/page";

// type SubjectInfoKey = 'id' | 'credits' | 'gpa' | 'lecturers';
const subjectInfo = ['id', 'name', 'credits', 'letter-grade', 'lecturers', 'midterm', 'final-term', 'other-term', '10-score'] as
    ['id', 'name', 'credits', 'letter-grade', 'lecturers', 'midterm', 'final-term', 'other-term', '10-score'];
type SubjectInfoKey = typeof subjectInfo[number]

const labels: Record<SubjectInfoKey, string> = {
    'id': 'Mã học phần',
    name: "Tên môn học",
    credits: "Số tín chỉ",
    "letter-grade": "Điểm hệ chữ",
    lecturers: "Giảng viên chính",
    midterm: "Điểm giữa kì",
    "final-term": "Điểm cuối kì",
    'other-term': 'Điểm thành phần',
    "10-score": "Điểm tổng kết"
}

interface Props {
    subject: RegisteredSubject | undefined
}

export default function SubjectInfo({
    subject
}: Props) {
    const loading = isUndefined(subject);
    const [showMore, setShowMore] = useState(true);
    return (
        <Space direction="vertical" className="pl-5" size={'large'}>
            <TitleWithBox
                title={<Link href={getURL<AllSubjectsDetailsPageProps['searchParams']>("/all-subjects/details", {
                    subjectId: subject?.id ?? ''
                })}
            >
                Thông tin
            </Link>}/>
            <Skeleton round active loading={loading}>
                <List
                    dataSource={showMore ? _.slice(subjectInfo, 0, 5) : subjectInfo}
                    renderItem={(type) => <Info type={type} subject={subject} />}
                    rowKey={(data) => data}
                    itemLayout='vertical'
                    className='flex flex-col animate__animated animate__fadeIn'
                    loadMore={
                        <MyButtonWrapper className="border-2 px-2 self-center mt-3" onClick={() => setShowMore(!showMore)}>
                            <Space>
                                <Text strong>{showMore ? `Chi tiết` : 'Ẩn bớt'}</Text>
                                <AngleDownIcon
                                    className={`transform rotate-${showMore ? 0 : 180} transition-[rotate_300ms_ease_in_out] fill-current`}
                                />
                            </Space>
                        </MyButtonWrapper>
                    }
                />
            </Skeleton>
        </Space>
    );
}

function Info({
    type,
    subject
}: {
    type: SubjectInfoKey
} & Props) {
    return (
        <List.Item>
            <Text strong className="animate__animated animate__fadeIn">
                <span>{`${labels[type]}: `}</span>
                {
                    (() => {
                        switch (type) {
                            case 'id':
                            case 'name':
                            case 'credits':
                                return subject?.[type]
                            case 'letter-grade':
                                return (
                                    <div className="inline-block">
                                        <LetterGradeTag grade={getLetterGrade(subject)} className="min-w-[20px] py-[2px]" />
                                    </div>
                                )
                            case 'lecturers':
                                return subject?.lecturer
                            case 'midterm':
                                return subject?.score.midTerm?.score
                            case 'final-term':
                                return subject?.score.finalTerm?.score
                            case 'other-term':
                                return subject?.score.otherTerm?.score
                            case '10-score':
                                return subject?.score.final
                        }
                    })() ?? <NoData />
                }
            </Text>
        </List.Item>
    )
}

const NoData = () => <Text type='secondary' italic>Đang cập nhật</Text>
