import React from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../Layout/PageLayout'


const Page1 = () => {
    return (
        <PageLayout breadcrumb={[{ title: 'page' }]}>
            PAGE1
            <Link to="/page/page1/detail/1">详情</Link>
        </PageLayout>
    )
}

export default Page1