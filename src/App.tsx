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
];

const items2 = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

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
      <Layout className="flex flex-col items-center h-lvh w-full">
        <Header className='w-full flex items-center dark' style={{  }}>
          {/*<div className="demo-logo" />*/}
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedKey]}
            items={items}
            onSelect={onMenuChange}
            style={{ flex: 'auto', minWidth: 0 }}
          />
        </Header>
          <Content className={'h-full flex flex-col'} style={{ margin: '0 16px', width: '1200px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className={'mx-auto w-full h-full'}
              style={{
                padding: 24,
                minHeight: '360px',
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
    </>
  )
}

export default App
