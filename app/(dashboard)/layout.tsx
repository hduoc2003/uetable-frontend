import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import NavBar from '@/components/layouts/NavBar'
import React from 'react'

export default function layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex'>
            <NavBar />
            <div className='w-full'>
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    )
}
