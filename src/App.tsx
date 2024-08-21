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

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  page?: React.ReactNode,
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
  getItem('Long-term goals', '0', <PieChartOutlined />, <LongTermGoalsPage/>),
  getItem('Achievements', '1', <DesktopOutlined />),
  getItem('Stats', '2', <DesktopOutlined />),
  // getItem('Stats', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Character', '3', <TeamOutlined />, [getItem('Team 1', '31'), getItem('Team 2', '32')]),
  getItem('Character', '3', <FileOutlined />),
  getItem('Feedback', '4', <FileOutlined />),
];


function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState(0)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuChange = ({domEvent}:{domEvent: any}) => {
    setSelected(domEvent.target.innerHTML as string)
    console.log('menu changed', domEvent.target.innerHTML)
    // console.log(item.key, item.className, item.type)
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline" items={items} onSelect={onMenuChange} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{items[selected]?.label}</Breadcrumb.Item>
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
              Bill is a cat.
              {items.find((item) => item.key == selected)?.page}
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
