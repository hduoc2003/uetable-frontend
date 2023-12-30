'use client';
import Image from 'next/image'
import { useState } from 'react';

export default function DocumentImage({
    ext
}: {
    ext: string
}) {
    const [imgSrc, setImgSrc] = useState(`/images/icons/${ext.toUpperCase()}.png`);
    return (
        <Image
            src={imgSrc}
            alt={ext}
            width={5000}
            height={5000}
            className="!w-[40px]"
            onError={(e) => setImgSrc('/images/icons/documents.png')}
        />
    );
}
