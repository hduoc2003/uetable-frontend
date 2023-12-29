import AddIcon from "@/components/common/(Icons)/AddIcon";
import BinIcon from "@/components/common/(Icons)/BinIcon";
import ExclamationIcon from "@/components/common/(Icons)/ExclamationIcon";
import DangerButton from "@/components/common/(MyButton)/DangerButton";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import { SaveButton } from "@/components/common/(MyButton)/SaveButton";
import EditableText from "@/components/common/EditableText";
import { crudSemesterThunk } from "@/redux/semester/actions/crudSemester";
import { saveChangesThunk } from "@/redux/semester/actions/saveChanges";
import { selectRootSemester, selectSemesterById } from "@/redux/semester/semesterSelector";
import { semesterActions } from "@/redux/semester/semesterSlice";
import { RootState, useThunkDispatch } from "@/redux/store";
import { allSemesterMode } from "@/utils/semester";
import { Flex, Popconfirm, Popover } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TaskBar({
    onAddSubject,
}: {
    onAddSubject: () => void
}) {
    const dispatch = useDispatch();
    const thunkDispatch = useThunkDispatch();
    const { currentId, editing } = useSelector(selectRootSemester)
    const { semesterInfo } = useSelector((state: RootState) => selectSemesterById(state, currentId));
    const [delayEditing, setDelayEditing] = useState(editing);

    useEffect(() => {
        if (editing)
            setDelayEditing(true);
        else
            setTimeout(() => setDelayEditing(false), 1500);
    }, [editing])

    return (
        <div className='flex items-center gap-3 w-full h-fit'>
            <EditableText
                defaultValue={semesterInfo.title}
                normalText={<strong className='text-lg'>{semesterInfo.title}</strong>}
                onComplete={handleTitleChange}
                mode={allSemesterMode(currentId) ? 'editable' : 'normal'}
            // editing={editing}
            />
            {!allSemesterMode(currentId) &&
                <>
                    <MyButtonWrapper
                        rounded
                        onClick={onAddSubject}
                        className="group-hover/table:visible group-hover/table:opacity-100 transition-opacity duration-500 opacity-0"
                    >
                        <AddIcon solidOnHover size={24} />
                        {/* color="rgb(74 222 128)" */}
                    </MyButtonWrapper>
                    {/* <div className="group-hover/table:visible group-hover/table:opacity-100 transition-opacity duration-500 opacity-0">
                        <DeleteTable />
                    </div> */}
                    {delayEditing &&
                        <>
                            <DangerButton className="ml-auto" onClick={() => dispatch(semesterActions.discardChanges())}>
                                Huỷ
                            </DangerButton>
                            <SaveButton
                                onClick={handleSave}
                            // onDoneAnimationEnd={onSaveDone}
                            >
                                Lưu thay đổi
                            </SaveButton>
                        </>
                    }
                </>
            }
        </div>
    );

    async function handleSave() {
        await thunkDispatch(saveChangesThunk())
    }

    function handleTitleChange(newTitle: string) {
        dispatch(semesterActions.changeTitle(newTitle))
    }
}

function DeleteTable() {
    const [open, setOpen] = useState(false);
    const thunkDispatch = useThunkDispatch();
    const { currentId } = useSelector(selectRootSemester)

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
                            thunkDispatch(crudSemesterThunk({
                                'type': 'delete',
                                'semesterId': currentId
                            }))
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
