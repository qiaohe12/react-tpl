import React from 'react';
import Page1 from './Pages/Page1.js'
import { BankOutlined } from '@ant-design/icons';

const menu = [
    {
        title: 'test',
        path: '/page1',
        index: true,
        Component: Page1,
        icon: <BankOutlined />
    }
]

export default menu