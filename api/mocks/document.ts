import { DocumentClass, DocumentInfo, MySubectDocGroup } from "@/types/document";
import genId from "@/utils/genId";

export const mockDocumentInfo : DocumentInfo[] = [
  {
    name : "a Đề thi HK1 2020-2021.pdf",
    date : "2020-12-25",
    type : "PDF"
  },
  {
    name : "f Đề thi HK2 2020-2021.pdf",
    date : "2020-12-25",
    type : "PNG"
  },
  {
    name : "e Đề thi HK1 2021-2022.pdf",
    date : "2021-12-25",
    type : "PDF"
  },
  {
    name : "c Đề thi HK2 2021-2022.pdf",
    date : "2021-12-25",
    type : "PDF"
  },
  {
    name : "d Đề thi HK1 2022-2023.pdf",
    date : "2022-12-25",
    type : "PNG"
  },{
    name : "b Đề thi HK1 2023-2024.pdf",
    date : "2023-12-25",
    type : "PDF"
  }
]

export const mockDocumentClasses: DocumentClass[] = [
  {
    id: "1",
    name: "Cách lên KC Liên Minh Huyền Thoại cùng Master Yi",
    author: "Kujoh",
    like: "1.1M",
    comment: "100N",
    download: "2M",
    subject: "Legos",
    image:
      "https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png",
  },
  {
    id: "2",
    name: "Cách làm núi lửa cùng thầy giáo Yatogami",
    author: "Kujoh",
    like: "1B",
    comment: "500N",
    download: "1B",
    subject: "Núi lửa",
    image:
      "https://i.natgeofe.com/n/d673d779-20b3-482c-b497-52bb4ae22b51/01-reference-volcanoes-cb9bmt.jpg",
  },
  {
    id: "3",
    name: "Cách lên 1M sub cực kì dễ",
    author: "Kujoh",
    like: "1B",
    comment: "500N",
    download: "1B",
    subject: "Youtube",
    image:
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/y/youtube-switch/hero",
  },
];

export const mockMySubectDocGroups: MySubectDocGroup[] = [
  {
    category: "Đề thi học kì 1",
    files: [
      {
        name: "@@@@",
        ext: "PDF2",
        id: "1",
        link: "",
      },
      {
        name: "@@@@",
        ext: "PDF",
        id: "2",
        link: "",
      },
      {
        name: "@@@@",
        ext: "ZIP",
        id: "3",
        link: "",
      },
      {
        name: "@@@@",
        ext: "RAR",
        id: "4",
        link: "",
      },
      {
        name: "@@@@",
        ext: "DOCX",
        id: "5",
        link: "",
      },
    ],
  },
  {
    category: "Đề thi giữa kì",
    files: [
      {
        name: "đcm",
        ext: "DOCX",
        id: genId(),
        link: "",
      },
    ],
  },
];
