import { THEME } from "@/styles/theme";
import { AiFillSchedule, AiOutlineMenu } from "react-icons/ai";
import { BsPersonRolodex } from "react-icons/bs";
import { ImStatsDots } from "react-icons/im";
import { IoHome } from "react-icons/io5";
import { MdTopic } from "react-icons/md";

const navIconSize = 22;
export interface NavsIconsProp {
    'expand-nav': React.JSX.Element;
    'home': React.JSX.Element;
    'schedule': React.JSX.Element;
    'my-subjects': React.JSX.Element;
    'all-subjects': React.JSX.Element;
    'stats': React.JSX.Element;
}
const navIconColor = THEME.PRIMARY_ICON_COLOR;
export const NavsIcons: NavsIconsProp = {
    'expand-nav': <AiOutlineMenu size={navIconSize} />,
    'home': <IoHome key={-1} size={navIconSize} color={navIconColor} />,
    'schedule': <AiFillSchedule key={0} size={navIconSize} color={navIconColor} />,
    'my-subjects': <BsPersonRolodex key={1} size={navIconSize} color={navIconColor} />,
    'all-subjects': <MdTopic key={2} size={navIconSize} color={navIconColor} />,
    'stats': <ImStatsDots key={3} size={navIconSize} color={navIconColor} />
};
