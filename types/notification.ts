import { Avatar } from 'antd';
import { UserHandleDTO } from './user';
export interface Noticlass {
    id : number
    content : string
    avatarContent : string
    avartarSize : number
    avatarBgr : string
    avatarminW : number
    avatarminH : number
    avatarImg : string
    time : Date
    dotClassname : string
}

export interface UserNoti {
    id: number;
    createdAt: Date;
    content: string;
    seen: boolean;
    link: string;
    reply: UserHandleDTO
}
