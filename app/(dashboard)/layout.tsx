import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import NavBar from '@/components/layouts/NavBar/NavBar'
import React from 'react'

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
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
