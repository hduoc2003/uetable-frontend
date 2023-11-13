import { Space, Tabs } from "antd";
import Title from "antd/es/typography/Title";
import { TabBarExtraPosition, Tab } from "rc-tabs/lib/interface";

interface TopNavigationLayoutProps {
    title: string
    pageName: string
    navItems: Tab[]
    children: React.ReactNode
}

export default function TopNavigationLayout({
    title,
    pageName,
    navItems,
}: TopNavigationLayoutProps) {
    let tabBarExtraContent : Record<TabBarExtraPosition, React.ReactNode> = {
        // 'left': <Title level={5} className="mr-4">
        //             ~/{pageName}/
        //         </Title>,
        'left': '',
        'right': ''
    }

    return (
        <main className="">
            <Space direction="vertical">
                <Title level={4} className="mr-4">
                    ~/ {pageName} / đã hoàn thành
                </Title>
                <Tabs
                    tabBarExtraContent={tabBarExtraContent}
                    items={navItems}
                    // type="c"
                    indicatorSize={(origin) => origin * 1}
                />
            </Space>
        </main>
    );
}
