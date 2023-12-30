'use client';
import Fetcher from '@/api/Fetcher';
import { UserInfoResponse } from '@/api/userAPI';
// import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header/Header'
import AdminNavBar from '@/components/admin/navbar'
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
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogin = useCallback(() => {
        setLoading(true)
        Fetcher.get<any, UserInfoResponse>('/users/' + cookies.get('studentid'))
            .then((response) => {
                setLoading(false)
                dispatch(authActions.updateAuthState({
                    signedIn: true,
                    logging: false,
                    name: response.name,
                    studentId: cookies.get('studentid'),
                }));
                // Fetcher.get('http://127.0.0.1:8000/api/schedule/autoCreateEventClass')
                // .then((res) => console.log(res))
                // .catch((err) => console.log(err))
            }).catch((error) => {
                router.push('/');
                setLoading(false)
                dispatch(authActions.updateAuthState({
                    signedIn: false,
                    logging: false
                }));
                cookies.remove('authToken', {
                    path: '/'
                });
            });
    }, [dispatch, router])

    useEffect(() => {
        handleLogin()
    }, [handleLogin]);

    const pathName = usePathname();

    if (!accessibleRoute(pathName))
        router.replace('/signin')

    if (authState.logging || loading)
        return (<></>)
    return (
        <div className='flex'>
            <AdminNavBar />
            <div className='flex-1'>
                <Header />
                {children}
            </div>
        </div>
    )

}
