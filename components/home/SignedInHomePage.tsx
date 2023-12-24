'use client';

import { getSubjectClasses } from "@/api/subjectAPI";
import Schedule from "../common/Schedule/Schedule";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { THEME } from "@/styles/theme";
import MyCountDown from "../common/MyCountDown";
import { Button, Flex, Popover, Space } from "antd";
import { HiInformationCircle, HiSpeakerphone } from "react-icons/hi";
import { useEffect, useMemo, useState } from "react";
import { lessonToHour, nowToNextSubjectClass } from "@/utils/subjectClass";
import { useSelector } from "react-redux";
import { scheduleDataSelector } from "@/redux/schedule/scheduleSelector";
import Main from "../layouts/Main";

export default function SignedInHomePage() {
  return (
    <Main title='Trang chủ'>
      <Flex vertical gap='large'>
        <NextSubjectInfo />
        <Schedule onlyViewMode />
      </Flex>
    </Main>
  );
}

function NextSubjectInfo() {
  const { subjectClassData } = useSelector(scheduleDataSelector);
  const [{
    time: timeToNextSubject,
    subjectClass: nextSubjectClass
  }, setNextSubjectInfo] = useState(() => nowToNextSubjectClass(subjectClassData));

  useEffect(() => {
      setNextSubjectInfo(nowToNextSubjectClass(subjectClassData))
  }, [subjectClassData])


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
      {nextSubjectClass &&
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
      }
    </Popover>
  );
}
