'use client';
import NotSignedInHomePage from '@/components/home/NotSignedInHomePage/NotSignedInHomePage';
import SignedInHomePage from '@/components/home/SignedInHomePage';
import { authSelector } from '@/redux/auth/authSelector';
import React from 'react'
import { useSelector } from 'react-redux';

const HomePage: React.FC = () => {
  const authState = useSelector(authSelector);
  if (authState.signedIn)
    return (
      <NotSignedInHomePage/>
    )

  return (
    <SignedInHomePage/>
  );
};

export default HomePage;
