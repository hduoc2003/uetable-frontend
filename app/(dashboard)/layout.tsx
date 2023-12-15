'use client';
import Fetcher from '@/api/Fetcher';
import { UserInfoResponse } from '@/api/userAPI';
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import NavBar from '@/components/layouts/NavBar/NavBar'
import { authSelector } from '@/redux/auth/authSelector'
import { authActions } from '@/redux/auth/authSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie';

export const cookies = new Cookies()

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const authState = useSelector(authSelector);

    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        Fetcher.get<any, UserInfoResponse>('/users/' + cookies.get('studentid'))
            .then((response) => {
                dispatch(authActions.updateAuthState({
                    signedIn: true,
                    logging: false,
                    name: response.name,
                    username: cookies.get('studentid'),
                }));
                //console.log(response);
            }).catch((error) => {
                // router.push('/');
                dispatch(authActions.updateAuthState({
                    signedIn: false,
                    logging: false
                }));
            });
    }, [dispatch, router]);

    if (authState.logging)
        return (<></>)
    return (
        <div className='flex'>
            <NavBar />
            <div className='flex-1'>
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    )
}
