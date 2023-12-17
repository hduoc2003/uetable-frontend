'use client';
import React from 'react'
import MySubjectsPage from './mysubjects/semester/page';
import CreditStatitstic from './statistic/credit/page';
import DashboardLoading from './loading';
import SignedInHomePage from '@/components/home/SignedInHomePage';
import Profile from './settings/profile/[studentId]/page';
import CreditColumn from './statistic/credit/page';

export default function HomePage() {
  // const authState = useSelector(authSelector);
  // if (!authState.signedIn)
  //   return (
  //     <NotSignedInHomePage/>
  //   )
  // return (
  //   <Profile/>
  //);
  return <CreditColumn/>
  // return <DashboardLoading/>
  //return <MySubjectsPage/>
};

