import React from 'react'
import { Button } from 'antd'
import PageLayout from '../../Layout/PageLayout'

const Home = () => {
    return (
        <PageLayout breadcrumb>
            HOME
            <Button type="primary">test 试一下</Button>
        </PageLayout>
    )
}

export default Home