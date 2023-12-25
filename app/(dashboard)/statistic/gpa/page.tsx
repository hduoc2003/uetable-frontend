import Fetcher from '@/api/Fetcher';
import { Select } from 'antd';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Main from '@/components/layouts/Main';
import DecorBox from '@/components/common/DecorBox';

interface Stat {
  type: string,
  value: number,
}

interface Info {
  id: number,
  title: string,
}

interface ResponseType {
  gpa4: number,
  gpa10: number,
  result: Stat[],
  students: number,
}

export function ScoreColumn() {
  const [data, setData] = useState<Stat[]>();
  const [allYearInfo, setAllYearInfo] = useState<Info[]>([]);
  const [currentYearId, setCurrentYearId] = useState<string>("");

  useEffect(() => {
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
    setCurrentYearId(allYearInfo[0].id.toString());
  }, [allYearInfo]);

  useEffect(() => {
    Fetcher.get<any, ResponseType>('/statistic/getAverageGpaBySchoolYear', {
      params: {
        schoolYear: currentYearId,
      }
    }).then((response) => {
      console.log(response);
      setData(response.result);
    }).catch((error) => {

    })
  }, [currentYearId]);

  return (
    <Main title="Thống kê GPA">
      <div className="flex gap-5">
        <DecorBox />
        <YearFilter
          allYearInfo={allYearInfo}
          onChange={handleChangeYearId}
          selectedYear={currentYearId}
        />
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
        <Bar dataKey="value" name="Sinh viên" fill="#8884d8" activeBar={{ fill: "#6863db" }} />
      </BarChart>
    </Main>
  );

  function handleChangeYearId(newSelectedYear: string) {
    setCurrentYearId(newSelectedYear);
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
          defaultValue={selectedYear}
          className="w-[170px] h-full"
          options={
            [
              ...allYearInfo.map((info, idx) => ({
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
};

