'use client';

import { SubjectAllAPI } from "@/api/subjectAPI";
import HeartIcon from "@/components/common/(Icons)/HeartIcon";
import IconWrapper from "@/components/common/(Icons)/IconWrapper";
import DecorBox from "@/components/common/DecorBox";
import PreviewList from "@/components/common/Preview/PreviewList";
import SubjectPreview from "@/components/common/Preview/SubjectPreview";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Main from "@/components/layouts/Main";
import { SubjectAll } from "@/types/subject";
import genId from "@/utils/genId";
import search from "@/utils/search";
import { Col, Row, Select, Skeleton, Space } from "antd";
import { isUndefined } from "lodash";
import { Key, ReactNode, useEffect, useState } from "react";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";

type SortType = Parameters<typeof SubjectAllAPI.getSomeSubjects>[0];

const sortOptions: { value: SortType; label: React.ReactNode }[] = [{
    value: 'last-access',
    label: <strong>Gần đây nhất</strong>
}, {
    value: 'rating',
    label: <strong>Quan tâm nhất</strong>
}, {
    value: 'stared',
    label: <strong>Đã yêu thích</strong>
}]

export default function AllSubjectsPage() {

    const [sortBy, setSortBy] = useState<SortType>('last-access');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = useDebouncedCallback((value: string) => {
        setSearchValue(value);
    }, 300);

    return (
        <Main title='Môn học toàn trường'>
            <div className="flex flex-col gap-10">
                <div className="flex gap-4 items-center h-max relative flex-wrap" >
                    <DecorBox />
                    <span className="font-semibold text-2xl">Học phần</span>
                    <div className="flex-1">
                        <SearchBar
                            className="h-fit w-1/3 min-w-[300px]"
                            placeholder="Tìm kiếm học phần"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    {/* <div className="absolute right-0"> */}
                    <Select
                        value={sortBy}
                        className="w-[140px] h-[39px]"
                        options={sortOptions}
                        onChange={(option) => setSortBy(option)}
                    />
                    {/* </div> */}
                </div>
                <PreviewList<SubjectAll>
                    render={(subject) => {
                        return (
                            <SubjectPreview
                                subject={subject}
                            />
                        )
                    }}
                    dataKey={(subject) => subject.code}
                    fetchMore={async (from, to) => SubjectAllAPI.getSomeSubjects(sortBy, from, to, searchValue)}
                // filter={(data) => {
                //     return search(searchValue, data, ['id', 'name'])
                // }}
                // fetchMore={SubjectAPI.getAllSubject}
                />
            </div>
        </Main>
    );

    // function handleStaring(subjectId: string | undefined, star: boolean): void {
    //     setAllSubjects(allSubjects.map((subject) => {
    //         if (isUndefined(subject) || subject.id !== subjectId)
    //             return subject;
    //         return {
    //             ...subject,
    //             stared: star
    //         }
    //     }))
    // }
}
