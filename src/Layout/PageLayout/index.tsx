import React, { ReactNode } from 'react'
import _ from 'lodash'
import { Breadcrumb } from 'antd'
import { matchPath } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MenuProps } from '../../Libs/Interface'
import { menu } from '../../routes'
import './index.less'

interface Breadcrumbs {
    title: string | undefined,
    path?: string
}

interface Props {
    children: ReactNode,
    breadcrumb: Boolean | Array<Breadcrumbs>
}

const PageLayout = ({ children, breadcrumb }: Props) => {
    const getBreadcrumb = () => {
        const pathname = window.location.pathname
        let breads: Array<Breadcrumbs> = []
        const getMenu = (menuItems: Array<MenuProps>) => {
            menuItems.forEach(item => {
                if (item.path) {
                    const match = matchPath(pathname, { ...item, exact: false })
                    if (match) {
                        breads.push({
                            title: item.title || item.desc,
                            path: item.component ? match.url : undefined
                        })
                    }
                }
                if (item.routes) {
                    getMenu(item.routes)
                }
            })
        }
        getMenu(menu)
        return breads
    }
    const getBreads = (): Array<Breadcrumbs> => {
        if (typeof breadcrumb === 'boolean') {
            return getBreadcrumb()
        }
        if (Array.isArray(breadcrumb)) {
            return breadcrumb
        }
        return []
    }
    
    return (
        <div className="page-wrap">
            <div className="page-top">
                {
                    breadcrumb ? (
                        <Breadcrumb className="page-breadcrumb">
                            {
                                getBreads().map((item, index) => (
                                    <Breadcrumb.Item key={item.title}>
                                        {
                                            item.path && index !== getBreads().length - 1
                                            ? <Link to={item.path}>{item.title}</Link>
                                            : item.title
                                        }
                                    </Breadcrumb.Item>
                                ))
                            }
                        </Breadcrumb>
                    ) : null
                }
            </div>
            <div className="page-content">
                {children}
            </div>
        </div>
    )
}

export default PageLayout