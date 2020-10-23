import React from 'react'
import { Menu } from 'antd'
import { Link } from '@reach/router';
import menu from '../../menu';
import { projectName } from '../../Lib/Constant';

const { SubMenu } = Menu

const renderMenu = (menu, baseUrl) => {
    return (
        <>
            {menu.map(item => {
                const { title, submenu } = item
                const path = baseUrl ? `${baseUrl}/${item.path}` : item.path
                if (submenu && submenu.length && title) {
                    return <SubMenu key={path} title={<span>{item.icon}{title}</span>}>{
                        renderMenu(submenu, path)
                    }</SubMenu>
                }
                if (!submenu && title) {
                    return <Menu.Item key={path}>
                        {item.icon}
                        {item.path ? <Link to={path}>{title}</Link> : item.title}
                    </Menu.Item>
                }
                return null
            })}
        </>
    )
}

const SiderMenu = (props) => {
    return (
        <div className="layout-sider">
            <div className="layout-title">{ projectName }</div>
            <Menu>
                {renderMenu(menu)}
            </Menu>
        </div>
    )
}

export default SiderMenu
