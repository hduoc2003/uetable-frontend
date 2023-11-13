import React from 'react'
import NotFoundImage from '@/public/images/404-Not-found.svg';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className='flex place-content-center bg-secondary w-screen h-screen'>
        <Image src={NotFoundImage} alt='404 Not Found'></Image>
    </div>
  )
}
