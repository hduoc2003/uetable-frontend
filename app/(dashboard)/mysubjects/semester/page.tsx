'use client';

import { SemesterAPI } from "@/api/semesterAPI";
import AddIcon from "@/components/common/(Icons)/AddIcon";
import DecorBox from "@/components/common/DecorBox";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Main from "@/components/layouts/Main";
import SemesterInfoTable from '@/components/mysubjects/SemesterInfoTable/SemesterInfoTable';
import { crudSemesterThunk } from "@/redux/semester/actions/crudSemester";
import { selectAllSemester, selectRootSemester } from "@/redux/semester/semesterSelector";
import { semesterActions } from "@/redux/semester/semesterSlice";
import { store, useThunkDispatch } from "@/redux/store";
import { SemesterInfo } from "@/types/semester";
import { Select, Space, Typography } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";

export default function SemesterPage() {
  const {
    data: semesterData,
    isLoading: isFetchingInfo
  } = useSWR('semester info', SemesterAPI.getAllSemesterInfo);

  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const {pending, currentId} = useSelector(selectRootSemester)
  const [searchingSubject, setSearchingSubject] = useState('');

  const handleSearchSubject = useDebouncedCallback((subject: string) => {
    setSearchingSubject(subject)
  }, 300)

  useEffect(() => {
    if (semesterData) {
      dispatch(semesterActions.updateAllSemester(semesterData.semesterInfo))
      dispatch(semesterActions.updateRootSemester({
        totalGPA: semesterData.totalGPA
      }))
    }
  }, [semesterData, dispatch])

  return (
    <Main title='Quản lý môn học'>
      <div className="flex flex-col gap-5">
        <Something
          onSearchChange={handleSearchSubject}
        />
        <SemesterInfoTable
          key={currentId}
          loading={isFetchingInfo}
          searchingSubject={searchingSubject}
        />
      </div>
    </Main>
  );
}

function Something({
  onSearchChange
}: {
  onSearchChange: (input: string) => void
}) {

  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const {currentId} = useSelector(selectRootSemester);
  const allSemesterInfo = useSelector(selectAllSemester)

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
      <Select
        value={currentId}
        // defaultValue={currentId}
        className="h-full"
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
        onChange={handleChangeSemesterId}
      />
    </div>
  )


  function handleAddSemester() {
    thunkDispatch(crudSemesterThunk({
      'type': 'add'
    }))
  }

  function handleChangeSemesterId(newSelectedSemester: string) {
    console.log(newSelectedSemester)
    if (newSelectedSemester === 'add-semester')
      handleAddSemester();
    else
      dispatch(semesterActions.updateRootSemester({
        'currentId': newSelectedSemester
      }))
  }
}
