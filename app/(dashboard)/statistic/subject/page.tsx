import Fetcher from '@/api/Fetcher';
import SearchIcon from '@/components/common/(Icons)/SearchIcon';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import Main from '@/components/layouts/Main';
import React, { useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Subject {
    "Id": string,
    "A": number,
    "A+": number,
    "B": number,
    "B+": number,
    "C": number,
    "C+": number,
    "D": number,
    "D+": number,
    "F": number,
    "gpa4": number,
    "gpa10": number,
    "Name": string,
    "students": number,
}

interface Stat {
    type: string,
    value: number,
}

interface SubjectDetail {

}

export function SubjectColumn(){
  const [data, setData] = useState<Stat[]>();
  const [subjectName, setSubjectName] = useState("");
  const [searchResultList, setSearchResultList] = useState<Subject[]>([]);
  const [selectedSubjectName, setSelectedSubjectName] = useState("");
  const [gpa4, setgpa4] = useState(-1);
  const [gpa10, setgpa10] = useState(-1);

  async function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSubjectName(e.target.value);
    Fetcher.get<any, Subject[]>('/subject/getSubjectByName',{
        params: {
            "name": subjectName,
        }
    }).then((response : Subject[]) => {
        setSearchResultList(response.slice(0,10));
    }).catch((error) => {
        console.log(error);
    })
  }


  async function handleSubjectClicked(subjectId: string, Name: string) {
    Fetcher.get<any, Subject>('/statistic/getAverageGpaBySubject', {
        params: {
            "subjectId": subjectId,
        }
    }).then((response: Subject) => {
        setSelectedSubjectName(Name);
        let newData = [
            {
                type: 'A+',
                value: response['A+'],
            },
            {
                type: 'A',
                value: response['A'],
            },
            {
                type: 'B+',
                value: response['B+'],
            },
            {
                type: 'B',
                value: response['B'],
            },
            {
                type: 'C+',
                value: response['C+'],
            },
            {
                type: 'C',
                value: response['C'],
            },
            {
                type: 'D+',
                value: response['D+'],
            },
            {
                type: 'D',
                value: response['D'],
            },
            {
                type: 'F',
                value: response['F'],
            }
        ];
        setData(newData);
        setgpa4(response.gpa4);
        setgpa10(response.gpa10);
        console.log(response);
    }).catch((error) => {
        console.log(error)
    })
  }

  const renderLegend = (props) => {
    const { payload } = props;
  
    return (
      <ul>
        <div className='flex gap-[50px] justify-center'>
        {
          payload.map((entry, index) => (
            <div key={`item-${index}`} className='flex'>
              <div className='h-[20px] w-[25px] mr-2' style={{backgroundColor: entry.color}}></div>
              <li key={`item-${index}`} style={{color: entry.color}}>{entry.value}</li>
            </div>
          ))
        }
        </div>
      </ul>
    );
  }

  return (
    <Main title="Tìm kiếm môn học">
        <div className='flex-col gap-5'>
            <SearchBar placeholder='Tìm kiêm môn học' onChange={handleSearchChange} value={subjectName}/>
            {subjectName.length > 0 && searchResultList.length > 0 && (
                <div className='absolute rounded-2xl border w-[400px] flex-col pt-4 pb-2 mt-1 z-[2] bg-white'>
                    {searchResultList.map((subject, index) => {
                        return  (
                            <div key={index} className='flex p-1 gap-2 hover:bg-slate-200'>
                                <SearchIcon className='ml-1'/>
                                <div key={index} className='font-semibold w-full pr-2' onClick={() => {
                                    setSubjectName(subject.Name);
                                    handleSubjectClicked(subject.Id, subject.Name);
                                    setSearchResultList([]);
                                }}>{subject.Name}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        { selectedSubjectName != "" &&
        <BarChart
        width={1000}
        height={500}
        data={data}
        className='z-1'
        margin={{
        top: 40,
        left: 20
        }}
        >
        <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="type" fontWeight={'bold'}/>
            <YAxis />
            <Tooltip/>
            <Legend content={renderLegend}/>
            <Bar dataKey="value" name='Sinh viên' fill="#8884d8" activeBar={{fill: "#6863db"}}/>
        </BarChart>
        }
        { gpa4 != -1 && <h1>GPA trung bình hệ 4: {gpa4}</h1> }
        { gpa10 != -1 && <h1>GPA trung bình hệ 10: {gpa10}</h1> }
    </Main>
  );
};

