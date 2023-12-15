"use client";

import Fetcher from "@/api/Fetcher";
import PlusIcon from "@/components/common/(Icons)/PlusIcon";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import { SaveButton } from "@/components/common/(MyButton)/SaveButton";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import TitleWithBox from "@/components/common/TitleWithBox";
import UploadFile from "@/components/common/UploadFile";
import { THEME } from "@/styles/theme";
import { RegisteredSubject } from "@/types/subject";
import { Button, Divider, Form, Input, InputRef, Modal, Popover, Select, Space, Tooltip, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRef, useState } from "react";
import { PiPlusCircleBold, PiUploadSimpleBold } from "react-icons/pi";

const { Text } = Typography;

interface FormData {
    docGroup: string;
    files: unknown;
    description?: string;
}

const formItemName = (key: keyof FormData) => key;

interface Props {
    subject: RegisteredSubject | undefined;
}

type GroupType = "category" | "extension";

const groupOptions: { value: GroupType; label: React.ReactNode }[] = [
    {
        value: "category",
        label: <Text strong>Theo nhóm</Text>,
    },
    {
        value: "extension",
        label: <Text strong>Đuôi mở rộng</Text>,
    },
];

export default function Taskbar({ subject }: Props) {
    const [groupBy, setGroupBy] = useState<GroupType>("category");
    const [uploading, setUploading] = useState(false);
    // const [form] = useForm();
    // const inputRef = useRef<InputRef>(null);

    return (
        <div className="flex justify-center group/document items-center gap-4 h-max">
            <TitleWithBox title="Tài liệu" />
            <div className="flex-1" >
                <SearchBar className="w-3/4 min-w-[100px] h-[40px]" placeholder="Tìm kiếm tài liệu"/>
            </div>
            <MyButtonWrapper
                className={" group-hover/document:opacity-100 transition-opacity duration-300"}
                onClick={() => setUploading(true)}
            >
                <PiUploadSimpleBold size={25} className='fill-royal-gray hover:fill-current' />
            </MyButtonWrapper>
            <Select
                value={groupBy}
                options={groupOptions}
                onChange={(value) => setGroupBy(value)}
                className="h-[35px]"
            />
            <Modal
                title={<TitleWithBox title='Tải tài liệu lên' className="mb-5" />}
                open={uploading}
                onCancel={() => setUploading(false)}
                width={600}
                destroyOnClose
                footer={[]}
                closeIcon={null}
            >
                <Divider />
                <Form
                    onFinish={handleSubmit}
                    labelCol={{ span: 3 }}
                // wrapperCol={{ span: 15 }}
                >
                    <Form.Item label={
                        <Text>
                            <strong>Nhóm</strong>
                        </Text>
                    } rules={[{ required: true }]}>
                        <Space align="start">
                            <Form.Item
                                name={formItemName('docGroup')}
                                rules={[{ required: true, message: 'Bạn chưa chọn nhóm' }]}
                            >
                                <Select
                                    placeholder={'Chọn nhóm tài liệu'}
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
                                // onOpenChange={(open) => {
                                //     if (open)
                                //         inputRef.current?.input?.focus();
                                // }}
                            >
                                <MyButtonWrapper rounded>
                                    <PlusIcon solidOnHover />
                                </MyButtonWrapper>
                            </Popover>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        name={formItemName('files')}
                        rules={[{ required: true, message: 'Vui lòng chọn ít nhất một tệp' }]}
                        label={<strong>Tệp</strong>}
                    // getValueFromEvent={(e) => e?.fileList}
                    >
                        <UploadFile />
                    </Form.Item>
                    <Form.Item label={<strong>Mô tả</strong>} name={formItemName('description')}>
                        <Input.TextArea placeholder="Nhập mô tả" showCount maxLength={500} autoSize={{ minRows: 4 }}>
                        </Input.TextArea>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3 }}>
                        <SaveButton htmlType="submit">
                            Lưu lại
                        </SaveButton>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

    function handleSubmit(data: FormData) {
        console.log(data)
        // setUploading(false);
        // const form
        // Fetcher.post('/fff', data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
    }
}
