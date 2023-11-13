'use client';
import NotSignedInHomePage from '@/components/home/NotSignedInHomePage/NotSignedInHomePage';
import SignedInHomePage from '@/components/home/SignedInHomePage';
import { authSelector } from '@/redux/auth/authSelector';
import React from 'react'
import { useSelector } from 'react-redux';
import MySubjectsLayout from './mysubjects/layout';
import MySubjectsPage from './mysubjects/page';
import DashboardLoading from './loading';

export default function HomePage() {
  // const authState = useSelector(authSelector);
  // if (!authState.signedIn)
  //   return (
  //     <NotSignedInHomePage/>
  //   )
  // return (
  //   <SignedInHomePage/>
  // );
  return <MySubjectsPage/>
  // return <DashboardLoading/>
};

