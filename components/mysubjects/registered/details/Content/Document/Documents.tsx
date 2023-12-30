"use client";

import { Collapse, List, Skeleton, Space, Tooltip, Typography } from "antd";
import ShareIcon from "@/components/common/(Icons)/ShareIcon";
import MyButtonWrapper from "@/components/common/(MyButton)/MyButtonWrapper";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import EyeIcon from "@/components/common/(Icons)/EyeIcon";
import BinIcon from "@/components/common/(Icons)/BinIcon";
import Taskbar from "../../Content/Document/Taskbar";
import { MySubectDocGroup, MySubjectDocument } from "@/types/document";
import useSWR from "swr";
import { DocumentAPI } from "@/api/DocumentAPI";
import genId from "@/utils/genId";
import search from "@/utils/search";
import _, { isUndefined } from "lodash";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/auth/authSelector";
import DocumentImage from "@/components/common/DocumentImage";

const { Text, Paragraph } = Typography;

const fetchId = genId();
interface Props {
  subjectId: string
  subjectName: string
}

export default function Documents({ subjectId, subjectName }: Props) {
  const {studentId} = useSelector(authSelector)
  const { data: docGroups, isLoading, mutate } = useSWR([fetchId, subjectId, studentId], ([_, subjectId, studentId]) => {
    // console.log('refetch');
    return DocumentAPI.getMySubjectDocs(subjectId, studentId)
  });
  const [searchValue, setSearchValue] = useState('');
  const [group, setGroup] = useState<"category" | "extension">("category");
  const filteredDocs = useMemo<MySubectDocGroup[]>(() => {
    if (isUndefined(docGroups))
      return []
    let res: MySubectDocGroup[] = [];

    let groupsFiles: (MySubectDocGroup['files']) = []
    res = docGroups.map((singleGroup) => {
      let temp = search(searchValue, singleGroup.files, ['name', 'ext'])
      if (group === 'extension')
        groupsFiles.push(...temp)
      return {
        'category': singleGroup.category,
        'files': temp
      }
    })
    if (group === 'extension') {
      res = [];
      const l = _.groupBy(groupsFiles, 'ext');
      for (const ext in l)
        res.push({
          category: ext,
          files: l[ext]
        })
    }
    return res;
  }, [docGroups, group, searchValue])
  return (
    <Space direction='vertical' className="w-full" size={'middle'}>
      <Taskbar
        onSearch={handleSearch}
        onGroup={handleGroup}
        subjectId={subjectId}
        subjectName={subjectName}
        categories={docGroups?.map((group) => group.category) ?? []}
      />
      <Skeleton active round loading={isLoading}>
        {docGroups && docGroups.length > 0 ?
          <Collapse
            items={(filteredDocs).map((doc) => {
              return {
                key: doc.category,
                label: <Text strong className="text-lg">{doc.category}</Text>,
                children: <DocList docsInfo={doc.files} onDeleteDoc={handleDeleteDoc} onShareDoc={handleShareDoc} />
              }
            })}
            bordered={false}
            ghost
            defaultActiveKey={[
              ...filteredDocs.map((doc) => doc.category),
              ..._.uniq(_.flatMap(filteredDocs, 'files').map((e) => e.ext))
            ]}
          // accordion
          />
          :
          <Text italic type='secondary'>Bạn chưa tải tài liệu lên</Text>
        }
      </Skeleton>
    </Space>
  )

  function handleSearch(value: string) {
    setSearchValue(value);
  }

  function handleGroup(newGroup: typeof group) {
    setGroup(newGroup)
  }

  // on delete completely
  function handleDeleteDoc(docId: string) {
    mutate((currentDocGroups): typeof currentDocGroups => {
      return _.map(currentDocGroups, (group): typeof group => {
        return {
          'category': group.category,
          'files': _.filter(group.files, (doc) => doc.id !== docId)
        }
      })
    }, { revalidate: false })
  }

  function handleShareDoc(docId: string) {
    // mutate((currentDocGroups): typeof currentDocGroups => {
    //   return _.map(currentDocGroups, (group): typeof group => {
    //     return {
    //       'category': group.category,
    //       'files': _.map(group.files, (doc): typeof doc => {
    //         return doc.id === docId ? {
    //           ...doc,
    //           shared: !doc.shared
    //         } : doc
    //       })
    //     }
    //   })
    // }, { revalidate: false })
  }
}

function DocList({
  docsInfo,
  onDeleteDoc,
  onShareDoc
}: {
  docsInfo: MySubectDocGroup['files'],
  onDeleteDoc: (docId: string) => void,
  onShareDoc: (docId: string) => void
}) {
  return (
    <List>
      {
        docsInfo.map((info) => {
          return (
            <List.Item key={info.id}>
              <DocInfo info={info} onDeleteDoc={onDeleteDoc} onShareDoc={onShareDoc} />
            </List.Item>
          )
        })
      }
    </List>
  )
}

function DocInfo({
  info: { ext, name, id, link },
  onDeleteDoc, onShareDoc
}: {
  info: MySubjectDocument,
  onDeleteDoc: (docId: string) => void,
  onShareDoc: (docId: string) => void
}) {
  return (
    <div className="flex gap-2 items-center w-full group/doc">
      <DocumentImage ext={ext}/>
      <Link className=" flex-1 " href={link}>
        <Paragraph strong className="!mb-0 text-current text-xs">
          {ext} <br />
          {name}
        </Paragraph>
      </Link>
      <div className="flex gap-2">
        <MyButtonWrapper className="opacity-0 group-hover/doc:opacity-100 transition-opacity duration-300">
          <EyeIcon solidOnHover size={20} />
        </MyButtonWrapper>
        <MyButtonWrapper
          className=" opacity-0 group-hover/doc:opacity-100 transition-opacity duration-300"
          displayChildrenWhenLoading={false}
          onClick={async () => {
            const { ok } = await DocumentAPI.deleteMySubjectDoc(id);
            console.log(ok)
            if (!ok)
              toast.error('Xoá tài liệu thất bại')
            else
              onDeleteDoc(id)
          }}
        >
          <BinIcon solidOnHover />
        </MyButtonWrapper>
      </div>
    </div>
  )
}
