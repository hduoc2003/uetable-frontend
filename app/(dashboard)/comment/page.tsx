'use client';

import Documents from "@/components/all-subjects/details/Documents";
import Overview from "@/components/all-subjects/details/Overview";
import RelatedSubject from "@/components/all-subjects/details/Related";
import TitleWithBox from "@/components/common/TitleWithBox";
import Main from "@/components/layouts/Main";
import { PageProps } from "@/types/PageProps";
import { SubjectAll } from "@/types/subject";
import { Divider, Typography } from "antd";
import useSWR from "swr";
import { CommentList } from "@/components/common/Comment/CommentList"
import { SubjectAllAPI } from "@/api/subjectAPI";

const { Text, Title } = Typography;

export type AllSubjectsDetailsPageProps = PageProps<{
  subjectId: string
}>

export default function AllSubjectsDetailsPage({
  searchParams: {
    subjectId
  }
}: AllSubjectsDetailsPageProps) {
  const { data: subject, isLoading } = useSWR<SubjectAll>(subjectId, SubjectAllAPI.getSubjectById);
  const comments = [
    {
      "Id": 317,
      "pageId": 1,
      "pageType": "S",
      "content": "Ừ Otaku tụi tao thế đấy rồi sao :))) trẻ trâu dell có quyền làm người đấy rồi sao :))) nói ra mấy cái câu chỉ trích người khác rằng họ họ là súc vật thì tụi mày cũng vậy thôi :))) không hiểu anime vì tụi mày chưa coi những bộ ý nghĩa nên tụi mày không biết lí do tụi tao thích :)) nói thiệt tuy cũng thích tự nhận là Otaku thế đấy nhưng tao dell nhận thằng này làm đồng loại nhé :)) dell phải cứ một thằng tự nhận là Otaku não bò thì cứ vơ cả những người khác cũng vậy :))) đâu phải đứa nào nghiện Anime cũng trẻ trâu họ xem đơn giản không phải để lấy cái danh đâu Anime cũng truyền tải nhiều thứ rất ý nghĩa :))) chúng mày nếu vẫn cứ ghét Otaku bọn tao thì tùy dell thích nói chuyện với lũ rảnh lz ngồi chê bai người khác :))))",
      "author": {
        "userId": 32,
        "studentId": "21020006",
        "name": "Bùi Tuấn Dũng",
        "avatar": "https://ui8-core.herokuapp.com/img/content/avatar-1.jpg"
      },
      "parent": 0,
      "preVersion": 0,
      "children": [
        318
      ],
      "usersLiked": 0,
      "usersDisLiked": 1,
      "timestamp": 1702472442000,
      "hasLiked": false,
      "hasDisLiked": true
    },
    {
      "Id": 318,
      "pageId": 1,
      "pageType": "S",
      "content": "Mấy thằng ranh con trong đây đừng có nghĩ tao hay đùa trên cái mạng ảo này mà nghĩ ngoà bộ anime và từ việc xem anime mỗi ngày tao ã giác ngộ được mọi triết lý trên đời và quyết tâm bảo vệ nền hòa bình thế giới. Vì lẽ đó nên tao đã tập tành như Saitama, mỗi ngày 1000 cái hít đất, 1000 cái gập bụng, 1000 cái bật nhảy và chạy 100km (gấp mười lần idol của tao). Và chưa đầy nửa năm tao đã luyện thành mình đồng da sắt, chỉ cần thằng nào đụng đến tao thì một cái búng tay cũng đủ để nó bay ra ngoài vũ trụ với vận tốc gấp 10 lần tốc độ ánh sáng. Nếu thằng nào trong này cả gan chửi tao thì nên biết tao là ai trước đi, đề phòng chết khi nào không hay đấy.",
      "author": {
        "userId": 13,
        "studentId": "21020051",
        "name": "Phạm Gia Việt Anh",
        "avatar": "https://ui8-core.herokuapp.com/img/content/avatar.jpg"
      },
      "parent": 317,
      "preVersion": 0,
      "children": [],
      "usersLiked": 0,
      "usersDisLiked": 0,
      "timestamp": 1702468795000,
      "hasLiked": false,
      "hasDisLiked": false
    },
    {
      "Id": 326,
      "pageId": 1,
      "pageType": "S",
      "content": "Hentai Police",
      "author": {
        "userId": 15,
        "studentId": "21020076",
        "name": "Hoàng Văn Huy",
        "avatar": "https://ui8-core.herokuapp.com/img/content/avatar-2.jpg"
      },
      "parent": 0,
      "preVersion": 0,
      "children": [],
      "usersLiked": 0,
      "usersDisLiked": 0,
      "timestamp": 1702648284000,
      "hasLiked": false,
      "hasDisLiked": false
    },
    {
      "Id": 327,
      "pageId": 1,
      "pageType": "S",
      "content": "DM",
      "author": {
        "userId": 16,
        "studentId": "21020059",
        "name": "Dược đẹp trai vcl",
        "avatar": "https://ui8-core.herokuapp.com/img/content/avatar-4.jpg"
      },
      "parent": 0,
      "preVersion": 0,
      "children": [],
      "usersLiked": 0,
      "usersDisLiked": 0,
      "timestamp": 1702650228000,
      "hasLiked": false,
      "hasDisLiked": false
    },
    {
      "Id": 328,
      "pageId": 1,
      "pageType": "S",
      "content": "Web loonf",
      "author": {
        "userId": 17,
        "studentId": "21020034",
        "name": "Hoàng Minh Thái",
        "avatar": "https://ui8-core.herokuapp.com/img/content/avatar-3.jpg"
      },
      "parent": 0,
      "preVersion": 0,
      "children": [],
      "usersLiked": 0,
      "usersDisLiked": 0,
      "timestamp": 1702650915000,
      "hasLiked": false,
      "hasDisLiked": false
    },
    {
      "Id": 329,
      "pageId": 1,
      "pageType": "S",
      "content": "kl;l;l;kl;\n\n\n\n\n",
      "author": {
        "userId": 32,
        "studentId": "21020006",
        "name": "Bùi Tuấn Dũng",
        "avatar": "https://ui8-core.herokuapp.com/img/content/avatar-1.jpg"
      },
      "parent": 0,
      "preVersion": 0,
      "children": [],
      "usersLiked": 0,
      "usersDisLiked": 0,
      "timestamp": 1702651504000,
      "hasLiked": false,
      "hasDisLiked": false
    },
    {
      "Id": 330,
      "pageId": 1,
      "pageType": "S",
      "content": "kl;l;l;kl;\n\n\n\n\n",
      "author": {
        "userId": 32,
        "studentId": "21020006",
        "name": "Bùi Tuấn Dũng",
        "avatar": "https://ui8-core.herokuapp.com/img/content/avatar-1.jpg"
      },
      "parent": 0,
      "preVersion": 0,
      "children": [],
      "usersLiked": 0,
      "usersDisLiked": 0,
      "timestamp": 1702651525000,
      "hasLiked": false,
      "hasDisLiked": false
    },
    {
      "Id": 331,
      "pageId": 1,
      "pageType": "S",
      "content": "kl;l;l;kl;",
      "author": {
        "userId": 17,
        "studentId": "21020034",
        "name": "Hoàng Minh Thái",
        "avatar": "https://ui8-core.herokuapp.com/img/content/avatar-3.jpg"
      },
      "parent": 0,
      "preVersion": 0,
      "children": [],
      "usersLiked": 0,
      "usersDisLiked": 0,
      "timestamp": 1702653060000,
      "hasLiked": false,
      "hasDisLiked": false
    }
  ]
  return (
    <Main title={'Thông tin học phần'}>
      <div className="flex">
        <div className="flex flex-col gap-8 w-3/4">
          <Overview subject={subject} />
          <Divider />
          <Documents subjectId={subjectId} />
          <Divider />
          <div className="flex flex-col">
            <TitleWithBox title={'Bình luận'} boxContent={4} size="middle" />
            <div style={{ marginTop: '40px', padding: '4px' }} >
              <CommentList comments={comments} />
            </div>
          </div>
        </div>
        <Divider type="vertical" className="h-auto" />
        <div className="w-1/4 pl-5">
          <RelatedSubject subjectId={subjectId} />
        </div>
      </div>
    </Main>
  );
}
