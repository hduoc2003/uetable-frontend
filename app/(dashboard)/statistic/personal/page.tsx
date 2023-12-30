'use client'

import Main from "@/components/layouts/Main"
import PersonalStat from "@/components/statistic/personal/PersonalStat"

export default function PersonalColumn() {
  return (
    <Main title="Thống kê - Cá nhân">
      <PersonalStat fake={false}/>
    </Main>
  )
};



