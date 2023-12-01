import AddIcon from "@/components/common/(Icons)/AddIcon";
import BinIcon from "@/components/common/(Icons)/BinIcon";
import ExclamationIcon from "@/components/common/(Icons)/ExclamationIcon";
import DangerButton from "@/components/common/(MyButton)/DangerButton";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import { SaveButton } from "@/components/common/(MyButton)/SaveButton";
import EditableText from "@/components/common/EditableText";
import { Flex, Popconfirm, Popover } from "antd";
import { useState } from "react";

export default function TaskBar({
    editing,
    title,
    handleTitleChange,
    startEditing,
    discardChange,
    onSave: save,
    onSaveDone,
    onAddSubject,
    onDeleteTable,
    semesterMode
}: {
    editing: boolean
    title: string
    handleTitleChange: (title: string) => void
    startEditing: () => void
    discardChange: () => void
    onSave: () => Promise<void>
    onSaveDone: () => void
    onAddSubject: () => void
    onDeleteTable: () => void
    semesterMode: boolean
}) {
    return (
        <div className='flex items-center gap-3 w-full h-fit'>
            <EditableText
                defaultValue={title}
                normalText={<strong className='text-lg'>{title}</strong>}
                onComplete={handleTitleChange}
                mode={semesterMode ? 'editable' : 'normal'}
            // editing={editing}
            />
            {semesterMode &&
                <>
                    <MyButtonWrapper
                        rounded
                        onClick={onAddSubject}
                        className="group-hover/table:visible group-hover/table:opacity-100 transition-opacity duration-500 opacity-0"
                    >
                        <AddIcon solidOnHover size={24} />
                        {/* color="rgb(74 222 128)" */}
                    </MyButtonWrapper>
                    <div className="group-hover/table:visible group-hover/table:opacity-100 transition-opacity duration-500 opacity-0">
                        <DeleteTable onDeleteTable={onDeleteTable} />
                    </div>
                    {editing &&
                        <>
                            <DangerButton className="ml-auto" onClick={discardChange}>
                                Huỷ
                            </DangerButton>
                            <SaveButton
                                onClick={save}
                                onDoneAnimationEnd={onSaveDone}
                            >
                                Lưu thay đổi
                            </SaveButton>
                        </>
                    }
                </>
            }
        </div>
    );
}

function DeleteTable({
    onDeleteTable
}: {
    onDeleteTable: () => void
}) {
    const [open, setOpen] = useState(false);
    const handleConfirm = () => {
        setOpen(false);
    }
    const handleCancel = () => {
        setOpen(false);
    }
    return (
        <Popover
            title={
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <ExclamationIcon size={'1em'} />
                        <span>Bạn có chắc chắc muốn xoá học kì ?</span>
                    </div>
                    <DangerButton
                        className="w-fit ml-auto"
                        onClick={() => {
                            setOpen(false);
                            onDeleteTable();
                        }}
                    >
                        Xoá
                    </DangerButton>
                </div>
            }
            trigger={'click'}
            open={open}
            onOpenChange={(change) => setOpen(change)}
        >
            <MyButtonWrapper rounded onClick={() => setOpen(true)}>
                <BinIcon solidOnHover size={24} />
            </MyButtonWrapper>
        </Popover>
    )
}
