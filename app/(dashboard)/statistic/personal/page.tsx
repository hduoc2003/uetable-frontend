'use client'
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DecorBox from '@/components/common/DecorBox';
import Fetcher from '@/api/Fetcher';
import Main from '@/components/layouts/Main';
import TitleWithBox from '@/components/common/TitleWithBox';
import { Skeleton, Space } from 'antd';
import { isUndefined } from 'lodash';
import { mockPersonalStat } from '@/api/mocks/statistic';

interface stat {
  title: string,
  totalGPA4: number,
  credits: number,
}

export default function PersonalColumn({
  fake
}: {
  fake: boolean
}) {
  if (fake)
    return (
      <Content fake />
    )
  return (
    <Main title="Thống kê - Cá nhân">
      <Content fake={false}/>
    </Main>
  )
};

function Content({
  fake
}: {
  fake: boolean
}) {

  const [data, setData] = useState<stat[]>();

  useEffect(() => {
    if (fake)
      setData(mockPersonalStat)
    else {
      Fetcher.get<any, stat[]>("/statistic/getCreditAndGPAInAllSemesters")
        .then((response) => {
          console.log("response");
          console.log(response);
          setData(response);
        }).catch((error) => {
          console.log("Error while fetching data");
        })
    }
  }, [fake])

  return (
    <Space direction='vertical' size={'large'} className='w-full'>
      <TitleWithBox title='Tổng GPA qua từng học kỳ' />
      <Skeleton round active loading={isUndefined(data)} className='w-full'>
        <LineChart
          width={1100}
          height={250}
          data={data}
          syncId="anyId"
          margin={{
            top: 40,
            left: 20,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalGPA4" name="GPA" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </Skeleton>


      <TitleWithBox title='Tín chỉ đăng ký từng học kỳ' />
      <Skeleton round active loading={isUndefined(data)} className='w-full'>
        <LineChart
          width={1100}
          height={250}
          data={data}
          syncId="anyId"
          margin={{
            top: 40,
            left: 20,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="credits" name="Tín chỉ" stroke="#82ca9d" fill="#82ca9d" />
        </LineChart>
      </Skeleton>
    </Space>
  )
}

