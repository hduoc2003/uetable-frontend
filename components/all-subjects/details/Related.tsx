'use client';

import { SubjectAllAPI } from "@/api/subjectAPI";
import { AllSubjectsDetailsPageProps } from "@/app/(dashboard)/all-subjects/details/page";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import Preview from "@/components/common/Preview/Preview";
import SubjectPreview from "@/components/common/Preview/SubjectPreview";
import TitleWithBox from "@/components/common/TitleWithBox";
import genId from "@/utils/genId";
import { getURL } from "@/utils/navigation";
import { List, Space, Typography } from "antd";
import _, { isUndefined } from "lodash";
import useSWR from "swr";
import { CiCirclePlus } from "react-icons/ci";
import { LuPlusCircle } from "react-icons/lu";
import Link from "next/link";

const { Text } = Typography;
const fetchKey = genId()
interface Props {
    subjectCode: string | undefined
}

export default function RelatedSubject({
    subjectCode
}: Props) {
    const { data: relatedSubjects, isLoading } = useSWR([fetchKey, subjectCode],
        ([_, subjectCode]) => {
            if (isUndefined(subjectCode))
                return;
            return SubjectAllAPI.getRelatedSubject(subjectCode, 6);
        })
    return (
        <Space size={'large'} direction="vertical" className="w-full">
            <TitleWithBox title={<Link href={"/all-subjects"}>Môn học liên quan</Link>} />
            <List
                dataSource={relatedSubjects ?? _.fill(Array(6), null)}
                renderItem={(subject) => {
                    return (
                        <div className="mb-5">
                            <Preview
                                imgSrc={subject?.imgLink}
                                url={getURL<AllSubjectsDetailsPageProps['searchParams']>("/all-subjects/details", { subjectId: subject?.id ?? '' })}
                                title={subject?.name ?? ''}
                                loading={isLoading || isUndefined(subjectCode)}
                                imgHeight={180}
                            />
                        </div>
                    )
                }}
                rowKey={(subject) => subject?.code ?? genId()}
            // grid={{gutter: 16, column: 1}}
            />
            <Link href={"/all-subjects"}>
                <MyButtonWrapper className="p-2 border-2 w-full rounded-lg text-lg">
                    <div className="flex items-center justify-center gap-3 w-full">
                        <Text strong className="text-fs-inherit hover:text-contrast">Xem thêm</Text>
                        {/* <LuPlusCircle size='1.2em' /> */}
                    </div>
                </MyButtonWrapper>
            </Link>
        </Space>
    );
}

