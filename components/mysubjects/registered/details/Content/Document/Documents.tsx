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

const { Text, Paragraph } = Typography;

const fetchId = genId();
interface Props {
  subjectId: string
}

export default function Documents({ subjectId }: Props) {
  const { data: docGroups, isLoading, mutate } = useSWR([fetchId, subjectId], ([_, subjectId]) => {
    console.log('refetch');
    return DocumentAPI.getMySubjectDocs(subjectId)
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
      <Taskbar onSearch={handleSearch} onGroup={handleGroup} />
      <Skeleton active round loading={isLoading}>
        {
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
    mutate((currentDocGroups): typeof currentDocGroups => {
      return _.map(currentDocGroups, (group): typeof group => {
        return {
          'category': group.category,
          'files': _.map(group.files, (doc): typeof doc => {
            return doc.id === docId ? {
              ...doc,
              shared: !doc.shared
            } : doc
          })
        }
      })
    }, { revalidate: false })
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
  info: { ext, name, id, link, shared },
  onDeleteDoc, onShareDoc
}: {
  info: MySubjectDocument,
  onDeleteDoc: (docId: string) => void,
  onShareDoc: (docId: string) => void
}) {
  const [imgSrc, setImgSrc] = useState(`/images/icons/${ext}.png`);
  return (
    <div className="flex gap-2 items-center w-full group/doc">
      <Image
        src={imgSrc}
        alt={ext}
        width={5000}
        height={5000}
        className="!w-[40px]"
        onError={(e) => setImgSrc('/images/icons/documents.png')}
      />
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
        <Tooltip title={shared ? 'Dừng chia sẻ' : 'Đánh dấu tệp là công khai'} trigger={['hover']}>
          <MyButtonWrapper
            displayChildrenWhenLoading={false}
            onClick={async () => {
              const { ok } = await DocumentAPI.toggleShare(id);
              if (!ok)
                toast.error(shared ? 'Huỷ chia sẻ thất bại' : 'Chia sẻ thất bại')
              else
                onShareDoc(id);
            }}
          >
            <ShareIcon solidOnHover solid={shared} />
          </MyButtonWrapper>
        </Tooltip>
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
