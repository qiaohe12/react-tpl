import React, { useMemo } from 'react'
import { Menu } from 'antd'
import { Link, matchPath } from 'react-router-dom'
import { MenuProps } from '../../Libs/Interface'
import './index.less'

interface Props {
    pathname: string,
    menu: Array<MenuProps>
}

const { SubMenu } = Menu

const renderMenu = (menu: Array<MenuProps>) => {
    return (
        <>
            {menu.map(item => {
                const { title, routes } = item
                if (routes && routes.length && title) {
                    return <SubMenu key={item.path} title={<span>{item.icon}{title}</span>}>{
                        renderMenu(routes)
                    }</SubMenu>
                }
                if (!routes && title) {
                    return <Menu.Item key={item.path}>
                        {item.icon}
                        {item.path ? <Link to={item.path}>{title}</Link> : item.title}
                    </Menu.Item>
                }
                return null
            })}
        </>
    )
}

const SiderMenu = (props: Props) => {
    const { pathname, menu } = props

    const selectedKeys = useMemo(() => {
        const keys: Array<string> = []
        const getMenu = (menuItems: Array<MenuProps>) => {
            menuItems.forEach(item => {
                if (item.path) {
                    const match = matchPath(pathname, { ...item, exact: false })
                    if (match) {
                        keys.push(item.path)
                    }
                }
                if (item.routes) {
                    getMenu(item.routes)
                }
            })
        }   
        getMenu(menu)
        return keys
    }, [pathname])

    return (
        <div className="layout-sider">
            <div className="layout-title">{{projectName}}</div>
            <Menu defaultOpenKeys={selectedKeys} selectedKeys={selectedKeys} mode="inline">
                {renderMenu(menu)}
            </Menu>
        </div>
    )
}

export default SiderMenu