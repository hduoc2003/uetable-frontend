'use client'
import { SaveButton } from '@/components/common/(MyButton)/SaveButton'
import DecorBox from '@/components/common/DecorBox'
import { Divider, Form, Modal, Space, Typography } from 'antd'
import React, { useState } from 'react'
import DynamicRadioButtons from './DynamicRadioButtons'
import './report.css'
import TextArea from 'antd/es/input/TextArea'
import Fetcher from '@/api/Fetcher';
import { ClipLoader } from 'react-spinners';

const { Title, Text } = Typography;

const options = [
    { label: 'Bạo lực', value: '1' },
    { label: 'Tự tử hoặc tự gây thương tích', value: '2' },
    { label: 'Thông tin sai sự thật', value: '3' },
    { label: 'Vấn đề khác', value: '4' },
  ];

interface FormValue {
    pageType: string
    pageId: string
    content: string
    type: number
}

export default function ReportForm({
    reportInfo,
    onSave,
    open,
    onCancel
}: {
    reportInfo?: any,
    onSave: (newCompletedSubject: any) => void,
    open: boolean,
    onCancel: () => void
}) {
    return (

        <Modal
            title={
                <div className='flex items-center'>
                    <Title level={3} className='flex-1 !mb-0'>
                        <Space size={'middle'}>
                            <DecorBox />
                            Báo cáo
                        </Space>
                    </Title>
                </div>
            }
            open={open}
            onCancel={onCancel}
            footer={[]}
            width={'fit-content'}
            closeIcon={false}
            destroyOnClose
        >
            <Content onSave={onSave} reportInfo={reportInfo} />
        </Modal>
    )
}

function Content({
    reportInfo,
    onSave,
}: {
    reportInfo?: any,
    onSave: (newCompletedSubject: any) => void
}) {
    // const {currentId} = useSelector(selectRootSemester);
    const [form] = Form.useForm();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSending, setIsSending] = useState(-1);
    const handleOptionSelect = (e: any) => {
        setSelectedOption(e)
    }
    const handleSubmit = (value: FormValue) => {
        // console.log(value)
        setIsSending(0)
        onSave({
            type: value.type,
            content: value.content,
            pageType: reportInfo.pageType,
            pageId: reportInfo.pageId,
        })
    }

    return (
        <Form<FormValue>
            // key={1}
            form={form}
            name="subject"
            onFinish={handleSubmit}
            initialValues={{
                type: 1,
                content: "",
                pageType: reportInfo.pageType,
                pageId: reportInfo.pageId,
            }}
            className='flex flex-col'
        >
            <Divider className='border' style={{marginTop: '8px', marginBottom: '16px'}}/>

            {/* <p>Selected option: {selectedOption}</p> */}
            <Form.Item<FormValue> name={'type'}>
                <DynamicRadioButtons options={options} onSelect={handleOptionSelect} />
            </Form.Item>
            <Text strong style={{marginBottom: '8px', fontSize: '16px'}}> Nội dung báo cáo </Text>
            <Form.Item<FormValue>
                    name={'content'}
                    className='mb-0'
                >
                    <TextArea
                        // disabled={disable || allSemesterMode(currentId)}
                        size='large'
                        className='font-medium'
                        rows={4}
                        // htmlSize={(content + '').length}
                    />
            </Form.Item>
            <div className='flex flex-cols items-center mt-4'>
                {/* <div className='flex '> */}
                    <SaveButton style={{marginRight: "8px"}} className='self-end' onClick={form.submit}>
                        Gửi báo cáo
                    </SaveButton>
                {/* </div> */}
                <div className={isSending===0?"flex items-center": "hidden flex items-center"}>
                    <ClipLoader
                    color="#2A85FF"
                    size={24}
                    cssOverride={{
                        'borderWidth': '4px'
                    }}
                    />
                </div>
            </div>
        </Form>

    )
}
