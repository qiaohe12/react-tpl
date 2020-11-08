import React, { lazy } from 'react'
import { MenuProps } from './Libs/Interface'
import {
    AppleOutlined,
    AndroidOutlined
} from '@ant-design/icons'

const menu: Array<MenuProps> = [
    {
        title: 'test',
        path: '/test',
        exact: true,
        icon: <AppleOutlined />,
        component: lazy(() => import('./Pages/Home'))
    },
    {
        title: 'page',
        path: '/page',
        icon: <AndroidOutlined />,
        routes: [
            {
                title: 'page1',
                path: '/page/page1',
                exact: true,
                component: lazy(() => import('./Pages/Page1'))
            },
            {
                path: '/page/page1/detail/:id',
                desc: '详情',
                component: lazy(() => import('./Pages/Detail'))
            },
        ]
    },
        
]

const getRoutes = (menu: Array<MenuProps>) => {
    let list: Array<MenuProps> = []
    menu.forEach(item => {
        if (item.component) list.push(item)
        if (item.routes) list = [...list, ...getRoutes(item.routes)]
    });
    return list
}

const routes = getRoutes(menu || [])

export {
    menu,
    routes
}