import { THEME } from "@/styles/theme";
import { SubjectClass } from "@/types/subject";
import { BiSolidGroup, BiSolidTimeFive } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { IoMdColorPalette } from "react-icons/io";
import { MdPlace, MdTopic } from "react-icons/md";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { LuTextQuote } from "react-icons/lu";



export const subjectPropsIconSize = '1em';
export const subjectPropsIconColor = THEME.PRIMARY_ICON_COLOR;
type SubjectPropIcon = Record<keyof Pick<SubjectClass, 'id' | 'group' | 'teacherName' | 'place' | 'numberOfStudents' | 'highlightColor' | 'description'> | 'time', React.JSX.Element>;

export const subjectPropIcons: SubjectPropIcon = {
    id: <MdTopic key={0} size={subjectPropsIconSize} color={subjectPropsIconColor} />,
    group: <BiSolidGroup key={1} size={subjectPropsIconSize} color={subjectPropsIconColor} />,
    teacherName: <PiChalkboardTeacherFill key={2} size={subjectPropsIconSize} color={subjectPropsIconColor} />,
    place: <MdPlace key={3} size={subjectPropsIconSize} color={subjectPropsIconColor} />,
    // name: undefined,
    numberOfStudents: <HiUserGroup key={4} size={subjectPropsIconSize} color={subjectPropsIconColor} />,
    time: <BiSolidTimeFive key={5} color={subjectPropsIconColor} size={subjectPropsIconSize} />,
    highlightColor: <IoMdColorPalette key={6} color={subjectPropsIconColor} sign={subjectPropsIconSize}/>,
    description: <LuTextQuote key={7} color={subjectPropsIconColor} sign={subjectPropsIconSize}/>
};
