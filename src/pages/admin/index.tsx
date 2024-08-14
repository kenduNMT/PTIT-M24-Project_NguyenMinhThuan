import React from 'react';

import { Button, GetProp, Layout, Menu, MenuProps, theme } from 'antd';
import { CrownOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/slices/usersSlice';
import { useDispatch } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
    {
        key: '/admin',
        icon: <HomeOutlined />,
        label: 'DashBoard',
    },
    {
        key: '/admin/coursesManagemen',
        icon: <CrownOutlined />,
        label: 'Courses',
    }
    ,
    {
        key: '/admin/examsManagemen',
        icon: <CrownOutlined />,
        label: 'Exams',
    },
    {
        key: '/admin/examSubjectsManagemen',
        icon: <CrownOutlined />,
        label: 'Exams',
    },
    {
        key: '/admin/questionManagemen',
        icon: <CrownOutlined />,
        label: 'Question',
    },
    {
        key: '/admin/user',
        icon: <CrownOutlined />,
        label: 'UserAccount',
    }
];

const Admin: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // chuyển trang tự động
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleClickItem: MenuProps['onClick'] = (e) => {
        navigate(e.key)

    }

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />

                <Menu
                    onClick={handleClickItem}
                    defaultSelectedKeys={['/admin']}
                    // mode={mode}
                    // mode=''
                    theme={'dark'}
                    items={items}
                />
                {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} /> */}
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div />
                    <Button
                        type="primary"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                    Đăng xuất
                </Button>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 600,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
        </Layout >
    );
};

export default Admin;