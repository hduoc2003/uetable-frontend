'use client';

import { DocumentAPI } from "@/api/DocumentAPI";
import { SearchAPI, SearchSubject } from "@/api/searchAPI";
import DocumentImage from "@/components/common/DocumentImage";
import Preview from "@/components/common/Preview/Preview";
import PreviewList from "@/components/common/Preview/PreviewList";
import TitleWithBox from "@/components/common/TitleWithBox";
import Main from "@/components/layouts/Main";
import { PageProps } from "@/types/PageProps";
import { DocumentClass } from "@/types/document";
import genId from "@/utils/genId";
import { getExtOfFile } from "@/utils/getExtOfFile";
import { getURL } from "@/utils/navigation";
import { Divider, List, Skeleton, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, Key, useState, useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const { Text } = Typography;

type SearchPageProps = PageProps<{ subjectName: string }>
const fetchKey = genId();

export default function SearchPage() {
    const searchParams = useSearchParams();
    const subjectName: string = searchParams.get('subjectName') ?? '';
    const [loadingDocs, setLoadingDocs] = useState(true);
    const [docs, setDocs] = useState<DocumentClass[]>([])
    const router = useRouter();
    const [reload, setReload] = useState(false);

    // const { data: subjects, isLoading: loadingSubject } = useSWR([fetchKey, subjectName], ([_, subjectName]) => SearchAPI.searchSubjects(subjectName))
    useEffect(() => {
        setReload(true);
        setLoadingDocs(true)
        setTimeout(() => setReload(false), 1000)
    }, [router, subjectName])
    return (
        <Main title={subjectName}>
            <div className="flex h-full gap-4">
                <div className="flex-[7] flex flex-col gap-5">
                    <TitleWithBox title='Môn học' />
                    {!reload &&
                        <PreviewList<SearchSubject>
                            render={(sub) => {
                                return (
                                    <Preview
                                        url={getURL('/all-subjects/details', {
                                            subjectId: sub.id
                                        })}
                                        title={sub.name}
                                        info={
                                            <Text type="secondary">{`${sub.code}, ${sub.credits} tín chỉ`}</Text>
                                        }
                                        imgHeight={150}
                                    />
                                )
                            }}
                            dataKey={(sub) => sub.id}
                            fetchMore={() => SearchAPI.searchSubjects(subjectName)}
                            howManyFetch={1}
                            fetchKey={subjectName}
                            onLoadMoreDone={async (data) => {
                                setLoadingDocs(true)
                                let g = await Promise.all(data.map(async (datum) => {
                                    let g = await DocumentAPI.getTopDocumentsOfSubject(datum.id, 5)
                                    return g.map(t => ({ ...t, subjectName: datum.name }))
                                }))
                                let t: DocumentClass[] = [];
                                for (const x of g)
                                    t.push(...x)
                                setDocs(t);
                                setLoadingDocs(false)
                            }}
                        />
                    }

                </div>
                <Divider type='vertical' className="h-auto" />
                <div className="flex flex-col flex-[3]">
                    <TitleWithBox title={'Tài liệu liên quan'} />
                    <Skeleton active round loading={loadingDocs} className="mt-5">
                        {docs.length > 0 ?
                            <List>
                                {
                                    docs.map((doc) => {
                                        return (
                                            <List.Item key={doc.id}>
                                                <Link
                                                    href={getURL('/all-subjects/documents/details', {
                                                        documentId: doc.id
                                                    })}
                                                >
                                                    <Space className="pr-8 w-full max-w-[30vw]">
                                                        <div className="w-[40px]">
                                                            <DocumentImage ext={getExtOfFile(doc.link).ext} />
                                                        </div>
                                                        <p>
                                                            <Text strong className="text-inherit">{doc.name}</Text> <br />
                                                            <Text strong type='secondary'>{`${doc.subjectName}`}</Text>
                                                        </p>
                                                    </Space>
                                                </Link>
                                            </List.Item>
                                        )
                                    })
                                }
                            </List>
                            :
                            <Text strong italic type='secondary' className="mt-5">Không có tài liệu</Text>
                        }
                    </Skeleton>
                </div>
            </div>
        </Main>
    );
}
