import TopNavigationLayout from "@/components/layouts/TopNavigationLayout";
import Title from "antd/es/typography/Title";
import { Tab } from "rc-tabs/lib/interface";

type MySubjectNavKey = 'learned' | 'all'

export default function MySubjectsLayout({
    children
} : {
    children?: React.ReactNode
}) {
  return (
    // <TopNavigationLayout
    //     title={"môn học"}
    //     pageName={"môn học"}
    //     navItems={navItems}
    // >
    //     {children}
    // </TopNavigationLayout>
    {children}
  );
}

function createItem(label: Tab['label'], key: MySubjectNavKey, children: Tab['children']): Tab {
    return {
        label, key, children
    }
}
const navItems: Tab[] = [
    // createItem(<Title level={5}>Đã hoàn thành</Title>, 'learned', 'hehe'),
    // createItem(<Title level={5}>Chương trình đào tạo</Title>, 'all', 'hehe'),
    createItem('Đã hoành thành', 'learned', 'hehe'),
    createItem('Chương trình đào tạo', 'all', 'hehe')
]
