'use client';
import React from 'react'
import MySubjectsPage from './mysubjects/semester/page';
import CreditStatitstic from './statistic/credit/page';
import DashboardLoading from './loading';
import SignedInHomePage from '@/components/home/SignedInHomePage';
import Profile from './settings/profile/page';
import CreditColumn from './statistic/credit/page';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/auth/authSelector';
import NotSignedInHomePage from '@/components/home/NotSignedInHomePage/NotSignedInHomePage';

export default function HomePage() {
  const authState = useSelector(authSelector);
  if (!authState.signedIn)
    return (
      <NotSignedInHomePage />
    )
  return <SignedInHomePage />
 // return <DocumentsOfSubject />
};

