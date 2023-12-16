export interface CommentType {
    id: string;
    pageid: string;
    pagetype: string;
    content: string;
    parentid: string;
    userLiked: number;
    userDisliked: number;
    timestamp: Date;
    hasLiked: boolean;
    hasDisliked: boolean;
}