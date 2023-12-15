'use client';
import React from 'react'
import MySubjectsPage from './mysubjects/semester/page';
import { mockAllSemesterInfo } from '@/api/mocks/semester';
import { RootState, useThunkDispatch } from '@/redux/store';
import { semesterActions } from '@/redux/semester/semesterSlice';
import { crudSubjectThunk } from '@/redux/semester/actions/crudSubject';
import { useDispatch, useSelector } from 'react-redux';
import { selectRegisteredSubjectById } from '@/redux/semester/semesterSelector';
import Preview from '@/components/common/Preview/Preview';
import Favicon from '../../public/images/product-pic-1.jpg';
import StarIcon from '@/components/common/(Icons)/StarIcon';
import HeartIcon from '@/components/common/(Icons)/HeartIcon';
import IconWrapper from '@/components/common/(Icons)/IconWrapper';
import SubjectPreview from '@/components/common/Preview/SubjectPreview';
import { Col, Row } from 'antd';
import Main from '@/components/layouts/Main';
import AllSubjectsPage from './all-subjects/page';
import RegisteredSubjectPage from './mysubjects/registered/page';
import RegisteredSubjectDetailsPage from './mysubjects/registered/details/page';
import { authSelector } from '@/redux/auth/authSelector';
import NotSignedInHomePage from '@/components/home/NotSignedInHomePage/NotSignedInHomePage';
import SignedInHomePage from '@/components/home/SignedInHomePage';

export default function HomePage() {

  const authState = useSelector(authSelector);
  if (!authState.signedIn)
    return (
      <NotSignedInHomePage/>
    )
  return (
    <SignedInHomePage/>
  );
  return (
    <>
      {/* <MySubjectsPage/> */}
    {/* <AllSubjectsPage /> */}
    {/* <RegisteredSubjectPage/> */}
    {/* <RegisteredSubjectDetailsPage searchParams={{
        subjectId: 'duoc'
      }} /> */}
    </>
  )
  // return <DashboardLoading/>
};

