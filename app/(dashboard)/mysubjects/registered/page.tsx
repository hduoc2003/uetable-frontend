'use client';

import { RegisteredSubjectAPI } from "@/api/subjectAPI";
import Preview from "@/components/common/Preview/Preview";
import PreviewList from "@/components/common/Preview/PreviewList";
import SubjectPreview from "@/components/common/Preview/SubjectPreview";
import TitleWithBox from "@/components/common/TitleWithBox";
import Main from "@/components/layouts/Main";
import { RegisteredSubject } from "@/types/subject";
import { getURL } from "@/utils/navigation";
import { Divider, Select, Space, Typography } from "antd";
import { RegisteredSubjectDetailsPageProps } from "./details/page";
import { LetterGradeTag } from "@/components/mysubjects/SemesterInfoTable/SemesterInfoTable";
import { getFinalScore, getLetterGrade } from "@/utils/subjects";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import search from "@/utils/search";
import _ from "lodash";

const { Text } = Typography;
type SortType = 'time' | 'score'
const sortType: SortType[] = ['time', 'score']
const sortLabel: Record<SortType, string> = {
  'score': 'GPA',
  'time': 'Thời gian học'
}

export default function RegisteredSubjectPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortType>('time')
  const handleSearch = useDebouncedCallback((value) => {
    setSearchValue(value)
  }, 300)

  return (
    <Main title='Môn học của tôi'>
      <Space direction="vertical" size='large' className="w-full">
        <div className="flex gap-5 items-center sm:max-md:flex-col sm:max-md:items-start">
          <TitleWithBox title='Môn đã đăng ký' />
          <div className="flex-1">
            <SearchBar placeholder="Tìm kiếm môn học" onChange={(e) => handleSearch(e.target.value)} className="h-[40px] w-[25vw]" />
          </div>
          {/* <Select
            value={sortBy}
            options={sortType.map((type) => ({
              value: type,
              label: <strong>{sortLabel[type]}</strong>
            }))}
            onChange={(option) => setSortBy(option)}
            className='justify-self-end w-[140px]'
          /> */}
        </div>
        <PreviewList<RegisteredSubject>
          dataKey={(sub) => sub.id}
          render={(sub) => {
            return (
              <Preview
                url={getURL<RegisteredSubjectDetailsPageProps['searchParams']>("/mysubjects/registered/details", {
                  subjectId: sub.id
                })}
                title={sub.name}
                tag={<LetterGradeTag grade={getLetterGrade(sub)} className="rounded-md p-1" />}
                info={<Text strong type='secondary'>{`${sub.code}, ${sub.credits} tín chỉ`}</Text>}
              />
            )
          }}
          fetchMore={() => RegisteredSubjectAPI.getAllSubject()}
          howManyFetch={1}
          filter={(subjects) => {
            console.log(sortBy)
            let res = (search(searchValue, subjects, ['name', 'code']));
            switch (sortBy) {
              case 'score':
                res.sort((a, b) => getFinalScore(a) - getFinalScore(b));
                break;
              case 'time':
                break;
            }
            console.log(res)
            return res
          }}
        />
      </Space>
    </Main>
  );
}
