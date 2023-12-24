"use client";

import { DocumentAPI } from "@/api/DocumentAPI";
import Fetcher from "@/api/Fetcher";
import PlusIcon from "@/components/common/(Icons)/PlusIcon";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import { SaveButton } from "@/components/common/(MyButton)/SaveButton";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import TitleWithBox from "@/components/common/TitleWithBox";
import UploadFileArea from "@/components/common/UploadFile";
import { THEME } from "@/styles/theme";
import { UserUploadFile } from "@/types/document";
import { RegisteredSubject } from "@/types/subject";
import { delay } from "@/utils/delay";
import { Button, Divider, Form, Input, InputRef, Modal, Popover, Select, Space, Tooltip, Typography, UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRef, useState } from "react";
import { PiPlusCircleBold, PiUploadSimpleBold } from "react-icons/pi";
import { useDebouncedCallback } from "use-debounce";

const { Text } = Typography;

const formItemName = (key: keyof UserUploadFile) => key;

interface Props {
    onSearch: (value: string) => void;
    onGroup: (group: GroupType) => void;
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

export default function Taskbar({ onSearch, onGroup }: Props) {
    const [groupBy, setGroupBy] = useState<GroupType>("category");
    const [uploading, setUploading] = useState(false);
    const debouceSearch = useDebouncedCallback(onSearch, 300);
    // const inputRef = useRef<InputRef>(null);
    return (
        <div className="flex justify-center group/document items-center gap-4 h-max">
            <TitleWithBox title="Tài liệu" />
            <div className="flex-1" >
                <SearchBar
                    className="w-3/4 min-w-[100px] h-[40px]"
                    placeholder="Tìm kiếm tài liệu"
                    onChange={(e) => debouceSearch(e.target.value)}
                />
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
                onChange={(value) => {setGroupBy(value); onGroup(value); }}
                className="h-[35px]"
            />
            <UserUpload uploading={uploading} onCancel={() => setUploading(false)} />
        </div>
    );

}

function UserUpload({
    uploading,
    onCancel
}: {
    uploading: boolean;
    onCancel: () => void
}) {
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
            <FormUpload onCancel={onCancel}/>
        </Modal>
    )

}

function FormUpload({
    onCancel
}: {
    onCancel: () => void
}) {
    const [form] = useForm();
    return (
        <>
            <Form
                onFinish={handleSubmit}
                labelCol={{ span: 3 }}
                form={form}
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
                    getValueFromEvent={(e) => e?.fileList}
                >
                    <UploadFileArea />
                </Form.Item>
                <Form.Item label={<strong>Mô tả</strong>} name={formItemName('description')}>
                    <Input.TextArea placeholder="Nhập mô tả" showCount maxLength={500} autoSize={{ minRows: 4 }}>
                    </Input.TextArea>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 3 }}>
                    <SaveButton onClick={async () => { form.submit(); await delay(1000); }} onDoneAnimationEnd={onCancel}>
                        Lưu lại
                    </SaveButton>
                </Form.Item>
            </Form>

        </>
    )

    function handleSubmit(data: UserUploadFile) {
        DocumentAPI.userUploadFiles(data)
            .then(() => {

            })
    }
}
