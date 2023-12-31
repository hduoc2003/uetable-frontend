"use client";
import React, { useMemo, useState } from "react";
import Main from "@/components/layouts/Main";
import { DocumentInfo } from "@/types/document";
import TitleWithBox from "@/components/common/TitleWithBox";
import { PageProps } from "@/types/PageProps";
import { ConfigProvider, Space, Table, Typography } from "antd";
import genId from "@/utils/genId";
import useSWR from "swr";
import { DocumentAPI } from "@/api/DocumentAPI";
import { SubjectAllAPI } from "@/api/subjectAPI";
import { ColumnType } from "antd/es/table";
import { CellContent } from "@/components/mysubjects/SemesterInfoTable/SemesterInfoTable";
import DocumentImage from "@/components/common/DocumentImage";
import { getExtOfFile } from "@/utils/getExtOfFile";
import Link from "next/link";
import { getURL } from "@/utils/navigation";
import DecorBox from "@/components/common/DecorBox";
import { lightenDarkenColor } from "@/utils/lightenDarkenColor";
import ClickableText from "@/components/common/ClickableText";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { useDebouncedCallback } from "use-debounce";
import search from "@/utils/search";
import UserUpload from "@/components/common/UserUpload";
import { isUndefined } from "lodash";
import { FaPlus } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";

export type AllSubjectsDocumentsPageProps = PageProps<{
    subjectId: string
}>

const { Text, Paragraph } = Typography;

type ColKey = 'order' | 'name' | 'createdAt' | 'author' | 'stat' | 'category'
const fetchKey = genId();
const fetchKey2 = genId();

export default function AllSubjectsDocumentsPage() {
    const searchParams = useSearchParams();
    const subjectId = searchParams.get('subjectId') || '';

    const { data: docs, isLoading: loadingDocs, mutate: mutateDocs } = useSWR([fetchKey, subjectId], ([_, subjectId]) => DocumentAPI.getAllDocumentsOfSubject(subjectId))
    const { data: subject, isLoading: loadingSubject } = useSWR([fetchKey2, subjectId], ([_, subjectId]) => SubjectAllAPI.getSubjectById(subjectId))
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = useDebouncedCallback((newSearchValue: string) => {
        setSearchValue(newSearchValue)
    }, 300);

    const filteredDoc = useMemo<typeof docs>((): typeof docs => {
        return docs ? search(searchValue, docs, ['name', 'category', 'userName', 'link']) : []
    }, [docs, searchValue])

    const cols = useMemo<ColumnType<DocumentInfo>[]>(() => {
        return [
            getOrderCol('order'),
            getNameCol('name'),
            getAuthorCol('author'),
            getStatCol('stat'),
            getCreatedAtCol('createdAt')
            // getCategoryCol('category')
        ]
    }, [])
    return (
        <Main title='Tài liệu môn học'>
            <Space direction='vertical' className="w-full" size={'large'}>
                <div className="flex gap-5 items-center sm:max-lg:flex-col sm:max-lg:items-start">
                    <TitleWithBox title={subject?.name} />
                    <div className="flex-1">
                        <SearchBar
                            placeholder="Tìm kiếm tài liệu"
                            className="h-[40px] w-[25vw]"
                            onChange={(e) => handleSearch(e.target.value)}

                        />
                    </div>
                    {
                        !isUndefined(subject) && !isUndefined(docs) &&
                        <UserUpload
                            subjectId={subjectId}
                            subjectName={subject.name}
                            categories={docs.map((doc) => doc.category)}
                            onEndUpload={() => mutateDocs()}
                        >
                            <div className="bg-primary hover:bg-dark-primary px-3 py-2 rounded-lg flex gap-2 items-center">
                                <FaPlus className={'fill-secondary'} size={'1.1em'} />
                                <Text strong className="text-secondary text-fs-inherit">Tải lên</Text>
                            </div>
                        </UserUpload>
                    }
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                rowHoverBg: lightenDarkenColor('gray', 80),
                                bodySortBg: lightenDarkenColor('gray', 80)
                            }
                        }
                    }}
                >
                    <Table
                        dataSource={filteredDoc}
                        loading={loadingDocs}
                        rowKey={(doc) => doc.id}
                        pagination={false}
                        columns={cols}
                        className="w-full"
                        onRow={() => ({
                            className: 'hover:bg-gray-200'
                        })}
                    />
                </ConfigProvider>
            </Space>
        </Main>
    )
}

function getOrderCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>STT</CellContent>,
        render(_, data, rowIdx) {
            return {
                children: <CellContent>{rowIdx + 1}</CellContent>
            }
        }
    }
}

function getNameCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Tên tệp</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <Link href={getURL('/all-subjects/documents/details', {
                        documentId: file.id
                    })}>
                        <ClickableText>
                            <Space className="pr-8 w-full max-w-[30vw]">
                                <div className="w-[40px]">
                                    <DocumentImage ext={getExtOfFile(file.link).ext} />
                                </div>
                                <p>
                                    <Text strong className="text-inherit">{getExtOfFile(file.link).ext.toLocaleUpperCase()}</Text> <br />
                                    <Text strong className="text-inherit">{file.name}</Text>
                                </p>
                            </Space>
                        </ClickableText>
                    </Link>
            }
        }
    }
}

function getAuthorCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Người đăng tải</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <CellContent>{file.userName}</CellContent>
            }
        }
    }
}

function getStatCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Thông tin</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <CellContent>{`${file.download} lượt tải, ${file.like} lượt thích`}</CellContent>
            }
        },
        sorter(a, b) {
            if (a.download !== b.download)
                return a.download - b.download;
            return a.like - b.like
        },
        showSorterTooltip: false
    }
}

function getCreatedAtCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Ngày đăng tải</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <CellContent>{file.createdAt.toLocaleString()}</CellContent>
            }
        },
        sorter(a, b) {
            return a.createdAt.getTime() - b.createdAt.getTime();
        },
        showSorterTooltip: false
    }
}

function getCategoryCol(key: ColKey): ColumnType<DocumentInfo> {
    return {
        key,
        title: <CellContent>Thẻ</CellContent>,
        render(_, file, rowIdx) {
            return {
                children:
                    <DecorBox className="w-fit">
                        <div className="max-w-[100px] px-3 py-1">
                            <Text ellipsis>{file.category}</Text>
                        </div>
                    </DecorBox>
            }
        }
    }
}
