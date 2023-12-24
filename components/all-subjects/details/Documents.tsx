'use client';

import TitleWithBox from "@/components/common/TitleWithBox";
import { getURL } from "@/utils/navigation";
import { Space, Typography } from "antd";
import Link from "next/link";
import { SubjectDocumentsPageProps } from "../documents/page";
import Preview from "@/components/common/Preview/Preview";
import MultiCarousel from "@/components/common/MultiCarousel";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";

const { Text } = Typography;

interface Props {
    subjectId: string
}

export default function Documents({
    subjectId
}: Props) {
    // const { ref, rect: { width } } = useElementRect<HTMLDivElement>();
    return (
        // <Space direction="vertical" size={'large'} className="w-full" ref={ref}>
        <Space direction="vertical" size={'large'} className="w-full" >
            <TitleWithBox
                title={
                    <Link href={getURL<SubjectDocumentsPageProps['searchParams']>("/all-subjects/documents", { subjectId })}>
                        Tài liệu nổi bật
                    </Link>
                }
                size='middle'
            />
            <MultiCarousel width={'58vw'}>
                {Array(6).fill(null).map((_, i) => {
                    return (
                        <Preview key={i} imgHeight={130} imgSrc={"https://images.hdqwalls.com/wallpapers/akali-lol-artwork-4k-xu.jpg"} url={""} title={""} />
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
        </Space>
    );
}
