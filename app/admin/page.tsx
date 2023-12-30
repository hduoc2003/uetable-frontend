'use client';
import React from 'react'
import SignedInHomePage from '@/components/home/SignedInHomePage';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/auth/authSelector';
import NotSignedInHomePage from '@/components/home/NotSignedInHomePage/NotSignedInHomePage';
import Notifications from '@/components/layouts/Header/Notifications';
import SignIn from '@/components/admin/login'
import Home from '@/components/admin/index'

export default function HomePage() {
  // return <Notifications />
  const authState = useSelector(authSelector);
  console.log(authState)
  if (!authState.signedIn)
    return (
      <SignIn />
    )
  return <Home />
 // return <DocumentsOfSubject />
};