import React, { useState } from 'react'
import './App.css'

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';
import LongTermGoalsPage from "./pages/LongTermGoalsPage.tsx";
import ReflectionPage from "./pages/ReflectionPage.tsx";
import CharacterPage from "./pages/CharacterPage.tsx";
import AchievementsPage from "./pages/AchievementsPage.tsx";

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon: React.ReactNode,
  page: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    page
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Achievements', 'achievements', <DesktopOutlined />, <AchievementsPage/>),
  getItem('Long-term goals', 'goals', <PieChartOutlined />, <LongTermGoalsPage/>),
  getItem('Character', 'character', <FileOutlined />, <CharacterPage/>),
  getItem('Reflection', 'reflection', <FileOutlined />, <ReflectionPage/>),
  // getItem('Stats', '2', <DesktopOutlined />),
  // getItem('Stats', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('CharacterPage', '3', <TeamOutlined />, [getItem('Team 1', '31'), getItem('Team 2', '32')]),
  // getItem('Feedback', '4', <FileOutlined />),
];


function App() {
  const defaultSelectedKey = 'achievements'
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuChange = ({domEvent, key}:{domEvent: any, key: string}) => {
    console.log('menu changed', domEvent.target.innerHTML)
    setSelectedKey(key)
  }

  const getSelectedItem = () => {
    return items.find((item) => item.key == selectedKey)
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={[defaultSelectedKey]} mode="inline" items={items} onSelect={onMenuChange} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{getSelectedItem()!.label}</Breadcrumb.Item>
              {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {getSelectedItem()!.page}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default App
