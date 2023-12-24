import Main from '@/components/layouts/Main'
import React from 'react'
import './loading.css'
import { Spin } from 'antd'

export default function DashboardLoading() {
    return (
        <Main>
            <Spin fullscreen/>
            {/* <div>
                <div className="hduoc2003_boxesContainer">
                    <div className="hduoc2003_boxes">
                        <div className="hduoc2003_box">
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                        </div>
                        <div className="hduoc2003_box">
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                        </div>
                        <div className="hduoc2003_box">
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                        </div>
                        <div className="hduoc2003_box">
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                            <div className="hduoc2003_boxx"></div>
                        </div>
                    </div>
                </div>
                <span>haha</span>
            </div> */}
        </Main>
    )
}
