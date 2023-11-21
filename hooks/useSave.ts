import { useRef, useState } from "react";

interface UseSaveResult<DataType> {
    data: DataType
    setData: (newData: DataType) => void
    save: () => void
    discard: () => void
    editing: boolean
    startEditing: () => void
}

export default function useSave<DataType>(data: DataType): UseSaveResult<DataType> {
    const backupData = useRef<DataType>(data);
    const [currentData, setCurrentData] = useState<DataType>(data);
    const [editing, setEditing] = useState(false);
    return {
        data: currentData,
        setData: setCurrentData,
        save: () => {backupData.current = currentData; setEditing(false);},
        discard: () => {setCurrentData(backupData.current); setEditing(false);},
        editing: editing,
        startEditing: () => {setEditing(true)}
    }
}
