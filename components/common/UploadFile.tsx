import type { UploadProps } from 'antd';
import { message, Typography, Upload } from 'antd';
import Image from 'next/image';
import UploadIcon from '@/public/images/icons/upload.png'
import { ENV } from '@/utils/constants';
import { RcFile } from 'antd/es/upload';

const { Dragger } = Upload;
const { Text, Paragraph } = Typography;

const defaultProps: UploadProps = {
    accept: process.env.ACCEPTABLE_FILE_EXTENSION,
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`Tệp ${info.file.name} tải lên thành công`);
        } else if (status === "error") {
            message.error(`Tệp ${info.file.name} tải lên thất bại`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload(file: RcFile) {
        const fileSize = file.size / 1024 / 1024;
        const acceptable = (fileSize <= 10);
        if (!acceptable) {
            message.error(`Dung lượng tệp lớn hơn ${process.env.ACCEPTABLE_FILE_SIZE}MB`);
        }
        return acceptable;
    }
};

export default function UploadFile(props: UploadProps) {
    return (
        <Dragger {...defaultProps} {...props}>
            <div className='p-4'>
                <Image src={UploadIcon} alt={'Tải tài liệu lên'} className='m-auto w-[50px] h-[50px]' />
                <Paragraph strong className='text-base'>Nhấn hoặc kéo thả để tải tài liệu</Paragraph>
                <Paragraph type='secondary' className='text-left'>
                    <Text strong type='danger'>* </Text>Lưu ý:
                    Dung lượng tệp không vượt quá <strong>{process.env.ACCEPTABLE_FILE_SIZE}MB</strong>. <br />
                    {/* - Đuôi mở rộng được chấp nhận: <strong>{process.env.ACCEPTABLE_FILE_EXTENSION}</strong>. */}
                </Paragraph>
            </div>
        </Dragger>
    )
}
