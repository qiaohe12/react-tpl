import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider, Modal, message, notification } from 'antd'
import { RecoilRoot } from 'recoil'
import {
    BrowserRouter,
    Switch,
    Redirect
} from "react-router-dom";
import { renderRoutes } from 'react-router-config'
import { routes, menu } from './routes'
import Layout from './Layout/index'
import 'antd/dist/antd.less'
import './index.less'

if (module.hot) {
    module.hot.accept()
}

message.config({
    prefixCls: 'qiao',
});
notification.config({
    prefixCls: 'qiao',
});
Modal.config({
    rootPrefixCls: 'qiao',
});

ReactDOM.render(
    <ConfigProvider prefixCls="qiao">
        <RecoilRoot>
            <BrowserRouter>
                <Layout menu={menu}>
                    <Switch>
                        <Redirect path="/" exact to="test" />
                        {renderRoutes(routes)}
                    </Switch>
                </Layout>
            </BrowserRouter>
        </RecoilRoot>
    </ConfigProvider>,
    document.getElementById('app')
)