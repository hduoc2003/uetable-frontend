"use client";

import { RegisteredSubject } from "@/types/subject";
import { Collapse, List, Space, Tooltip, Typography } from "antd";
import ShareIcon from "@/components/common/(Icons)/ShareIcon";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import EyeIcon from "@/components/common/(Icons)/EyeIcon";
import BinIcon from "@/components/common/(Icons)/BinIcon";
import Taskbar from "../../Content/Document/Taskbar";

const { Text, Paragraph } = Typography;

interface Props {
  subject: RegisteredSubject | undefined;
}

interface DocGroup {
  title: string;
  files: {
    name: string;
    ext: string; id:
    React.Key
  }[]
}

const docs: DocGroup[] = [{
  title: 'Đề thi học kì 1',
  files: [{
    name: "@@@@",
    ext: "PDF2",
    id: 1
  }, {
    name: "@@@@",
    ext: "PDF",
    id: 2
  }, {
    name: "@@@@",
    ext: "ZIP",
    id: 3
  }, {
    name: "@@@@",
    ext: "RAR",
    id: 4
  }, {
    name: "@@@@",
    ext: "DOCX",
    id: 5
  }]
}, {
  title: 'Đề thi giữa kì',
  files: [{
    name: 'đcm',
    ext: 'DOCX',
    id: 1
  }]
}
]

export default function Documents({ subject }: Props) {
  return (
    <Space direction='vertical' className="w-full" size={'middle'}>
      <Taskbar subject={subject} />
      <Collapse
        items={docs.map((doc) => {
          return {
            key: doc.title,
            label: <Text strong className="text-lg">{doc.title}</Text>,
            children: <DocList docsInfo={doc.files} />
          }
        })}
        bordered={false}
        ghost
      // accordion
      />
    </Space>
  )
}

function DocList({
  docsInfo
}: {
  docsInfo: DocGroup['files']
}) {
  return (
    <List>
      {
        docsInfo.map((info) => (
          <List.Item key={info.id}>
            <DocInfo info={info} />
          </List.Item>
        ))
      }
    </List>
  )
}

function DocInfo({
  info: {
    ext,
    name,
    id
  }
}: {
  info: DocGroup['files'][number]
}) {
  const [imgSrc, setImgSrc] = useState(`/images/icons/${ext}.png`);
  return (
    <div className="flex gap-2 items-center w-full group/doc">
      <Image
        src={imgSrc}
        alt={ext}
        width={5000}
        height={5000}
        className="!w-[40px]"
        onError={(e) => setImgSrc('/images/icons/documents.png')}
      />
      <Link className=" flex-1 " href={'https://github.com/nodejs/node-v0.x-archive/archive/refs/tags/jenkins-accept-commit-temp2.zip'}>
        <Paragraph strong className="!mb-0 text-current text-xs">
          {ext} <br />
          {name}
        </Paragraph>
      </Link>
      <div className="flex gap-2">
        <MyButtonWrapper className="opacity-0 group-hover/doc:opacity-100 transition-opacity duration-300">
          <EyeIcon solidOnHover size={20} />
        </MyButtonWrapper>
        <Tooltip title='Đánh dấu tệp là công khai' trigger={['hover']}>
          <MyButtonWrapper>
            <ShareIcon solidOnHover />
          </MyButtonWrapper>
        </Tooltip>
        <MyButtonWrapper className=" opacity-0 group-hover/doc:opacity-100 transition-opacity duration-300">
          <BinIcon solidOnHover />
        </MyButtonWrapper>
      </div>
    </div>
  )
}
