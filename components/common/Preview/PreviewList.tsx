'use client';

import { SubjectAllAPI } from '@/api/subjectAPI';
import { SubjectAll } from '@/types/subject';
import genId from '@/utils/genId';
import { Col, Row, Skeleton, Spin, Typography } from 'antd'
import _, { isUndefined } from 'lodash';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import useSWR from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWRMutation from 'swr/mutation'


const {Text} = Typography;

interface Props<DataType> {
    render: (datum: DataType) => React.ReactNode;
    dataKey: (datum: DataType) => React.Key;
    fetchMore: (from: number, to: number) => Promise<DataType[]>;
    dataPerFetch?: number;
    filter?: (data: DataType[]) => DataType[]
    cols?: {
        xs?: number;
        md?: number;
        lg?: number;
        xxl?: number;
    },
    howManyFetch?: number
    fetchKey?: string
}

export default function PreviewList<DataType>({
    render,
    dataKey,
    fetchMore,
    filter,
    dataPerFetch = 6,
    cols,
    howManyFetch = 99999999,
    fetchKey
}: Props<DataType>) {
    const _cols: (typeof cols) = _.mapValues({ ...{ xs: 1, md: 2, lg: 3, xxl: 4 }, ...cols }, (x) => 24 / x);
    const [data, setData] = useState<(DataType)[]>([])
    const [fetchFrom, setFetchFrom] = useState<number>(1);
    const [stopFetching, setStopFetching] = useState(false);
    const { data: extraData } = useSWR(
        [fetchKey, fetchFrom, fetchFrom + dataPerFetch - 1],
        ([_, from, to]) => fetchMore(from, to)
    );
    // console.log(extraData)
    useEffect(() => {
        // if (fetchFrom )
        if (!isUndefined(extraData)) {
            // console.log(extraData.length)
            if (--howManyFetch === 0)
                setStopFetching(true)
            if (extraData.length > 0) {
                if (fetchFrom === 1)
                    setData(() => [])
                setData((data) =>  [...data, ...extraData])
            }
            else
                setStopFetching(true);
        }
        // return () => console.log('unmount')
    }, [extraData, howManyFetch])

    useEffect(() => {
        // console.log(fetchKey)
        // setData(() => []);
        setFetchFrom(() => 1)
        // trigger()
    }, [fetchKey])

    // useEffect(() => {
    //     trigger();
    // }, [fetchFrom, trigger])

    // console.log(data)

    return (
            <InfiniteScroll
                dataLength={data.length}
                hasMore={!stopFetching}
                loader={<Spin className='mt-5'/>}
                next={() => {setFetchFrom(fetchFrom + dataPerFetch)}}
                endMessage={<Text type='secondary' strong className='self-center mt-5 text-xl'>{`${data.length}/${data.length}`}</Text>}
                className='flex flex-col !overflow-visible'
            >
                <Row gutter={[25, 33]} className="flex-wrap">
                    {
                        (filter?.(data) ?? data).map((datum, i) => {
                            return (
                                <Col key={dataKey(datum)} {..._cols} className="animate__animated animate__fadeIn">
                                    {render(datum)}
                                </Col>
                            )
                        })
                    }
                </Row>
            </InfiniteScroll>
    )
}

