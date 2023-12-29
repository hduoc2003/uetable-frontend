'use client';
import Fetcher from '@/api/Fetcher';
import { UserInfoResponse } from '@/api/userAPI';
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header/Header'
import NavBar from '@/components/layouts/NavBar/NavBar'
import { authSelector } from '@/redux/auth/authSelector'
import { authActions } from '@/redux/auth/authSlice';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react'
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
    const handleLogin = useCallback(() => {
        Fetcher.get<any, UserInfoResponse>('/users/' + cookies.get('studentid'))
            .then((response) => {
                dispatch(authActions.updateAuthState({
                    signedIn: true,
                    logging: false,
                    name: response.name,
                    studentId: cookies.get('studentid'),
                }));
                console.log(response)
                // Fetcher.get('http://127.0.0.1:8000/api/schedule/autoCreateEventClass')
                // .then((res) => console.log(res))
                // .catch((err) => console.log(err))
            }).catch((error) => {
                router.push('/');
                dispatch(authActions.updateAuthState({
                    signedIn: false,
                    logging: false
                }));
            });
    }, [dispatch, router])

    useEffect(() => {
        handleLogin()
    }, [handleLogin]);

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
