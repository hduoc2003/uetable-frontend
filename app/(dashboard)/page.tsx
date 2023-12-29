'use client';
import React from 'react'
import SignedInHomePage from '@/components/home/SignedInHomePage';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/auth/authSelector';
import NotSignedInHomePage from '@/components/home/NotSignedInHomePage/NotSignedInHomePage';
import Notifications from '@/components/layouts/Header/Notifications';

export default function HomePage() {
  // return <Notifications />
  const authState = useSelector(authSelector);
  if (!authState.signedIn)
    return (
      <NotSignedInHomePage />
    )
  return <SignedInHomePage />
};

