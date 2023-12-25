'use client'
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DecorBox from '@/components/common/DecorBox';
import Fetcher from '@/api/Fetcher';
import Main from '@/components/layouts/Main';

interface stat {
  title: string,
  totalGPA4: number,
  credits: number,
}

export default function PersonalColumn() {

  const [data, setData] = useState<stat[]>();

  useEffect(() => {
    Fetcher.get<any, stat[]>("/statistic/getCreditAndGPAInAllSemesters")
      .then((response) => {
        console.log("response");
        console.log(response);
        setData(response);
      }).catch((error) => {
        console.log("Error while fetching data");
      })
  }, [])
  return (
    <Main title="Thống kê - Cá nhân">
      <div className='flex gap-5'>
        <DecorBox />
        <span className="font-semibold text-2xl">Tổng GPA qua từng học kỳ</span>
      </div>
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

      <div className='flex gap-5'>
        <DecorBox />
        <span className="font-semibold text-2xl">Tín chỉ đăng ký từng học kỳ</span>
      </div>
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
    </Main>
  )
};

