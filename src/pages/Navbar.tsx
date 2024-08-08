import React, { useState } from 'react';
import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';
import type { GetProp, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';




type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
    {
        key: '/',
        icon: <MailOutlined />,
        label: 'Navigation One',
    },
    {
        key: '/about',
        icon: <CalendarOutlined />,
        label: 'Navigation Two',
    }
];

const Navbar: React.FC = () => {

    const navigate = useNavigate()

    return (
        <>

            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                theme={'dark'}
                items={items}
                onClick={(e) => navigate(e.key)}
            />
        </>
    );
};

export default Navbar;