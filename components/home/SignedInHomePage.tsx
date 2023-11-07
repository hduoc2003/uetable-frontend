'use client';

import { getSubjectClasses } from "@/api/subject";
import Schedule from "../common/Schedule/Schedule";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { THEME } from "@/styles/theme";
import MyCountDown from "../common/MyCountDown";
import { Button, Popover, Space } from "antd";
import { HiInformationCircle, HiSpeakerphone } from "react-icons/hi";
import { useMemo, useState } from "react";
import { lessonToHour, nowToNextSubjectClass } from "@/utils/subjectClass";
import { useSelector } from "react-redux";
import { scheduleDataSelector } from "@/redux/schedule/scheduleSelector";

export default function SignedInHomePage() {
  return (
    <main className="flex flex-col gap-[50px]">
      <NextSubjectInfo />
      <Schedule />
    </main>
  );
}

function NextSubjectInfo() {
  const { subjectClassData } = useSelector(scheduleDataSelector);
  const [{
    time: timeToNextSubject,
    subjectClass: nextSubjectClass
  }, setNextSubjectInfo] = useState(() => nowToNextSubjectClass(subjectClassData));

  console.log(timeToNextSubject, nextSubjectClass.name)

  const [countdownKey, setCountdownKey] = useState(0);

  return (
    <Popover
      content={
        <MyCountDown
          duration={timeToNextSubject}
          key={countdownKey}
          onComplete={() => {
            setNextSubjectInfo(nowToNextSubjectClass(subjectClassData));
            setCountdownKey(countdownKey + 1);
          }}
        />
      }
      placement="right"
    >
      <Space className="text-xl border w-fit border-slate-200 rounded-lg p-2 bg-gray-200">
        <HiInformationCircle size={'1.3em'} color={THEME.PRIMARY_COLOR} />
        <p>
          Bạn sẽ có tiết học
          <strong className="font-semibold">{` ${nextSubjectClass?.name} `}</strong>
          vào lúc
          <strong className="font-semibold">
            {` ${lessonToHour(nextSubjectClass.lessonStart)}h-${lessonToHour(nextSubjectClass.lessonEnd) + 1}h
                Thứ ${nextSubjectClass.weekDay}`}
          </strong>
        </p>
      </Space>
    </Popover>
  );
}
