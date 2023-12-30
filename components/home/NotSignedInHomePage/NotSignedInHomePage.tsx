'use client';

import Image from "next/image";
import HomeImage from '../../../public/images/hero-illo@3x.png';
import { Typography } from "antd";
import Schedule from "@/components/common/Schedule/Schedule";
import ScheduleIcon from "@/components/common/(Icons)/NavIcons/ScheduleIcon";
import MySubjectIcon from "@/components/common/(Icons)/NavIcons/MySubjectIcon";
import Main from "@/components/layouts/Main";
import PersonalColumn from "@/app/(dashboard)/statistic/personal/page";
const { Text, Title } = Typography;

const headerText = "";

export default function NotSignedInHomePage() {
  return (
    <Main className="flex flex-col gap-[50px]" title='Trang chủ'>
      <AboutScheduleAndMySubjects />

      <AboutAllSubjects />

      <AboutStats />
    </Main>
  );
}

function AboutScheduleAndMySubjects() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full">
        <div className="flex flex-col flex-1">
          <Title className={headerText}>
            <div className="whitespace-nowrap">Tạo thời khoá biểu</div>
            <div className="whitespace-nowrap">& Quản lý môn học</div>
          </Title>
          <Text type="secondary" className="mb-[20px] text-xl">Bắt đầu quá trình học tập của bạn</Text>
          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              <div className="mt-[2px]">{<ScheduleIcon />}</div>
              <div className="flex flex-col gap-3">
                <Title level={4} className="mb-0">Thời khoá biểu</Title>
                <Text className="text-base" type="secondary">Tạo và tuỳ chỉnh thời khoá biểu nhanh chóng</Text>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-[2px]">{<MySubjectIcon />}</div>
              <div className="flex flex-col gap-3">
                <Title level={4} className="mb-0">Môn học</Title>
                <Text className="text-base" type="secondary">Quản lý các học phần theo ngành học của bạn</Text>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Image src={HomeImage} alt="Dược" width={500} height={500} />
        </div>
      </div>
    </div>
  );
}

function AboutAllSubjects({ }) {
  return (<div>
    <Title>Khám phá các học phần</Title>


    <Text type="secondary" className="mb-[20px] text-xl">
      Nơi bạn có thể đánh giá và tìm tài liệu của các học phần
    </Text>
  </div>);
}
function AboutStats({ }) {
  return (
    <div>
      <Title>Dữ liệu thống kê</Title>
      <Text type="secondary" className="mb-[20px] text-xl">
        Xem dữ liệu được thống kê theo Ngành, Khoá và bản thân
      </Text>
      <div className="mt-8">
        <PersonalColumn fake />
      </div>
    </div>
  );
}
