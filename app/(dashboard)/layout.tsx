'use client';
import Fetcher from '@/api/Fetcher';
import { UserInfoResponse } from '@/api/userAPI';
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header/Header'
import NavBar from '@/components/layouts/NavBar/NavBar'
import { AllRouteKey } from '@/components/layouts/NavBar/NavMenu';
import { authSelector } from '@/redux/auth/authSelector'
import { authActions } from '@/redux/auth/authSlice';
import { isUndefined } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie';

export const cookies = new Cookies()
const publicRoutes: AllRouteKey[] = ['', 'links'] // route mà có thể truy cập nếu chưa đăng nhập

export function accessibleRoute(pathName: string) {
    const pathKey = pathName.split('/').slice(1);
    if (isUndefined(cookies.get('authToken'))) {
        let check: boolean = false
        for (const subKey of pathKey)
            check = check || publicRoutes.includes(subKey as AllRouteKey)
        return check
    }
    return true;
}

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const authState = useSelector(authSelector);
    const pathName = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogin = useCallback((): void => {
        if (authState.signedIn)
            return
        Fetcher.get<any, UserInfoResponse>('/users/' + cookies.get('studentid'))
            .then((response) => {
                dispatch(authActions.updateAuthState({
                    signedIn: true,
                    logging: false,
                    name: response.name,
                    studentId: cookies.get('studentid'),
                }));
            }).catch((error) => {
                dispatch(authActions.updateAuthState({
                    signedIn: false,
                    logging: false
                }));
                cookies.remove('authToken', {
                    path: '/'
                });
                if (!accessibleRoute(pathName))
                    router.push('/');
            });
    }, [authState.signedIn, dispatch, pathName, router])

    useEffect(() => {
        handleLogin()
    }, [handleLogin]);

    // const pathName = usePathname();

    useEffect(() => {
        if (!accessibleRoute(pathName))
            router.replace('/signin')
    }, [pathName, router])

    if (authState.logging)
        return (<>fawe</>)
    return (
        <div className='flex'>
            <NavBar />
            <div className='flex-1'>
                <Header />
                {accessibleRoute(pathName) && children}
                <Footer />
            </div>
        </div>
    )

}
