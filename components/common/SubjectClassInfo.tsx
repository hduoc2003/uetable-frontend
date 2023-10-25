'use client';

import { SubjectClass } from "@/types/subject";
import { ColorPicker, ColorPickerProps, Divider, Space, Typography } from 'antd';
import CopyButton from "./MyButton/Copy";
import { BiSolidTimeFive } from "react-icons/bi";
import { subjectPropIcons, subjectPropsIconColor, subjectPropsIconSize } from "./Icons/SubjectPropIcons";
import { twMerge } from "tailwind-merge";
import { THEME } from "@/styles/theme";
import SuccessIcon from "./Icons/SuccessIcon";
import MyButtonWrapper from "./MyButton/MyButtonWrapper";

const { Title, Text, Paragraph } = Typography;

export interface SubjectClassInfoProps {
  subjectClass: SubjectClass
  editable?: boolean
  onColorChange?: ColorPickerProps['onChange']
}

export default function SubjectClassInfo({
  subjectClass,
  onColorChange,
  editable = false
}: SubjectClassInfoProps) {

  return (
    <Space direction='vertical' className={`min-w-[300px]`}>
      <Title
        editable={editable ? true : undefined}
        copyable={{
          icon: [<CopyButton key={0}/>, <MyButtonWrapper key={1}><SuccessIcon/></MyButtonWrapper>],
          text: subjectClass.name,
          tooltips: ['Sao chép', subjectClass.name]
        }}
        className={`!text-xl !flex w-full p-4 rounded-t-md bg-blue-500`}
        style={{ backgroundColor: subjectClass.highlightColor }}
      >
        <span className="flex-1 mr-5">{subjectClass.name}</span>
      </Title>
      {/* <div className="px-4 w-full flex flex-row-reverse">
        <ColorPicker value={subjectClass.highlightColor}/>
      </div> */}
      <Space direction="vertical" className="w-full px-4" size={'small'}>
        <InfoBlock
          icon={subjectPropIcons.id}
          title='Mã lớp'
          content={
            <Text
              copyable={{
                icon: [<CopyButton key={0}/>, <MyButtonWrapper key={1}><SuccessIcon/></MyButtonWrapper>],
                text: subjectClass.id,
                tooltips: ['Sao chép', subjectClass.id]
              }}
              className="!flex flex-1 items-center"
              style={{
                fontSize: 'inherit'
              }}
            >
              <span className="flex-1">{subjectClass.id}</span>
            </Text>
          }
        />
        <InfoBlock icon={subjectPropIcons.group} title='Nhóm' content={subjectClass.group} />
        <InfoBlock icon={subjectPropIcons.teacherName} title='Giảng viên' content={subjectClass.teacherName} />
        <InfoBlock
          icon={subjectPropIcons.place}
          title='Giảng đường'
          content={
            <Text
              copyable={{
                icon: [<CopyButton key={0}/>,  <MyButtonWrapper key={1}><SuccessIcon/></MyButtonWrapper>],
                text: subjectClass.place,
                tooltips: ['Sao chép', subjectClass.place]
              }}
              className="!flex flex-1 items-center"
              style={{
                fontSize: 'inherit'
              }}
            >
              <span className="flex-1">{subjectClass.place}</span>
            </Text>
          }
        />
        <InfoBlock icon={subjectPropIcons.time} title='Thời gian' content={`${subjectClass.lessonStart + 6}h - ${subjectClass.lessonEnd + 7}h`} />
        <InfoBlock icon={subjectPropIcons.numberOfStudents} title='Sĩ số' content={subjectClass.numberOfStudents} />
        <InfoBlock
          icon={subjectPropIcons.highlightColor}
          title='Đổi màu'
          content={
            <ColorPicker
              value={subjectClass.highlightColor}
              trigger="hover"
              onChange={onColorChange}
            />
          }
        />
      </Space>
      <Divider className="border-table-border m-0"></Divider>
      <Space className="px-4 pb-4 flex items-center">
        {subjectPropIcons.description}
        <Text type="secondary" italic>{subjectClass.description || 'Không có mô tả'}</Text>
      </Space>
    </Space>
  );
}

function InfoBlock({
  icon,
  title,
  content,
  className,
}: {
  icon?: React.ReactNode
  title?: React.ReactNode
  content?: React.ReactNode
  className?: string
}) {
  return (
    <div className={twMerge('flex gap-2 items-center text-base w-full', className)}>
      {icon}
      <strong className="inline-block whitespace-nowrap">{title}: </strong>
      {content}
    </div>
  )
}
