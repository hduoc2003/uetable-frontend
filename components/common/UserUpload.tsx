'use client';

import { PiUploadSimpleBold } from "react-icons/pi";
import MyButtonWrapper from "./(MyButton)/MyButtonWrapper";
import { useRef, useState } from "react";
import { AutoComplete, Divider, Form, Input, Modal, Popover, Select, Space, Typography } from "antd";
import TitleWithBox from "./TitleWithBox";
import { DocumentAPI } from "@/api/DocumentAPI";
import { UserUploadFile } from "@/types/document";
import { useForm } from "antd/es/form/Form";
import PlusIcon from "./(Icons)/PlusIcon";
import { SaveButton } from "./(MyButton)/SaveButton";
import UploadFileArea from "./UploadFile";
import { delay } from "@/utils/delay";
import { isUndefined } from "lodash";
import strNormalize from "@/utils/strNormalize";

interface UserUploadProps {
    subjectId: string,
    subjectName: string,
    categories: string[],
    onEndUpload?: () => void
}
const { Text } = Typography;

const formItemName = (key: keyof UserUploadFile) => key;

export default function UserUpload({
    subjectId,
    subjectName,
    categories,
    onEndUpload
}: UserUploadProps) {
    const [uploading, setUploading] = useState(false);
    return (
        <>
            <MyButtonWrapper
                className={" group-hover/document:opacity-100 transition-opacity duration-300"}
                onClick={() => setUploading(true)}
            >
                <PiUploadSimpleBold size={25} className='fill-royal-gray hover:fill-current' />
            </MyButtonWrapper>
            <UploadArea
                uploading={uploading}
                onCancel={() => setUploading(false)}
                subjectId={subjectId}
                subjectName={subjectName}
                categories={categories}
                onEndUpload={onEndUpload}
            />
        </>
    );
}

function UploadArea({
    subjectId,
    uploading,
    onCancel,
    subjectName,
    categories,
    onEndUpload
}: {
    uploading: boolean;
    onCancel: () => void
} & UserUploadProps) {
    return (
        <Modal
            title={<TitleWithBox title={'Tải tài liệu lên'} className="mb-5" />}
            open={uploading}
            onCancel={onCancel}
            width={600}
            destroyOnClose
            footer={[]}
            closeIcon={null}
        >
            <Divider />
            <FormUpload onCancel={onCancel} subjectId={subjectId} subjectName={subjectName} categories={categories} onEndUpload={onEndUpload}/>
        </Modal>
    )

}

function FormUpload({
    onCancel,
    subjectId,
    subjectName,
    categories,
    onEndUpload
}: {
    onCancel: () => void
} & UserUploadProps) {
    const [form] = useForm();
    const category = useRef<string>('')
    return (
        <>
            <Form
                onFinish={handleSubmit}
                labelCol={{ span: 4 }}
                form={form}
                initialValues={{
                    [`${formItemName('subjectId')}`]: subjectName || 'vcl'
                }}
            // wrapperCol={{ span: 15 }}
            >
                <Form.Item name={formItemName('subjectId')} label={<Text strong>Học phần</Text>}>
                    <Input disabled />
                </Form.Item>
                {/* <Form.Item label={
                    <Text>
                        <strong>Thẻ</strong>
                    </Text>
                } rules={[{ required: true }]}>
                    <Space align="start">
                        <Form.Item
                            name={formItemName('category')}
                            rules={[{ required: true, message: 'Bạn chưa chọn thẻ tài liệu' }]}
                        >
                            <Select
                                placeholder={'Chọn thẻ tài liệu'}
                                options={[{
                                    value: 'haha',
                                    label: 'haha'
                                }]}
                                className="!w-[200px]"
                            />
                        </Form.Item>

                        <Popover
                            content={<Input placeholder="Nhập tên nhóm mới" autoFocus />}
                            trigger={['click']}
                        >
                            <MyButtonWrapper rounded>
                                <PlusIcon solidOnHover />
                            </MyButtonWrapper>
                        </Popover>
                    </Space>
                </Form.Item>
                            */}

                <Form.Item
                    label={
                        <Text>
                            <strong>Thẻ</strong>
                        </Text>
                    }
                    rules={[{ required: true, message: 'Thẻ không được rỗng' }]}
                    trigger='onSelect'
                >
                    <AutoComplete
                        placeholder='Chọn thẻ'
                        onChange={(newCa) => category.current = newCa}
                        options={categories.map((category) => ({value: category}))}
                        popupMatchSelectWidth={false}
                        filterOption={(inputValue, option) => {
                            if (isUndefined(option))
                                return true;
                            return strNormalize(option.value).includes(strNormalize(inputValue))
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={formItemName('files')}
                    rules={[{ required: true, message: 'Vui lòng chọn ít nhất một tệp' }]}
                    label={<strong>Tệp</strong>}
                    getValueFromEvent={(e) => e?.fileList}
                >
                    <UploadFileArea />
                </Form.Item>
                {/* <Form.Item label={<strong>Mô tả</strong>} name={formItemName('description')}>
                    <Input.TextArea placeholder="Nhập mô tả" showCount maxLength={500} autoSize={{ minRows: 4 }}>
                    </Input.TextArea>
                </Form.Item> */}
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <SaveButton onClick={async () => { form.submit(); await delay(1500); }} >
                        Lưu lại
                    </SaveButton>
                </Form.Item>
            </Form>

        </>
    )

    async function handleSubmit(data: UserUploadFile) {
        form.setFieldValue(formItemName('subjectId'), subjectId)
        data.subjectId = subjectId
        data.category = category.current
        console.log(data)
        await DocumentAPI.userUploadFiles(data);
        onEndUpload?.();
        onCancel();
    }
}
