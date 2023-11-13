'use client';

import { SemesterAPI } from "@/api/semesterAPI";
import AddIcon from "@/components/common/(Icons)/AddIcon";
import DecorBox from "@/components/common/DecorBox";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Main from "@/components/layouts/Main";
import SemesterInfoTable from '@/components/mysubjects/SemesterInfoTable/SemesterInfoTable';
import { SemesterChangeLog, SemesterInfo } from "@/types/semester";
import { Select, Space, Typography } from "antd";
import _ from "lodash";
import { useMemo, useState } from "react";

const { Text, Title } = Typography;

export default function CompletedSubjectsPage() {
  const [allSemesterInfo, setAllSemesterInfo] = useState(() => {
    return SemesterAPI.getAllSemesterInfo();
  })
  const [currentSemesterId, setCurrentSemesterId] = useState(allSemesterInfo[0].id);

  const currentSemester = useMemo(() => {
    const currentSemester =  allSemesterInfo.find((info) => info.id === currentSemesterId);
    // console.log({currentSemester})
    return currentSemester;
  }, [allSemesterInfo, currentSemesterId]);

  const handleChangeSemesterId = (newSelectedSemester: string) => {
    setCurrentSemesterId(newSelectedSemester)
  }

  // console.log(allSemesterInfo)
  const handleUpdateSemester = (data: SemesterChangeLog) => {
    // console.log(data)
    setAllSemesterInfo(allSemesterInfo.map((info) => {
      if (info.id !== currentSemesterId)
        return info;
      info.title = data.title;
      info.subjects = info.subjects.filter((subject) => !data.deletedSubject.includes(subject.id));
      // info.subjects.push(...data.addedSubject)
      info.subjects = _.unionBy(data.updatedSubject, info.subjects, 'id');
      return info;
    }))
    SemesterAPI.updateSemester(currentSemesterId, data)
  }

  const handleDeleteSemester = () => {
    setAllSemesterInfo(allSemesterInfo.filter((info) => info.id !== currentSemesterId));
    setCurrentSemesterId(allSemesterInfo[0].id);
  }

  return (
    <Main title='Quản lý môn học'>
      <div className="flex flex-col gap-5">
        <Something
          allSemesterInfo={allSemesterInfo}
          onChange={handleChangeSemesterId}
          selectedSemester={currentSemesterId}
        />
        <SemesterInfoTable
          key={currentSemesterId}
          semesterInfo={currentSemester as SemesterInfo}
          onUpdateSemester={handleUpdateSemester}
          onDeleteTable={handleDeleteSemester}
          semesterMode={true}
        />
      </div>
    </Main>
  );
}

type ViewMode = 'semester' | 'all';
const viewModes: Record<ViewMode, string> = {
  'semester': 'Học kì',
  'all': 'Tất cả'
}

function Something({
  allSemesterInfo,
  onChange,
  selectedSemester
} : {
  allSemesterInfo: SemesterInfo[]
  onChange: (selectedSemester: string) => void
  selectedSemester: string
}) {
  return (
    <div className="flex w-full gap-4 items-center relative h-[42px]">
      <DecorBox />
      <span className="font-semibold text-2xl">Cá nhân</span>
      <div className="flex-1">
          <SearchBar className="h-fit w-[35%]" placeholder="Tìm kiếm môn học"/>
      </div>
      <SelectSemester/>
    </div>
  )

  function SelectSemester() {
    return (
      <Select
        defaultValue={selectedSemester}
        className="w-[170px] h-full"
        options={
          [...allSemesterInfo.map((info, idx) => ({
            value: info.id,
            label: <strong>{info.title}</strong>
          })),
          {
            value: 'add-semester',
            label:
            <Space>
              <AddIcon/>
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
