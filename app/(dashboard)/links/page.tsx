import Main from '@/components/layouts/Main'
import { FacebookFilled, HomeFilled, MailFilled, PhoneFilled } from '@ant-design/icons'
import React from 'react'

export default function LinksPage() {
  return (
    <Main title='Các liên kết'>
        <div className='text-2xl'>
          <div className='flex gap-5'>
            <FacebookFilled/>
            Facebook
          </div>
          <h1>
            <a href="https://www.facebook.com/UET.VNUH">https://www.facebook.com/UET.VNUH</a>
          </h1>
        </div>
        <div className='text-2xl'>
          <div className='flex gap-5'>
            <MailFilled/>
            Email
          </div>
          uet@vnu.edu.vn
        </div>
        <div className='text-2xl'>
          <div className='flex gap-5'>
            <PhoneFilled/>
            Điện thoại
          </div>
          <h1>024.37547.46</h1>
        </div>
        <div className='text-2xl'>
          <div className='flex gap-5'>
            <HomeFilled/>
            Địa chỉ
          </div>
          <h1>E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội</h1>
        </div>
    </Main>
  )
}
