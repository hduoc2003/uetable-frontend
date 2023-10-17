import Image from 'next/image'
import React from 'react'
import UETLogo from '../../public/images/uet-logo.svg';
import { THEME } from '@/styles/theme';

export default function Footer() {
    return (
        <div>
            <div className='h-0.5 mb-5' style={{ backgroundColor: THEME.PRIMARY_COLOR }}></div>
            <div className="flex-row">
                <div className="flex items-center ml-4 mb-4">
                    <Image src={UETLogo} alt='uet-logo' />
                    <div className="flex-col ml-2">
                        <div className='font-semibold' style={{ color: THEME.PRIMARY_COLOR }}>
                            Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội
                        </div>
                        <div className='text-gray-400 text-xs'>Nhà E3, 144 Xuân Thuỷ, Cầu Giấy, Hà Nội</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
