'use client';
import React from 'react'
import MySubjectsPage from './mysubjects/semester/page';

export default function HomePage() {
  // const authState = useSelector(authSelector);
  // if (!authState.signedIn)
  //   return (
  //     <NotSignedInHomePage/>
  //   )
  // return (
  //   <SignedInHomePage/>
  // );
  return <MySubjectsPage />
  // return <DashboardLoading/>
};

