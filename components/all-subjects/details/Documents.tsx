'use client';

import TitleWithBox from "@/components/common/TitleWithBox";
import { getURL } from "@/utils/navigation";
import { Space, Typography } from "antd";
import Link from "next/link";
import Preview from "@/components/common/Preview/Preview";
import MultiCarousel from "@/components/common/MultiCarousel";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import useSWR from "swr";
import { DocumentAPI } from "@/api/DocumentAPI";
import { DocumentClass } from "@/types/document";
import genId from "@/utils/genId";
import { AllSubjectsDocumentsPageProps } from "@/app/(dashboard)/all-subjects/documents/page";
import { useElementRect } from "@/hooks/useElementRect";
import useResizeObserver from "use-resize-observer";

const { Text } = Typography;
const fetchKey = genId();
interface Props {
    subjectId: string
}

export default function Documents({
    subjectId
}: Props) {
    // const { ref, rect: { width } } = useElementRect<HTMLDivElement>();
    const { ref, width = 1 } = useResizeObserver<HTMLDivElement>();

    const { data: documents, isLoading } = useSWR([fetchKey, subjectId],
        ([_, subjectId]) => DocumentAPI.getTopDocumentsOfSubject(subjectId, 5)
    )

    return (
        // <Space direction="vertical" size={'large'} className="w-full" ref={ref}>
        <Space direction="vertical" size={'large'} className="w-full" ref={ref}>
            <TitleWithBox
                title={
                    <Link href={getURL<AllSubjectsDocumentsPageProps['searchParams']>("/all-subjects/documents", { subjectId })}>
                        Tài liệu nổi bật
                    </Link>
                }
                size='middle'
            />
            {
                documents && documents.length > 0 ?
                    <MultiCarousel width={width}>
                        {(documents ?? Array<null>(5).fill(null)).map((doc, i) => {
                            return (
                                <Preview
                                    key={doc?.id ?? i}
                                    imgHeight={130}
                                    // imgSrc={"https://images.hdqwalls.com/wallpapers/akali-lol-artwork-4k-xu.jpg"}
                                    url={getURL('/all-subjects/documents/details', {
                                        documentId: doc.id
                                    })}
                                    title={doc?.name ?? ''}
                                    info={
                                        <Text type='secondary' strong>{`${doc?.download} lượt tải, ${doc?.like} lượt thích`}</Text>
                                    }
                                    loading={isLoading}
                                />
                            )
                        })}
                        {
                            <Link href={''}>
                                <MyButtonWrapper className="w-full rounded-xl border-2 h-[130px] flex items-center justify-center gap-3">
                                    <Text className="text-xl font-semibold">Xem thêm</Text>
                                    {/* <AngleRightIcon /> */}
                                </MyButtonWrapper>
                            </Link>
                        }
                    </MultiCarousel>
                    :
                    <Text type="secondary" italic strong>Đang cập nhật tài liệu</Text>
            }
        </Space>
    );
}
