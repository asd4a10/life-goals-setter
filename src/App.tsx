import React, { useState } from 'react'
import './App.css'

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import LongTermGoalsPage from "./pages/LongTermGoalsPage.tsx";
import ReflectionPage from "./pages/ReflectionPage.tsx";
import CharacterPage from "./pages/CharacterPage.tsx";
import AchievementsPage from "./pages/AchievementsPage.tsx";

const { Header, Content, Footer } = Layout;
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


function App() {
  const defaultSelectedKey = 'achievements'
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
            Reflex ©{new Date().getFullYear()} Created by Leveroff Apps
          </Footer>
      </Layout>
    </>
  )
}

export default App
