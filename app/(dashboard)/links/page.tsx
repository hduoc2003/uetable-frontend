'use client';

import Main from '@/components/layouts/Main'
import React, { useState } from 'react'
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { List, Space, Typography } from 'antd';
import _ from 'lodash';
import Link from 'next/link';
import { Image } from 'antd';
import TitleWithBox from '@/components/common/TitleWithBox';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import { useDebouncedCallback } from 'use-debounce';
import strNormalize from '@/utils/strNormalize';

const { Text } = Typography;

const Links: Record<string, string> = {
  'https://idp.vnu.edu.vn/': 'Hệ thống thư điện tử',
  'https://eoffice.vnu.edu.vn/qlvb/login/': 'Hệ thống quản lý văn bản và điều hành',
  'https://daotao.vnu.edu.vn/dkmh/login.asp': 'Cổng thông tin đào tạo đại học',
  'https://courses.uet.vnu.edu.vn/': 'Website môn học',
  'http://112.137.129.115/tkb/listbylist.php': 'Tra cứu thời khoá biểu',
  'http://112.137.129.30/viewgrade/': 'Hệ thống tra cứu điểm',
  'https://daotaodaihoc.uet.vnu.edu.vn/congdaotao/module/dsthi/': 'Tra cứu danh sách thi',
  'https://daotaodaihoc.uet.vnu.edu.vn/qldt/': 'Tra cứu đăng ký môn học',
  'https://daotaodaihoc.uet.vnu.edu.vn/congdaotao/module/certificate/dsbang.php': 'Hệ thống tra cứu văn bằng, chứng chỉ',
  'https://daotaodaihoc.uet.vnu.edu.vn/congdaotao/module/totnghiep/dsbang.php': 'Tra cứu bằng tốt nghiệp',
  'https://daotaodaihoc.uet.vnu.edu.vn/congdaotao/module/sodethi/login.php': 'Sổ giao nhận đề thi, bài thi',
  'https://student.uet.vnu.edu.vn/': 'Dịch vụ hỗ trợ sinh viên',
  'https://daotaodaihoc.uet.vnu.edu.vn/nhapdiem/login.php': 'Hỗ trợ nhập điểm thi',
  'http://qa.uet.vnu.edu.vn/qa/home': 'Hệ thống hỏi đáp trực tuyến',
  'https://onlinecourses.uet.vnu.edu.vn/': 'Hệ thống học trực tuyến',
  'https://eprints.uet.vnu.edu.vn/eprints/': 'VNU-UET Repository'
}

function getLinkIdx(link: string): number {
  let res = 0;
  for (const l in Links) {
    ++res;
    if (link === l)
      return res;
  }
  return 0;
}

export default function LinksPage() {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = useDebouncedCallback((val: string) => {
    setSearchValue(val)
  }, 300)

  return (
    <Main title='Các liên kết'>
      <Space direction='vertical' size={'large'} className='w-full'>
        <div className="flex gap-5">
          <TitleWithBox title='Liên kết' />
          <SearchBar placeholder='Tìm kiếm liên kết' className='h-[40px] w-[25vw]'
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <List>
          {
            Object.entries(_.pickBy(Links, (label, link) => {
              return strNormalize(label).includes(strNormalize(searchValue))
            })).map(([link, label], idx) => {
              return (
                <List.Item key={link}>
                  <Space size={'large'}>
                    <Image src={`/images/links/${getLinkIdx(link)}.png`} width={120} alt={label} />
                    <Link href={link}>
                      <p>
                        <strong className='text-base'>{label}</strong> <br />
                        <Text type='secondary'>{link}</Text>
                      </p>
                    </Link>
                  </Space>
                </List.Item>
              )
            })
          }
        </List>
      </Space>
    </Main>
  )
}
