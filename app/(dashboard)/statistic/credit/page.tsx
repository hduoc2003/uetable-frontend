'use client'
import Fetcher from '@/api/Fetcher';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Main from '@/components/layouts/Main';
import { Select } from 'antd';
import DecorBox from '@/components/common/DecorBox';

interface Stat {
  type: string,
  value: number,
}

interface Info {
  id: number,
  title: string,
}

export default function CreditColumn() {
  const [data, setData] = useState<Stat[]>();

  const [allSemesterInfo, setAllSemesterInfo] = useState<Info[]>([]);
  const [allYearInfo, setAllYearInfo] = useState<Info[]>([]);

  const [currentSemesterId, setCurrentSemesterId] = useState<string>("");
  const [currentYearId, setCurrentYearId] = useState<string>("");


  useEffect(() => {
    const newSemesterData = [];
    for (let i = 29; i <= 41; i++) {
      if (i == 29) setCurrentSemesterId(i.toString());
      const newSemester = {
        id: i,
        title: "Học kỳ " + ((i - 29) % 3 + 1) + " năm học " + (2020 + Math.floor((i - 29) / 3)) + "-" + (2021 + Math.floor((i - 29) / 3)),
      }
      newSemesterData.push(newSemester);
    }
    setAllSemesterInfo(newSemesterData);

    const newYearData = [];
    for (let i = 18; i <= 25; i++) {
      if (i == 18) setCurrentYearId(i.toString());
      const newYear = {
        id: i,
        title: "QH-20" + i,
      }
      newYearData.push(newYear);
    }
    setAllYearInfo(newYearData);
  }, []);

  useEffect(() => {
    if (allSemesterInfo && allSemesterInfo.length > 0)
      setCurrentSemesterId(allSemesterInfo[0].id.toString());
    if (allYearInfo && allYearInfo.length > 0)
      setCurrentYearId(allYearInfo[0].id.toString());
  }, [allYearInfo, allSemesterInfo]);

  useEffect(() => {
    Fetcher.get<any, Stat[]>('/statistic/getCreditRangeInSemester', {
      params: {
        semesterId: currentSemesterId,
        year: currentYearId,
      }
    }).then((response) => {
      let newData = response;
      for (let i = 0; i < newData.length; i++)
        newData[i].type += " tín chỉ";
      setData(newData);
    }).catch((error) => {

    });
  }, [currentSemesterId, currentYearId]);

  return (
    <Main title="Thống kê - Tín chỉ">
      <div className='flex gap-10'>
        <div className="flex gap-5">
          <DecorBox />
          <SemesterFilter
            allSemesterInfo={allSemesterInfo}
            onChange={handleChangeSemesterId}
            selectedSemester={currentSemesterId}
          />
        </div>
        <div className="flex gap-5">
          <DecorBox />
          <YearFilter
            allYearInfo={allYearInfo}
            onChange={handleChangeYearId}
            selectedYear={currentYearId}
          />
        </div>
      </div>

      <BarChart
        width={1000}
        height={500}
        data={data}
        margin={{
          top: 40,
          left: 20
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" fontWeight={'bold'} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name='Sinh viên' fill="#8884d8" activeBar={{ fill: "#6863db" }} />
      </BarChart>
    </Main>
  );
  function handleChangeSemesterId(newSelectedSemester: string) {
    setCurrentSemesterId(newSelectedSemester);
  }

  function handleChangeYearId(newSelectedYear: string) {
    setCurrentYearId(newSelectedYear);
  }

  function SemesterFilter({
    allSemesterInfo,
    onChange,
    selectedSemester
  }: {
    allSemesterInfo: Info[]
    onChange: (selectedSemester: string) => void
    selectedSemester: string
  }) {
    return (
      <div className="flex w-full gap-4 items-center relative h-[42px]">
        <span className="font-semibold text-2xl">Học kì</span>
        <SelectSemester />
      </div>
    );
    function SelectSemester() {
      return (
        <Select
          value={selectedSemester}
          className="w-[300px] h-full"
          options={
            [
              ...allSemesterInfo.map((info, idx) => ({
                value: info.id,
                label: <strong>{info.title}</strong>
              }))
            ]
          }
          onChange={onChange}
        />
      )
    }
  }
  function YearFilter({
    allYearInfo,
    onChange,
    selectedYear
  }: {
    allYearInfo: Info[]
    onChange: (selectedYear: string) => void
    selectedYear: string
  }) {
    return (
      <div className="flex w-full gap-4 items-center relative h-[42px]">
        <span className="font-semibold text-2xl">Khóa học</span>
        <SelectYear />
      </div>
    );
    function SelectYear() {
      return (
        <Select
          value={selectedYear}
          className="w-[170px] h-full"
          options={
            [
              ...allYearInfo.map((info, idx) => ({
                value: info.id,
                label: <strong>{info.title}</strong>,
              }))
            ]
          }
          onChange={onChange}
        />
      )
    }
  }
};

