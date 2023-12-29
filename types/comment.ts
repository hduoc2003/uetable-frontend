import { UserHandleDTO } from './user';

export interface CommentInfoType {
    Id: string,
    pageId: number,
    pageType: string,
    content: string,
    author: UserHandleDTO,
    parent: number,
    preVersion: number,
    children: [],
    usersLiked: number,
    usersDisLiked: number,
    timestamp: number,
    hasLiked: boolean,
    hasDisLiked: boolean,
}