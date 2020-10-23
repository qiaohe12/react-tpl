import React from 'react'
import Header from './Header'
import Menu from './Menu'
import './index.scss'
import menu from '../menu'
import { Router } from "@reach/router"

const renderRouter = (menu) => {
    return <>
        {
            menu.map(item => {
                const { Component, submenu = [] } = item
                if (Component) {
                    return <Component key={item.path} path={item.path} />
                }
                if (submenu) {
                    return renderRouter(submenu)
                }
                return null
            })
        }
    </>
}

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <div className="layout-content">
                <Menu />
                <div className="content">
                    <Router>
                        {renderRouter(menu)}
                    </Router>
                </div>
            </div>
        </div>
    )
}

export default Layout