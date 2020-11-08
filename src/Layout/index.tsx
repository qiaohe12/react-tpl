import React, { Suspense, ReactNode } from "react";
import { useLocation } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import SiderMenu from './Menu'
import { MenuProps } from '../Libs/Interface'
import './index.less'

const { Header, Sider, Content } = Layout

interface Props {
  menu: Array<MenuProps>,
  children: ReactNode
}

const App = ({ menu = [], children }: Props) => {
  return (
    <Layout>
      <Header className="layout-header">{{projectName}}</Header>
      <Layout>
        <Sider className="layout-sider">
          <SiderMenu menu={menu} {...useLocation()} />
        </Sider>
        <Content className="layout-content">
          <div className="layout-content-item">
            <Suspense fallback={<Spin spinning />}>
              {children}
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App