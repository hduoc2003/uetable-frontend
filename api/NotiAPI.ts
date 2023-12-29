import { UserHandleDTO } from "@/types/user";
import Fetcher from "./Fetcher";
import { UserNoti } from "@/types/notification";
import { toast } from "react-toastify";
import { OkResponse } from "@/types/response";

interface NotiResponse {
  Id: number;
  CreatedAt: string;
  Content: string;
  author: UserHandleDTO ;
  Seen: number;
  Link: string;
}

export class NotiAPI {
  static async getAllNoti(): Promise<UserNoti[]> {
    try {
        // return [{
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 1,
        //     'link': 'val.Link',
        //     'seen': false,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }, {
        //     'content': 'faefawefawefajwekfjaw;elfkaewj;lfkjaw;elfkjaw;lẹak;ưefawefawef',
        //     'createdAt': new Date(),
        //     'id': 5,
        //     'link': 'val.Link',
        //     'seen': true,
        //     reply: {
        //         userId: 0,
        //         studentId: "",
        //         name: "",
        //         avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg"
        //     }
        // }].slice(0, 6)
        const res = await Fetcher.get<any, NotiResponse[]>('/notification/getNotification');
        return res.map((val): UserNoti => ({
            'content': val.Content,
            'createdAt': new Date(val.CreatedAt),
            'id': val.Id,
            'link': val.Link,
            'seen': val.Seen !== 0,
            'reply': val.author
        }))
    } catch (error) {
        console.log(error);
        toast.error('Tải thông báo thất bại')
        return []
    }
  }

  static async markAllAsRead(): Promise<OkResponse> {
    return await this.seenNoti(5, 'all')
  }

  static async seenNoti(notiId: number, seenType: 'single' | 'all'): Promise<OkResponse> {
    try {
        const res = await Fetcher.post<any, any>('/notification/seenNotification', {
            seenType,
            notiId
        });
        console.log(res);
        return {
            ok: true
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false
        }
    }
  }
}
