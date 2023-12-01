'use client';

import { fakeSemesterInfo } from "@/api/fakedata/fakeSemesterData";
import { SemesterAPI } from "@/api/semesterAPI";
import AddIcon from "@/components/common/(Icons)/AddIcon";
import DecorBox from "@/components/common/DecorBox";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Main from "@/components/layouts/Main";
import SemesterInfoTable from '@/components/mysubjects/SemesterInfoTable/SemesterInfoTable';
import { SemesterChangeLog, SemesterInfo } from "@/types/semester";
import { RegisteredSubject } from "@/types/subject";
import search from "@/utils/search";
import { getCombinedSemesterInfo } from "@/utils/semester";
import { Select, Space, Typography } from "antd";
import _ from "lodash";
import { useEffect, useMemo, useState, useTransition } from "react";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";

const { Text, Title } = Typography;

export default function SemesterPage() {
  const {
    data: _allSemesterInfo,
    isLoading: isFetchingInfo
  } = useSWR<SemesterInfo[]>('semester info', SemesterAPI.getAllSemesterInfo);
  const {
    data: totalGPA,
    isLoading: isFetchingTotalGPA,
    mutate: totalGPAMutate
  } = useSWR<number>('total GPA', SemesterAPI.getTotalGPA)

  const [allSemesterInfo, setAllSemesterInfo] = useState<SemesterInfo[]>([fakeSemesterInfo])
  const [currentSemesterId, setCurrentSemesterId] = useState<string>(allSemesterInfo[0].id);
  const [searchingSubject, setSearchingSubject] = useState('');

  const currentSemester = useMemo<SemesterInfo>(() => {
    if (currentSemesterId === 'all')
      return getCombinedSemesterInfo(allSemesterInfo, totalGPA ?? 0)
    const currentSemester = allSemesterInfo.find((info) => info.id === currentSemesterId);
    return currentSemester ?? allSemesterInfo[0];
  }, [allSemesterInfo, currentSemesterId, totalGPA]);

  const handleSearchSubject = useDebouncedCallback((subject: string) => {
    setSearchingSubject(subject)
  }, 300)

  useEffect(() => {
    if (_allSemesterInfo) {
      setAllSemesterInfo(_allSemesterInfo)
      setCurrentSemesterId(_allSemesterInfo[0].id)
    }
  }, [_allSemesterInfo])
  return (
    <Main title='Quản lý môn học'>
      <div className="flex flex-col gap-5">
        <Something
          allSemesterInfo={allSemesterInfo}
          onChange={handleChangeSemesterId}
          selectedSemester={currentSemesterId}
          onSearchChange={handleSearchSubject}
        />
        <SemesterInfoTable
          key={currentSemesterId + searchingSubject}
          semesterInfo={{
            ...currentSemester,
            subjects: search<RegisteredSubject>(searchingSubject, currentSemester?.subjects ?? [], ['id', 'name'])
          }}
          onUpdateSemester={handleUpdateSemester}
          onDeleteTable={handleDeleteSemester}
          semesterMode={currentSemesterId !== 'all'}
          loading={isFetchingInfo || isFetchingTotalGPA}
        />
      </div>
    </Main>
  );

  function handleChangeSemesterId(newSelectedSemester: string) {
    if (newSelectedSemester === 'add-semester')
      handleAddSemester();
    else
      setCurrentSemesterId(newSelectedSemester)
  }

  async function handleUpdateSemester(newSemesterInfo: SemesterInfo) {
    setAllSemesterInfo(allSemesterInfo.map((info) => {
      if (info.id !== currentSemesterId)
        return info;
      return newSemesterInfo
    }));
    await SemesterAPI.updateSemester(newSemesterInfo);
    totalGPAMutate();
  }

  function handleAddSemester() {
    SemesterAPI.addSemester()
      .then(({ semesterId }) => {
        setAllSemesterInfo([{
          id: semesterId,
          title: "Học kì",
          subjects: [],
          sumOfCredits: 0,
          semesterGPA: 0,
          yearGPA: 0
        }, ...allSemesterInfo])
        setCurrentSemesterId(semesterId)
      })
  }

  function handleDeleteSemester() {
    setAllSemesterInfo((allSemesterInfo) => {
      let res = allSemesterInfo.filter((info) => info.id !== currentSemesterId)
      setCurrentSemesterId(res[0].id);
      return res;
    });
  }
}

function Something({
  allSemesterInfo,
  onChange,
  selectedSemester,
  onSearchChange
}: {
  allSemesterInfo: SemesterInfo[]
  onChange: (selectedSemester: string) => void
  selectedSemester: string
  onSearchChange: (input: string) => void
}) {
  return (
    <div className="flex w-full gap-4 items-center relative h-[42px]">
      <DecorBox />
      <span className="font-semibold text-2xl">Học kì</span>
      <div className="flex-1">
        <SearchBar
          className="h-fit w-[35%]"
          placeholder="Tìm kiếm môn học"
          onChange={(e) => {
            onSearchChange(e.target.value)
          }}
        />
      </div>
      <SelectSemester />
    </div>
  )

  function SelectSemester() {
    return (
      <Select
        defaultValue={selectedSemester}
        className="w-[170px] h-full"
        options={
          [
            {
              value: 'all',
              label: <strong>{'Tất cả học kì'}</strong>
            },
            ...allSemesterInfo.map((info, idx) => ({
              value: info.id,
              label: <strong>{info.title}</strong>
            })),
            {
              value: 'add-semester',
              label:
                <Space>
                  <AddIcon />
                  <span>Tạo học kì mới</span>
                </Space>
            }
          ]
        }
        onChange={onChange}
      />
    )
  }
}

// function SubjectTable(props: ) {
//     return (
//       <SemesterInfoTable semesterInfo={semesterInfo} />
//     )
// }
