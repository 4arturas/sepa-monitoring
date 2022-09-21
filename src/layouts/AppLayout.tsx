import { Layout } from 'antd';
import React from 'react';
import AppRouter from "../routes/AppRouter";
import NavBar from "../components/NavBar/NavBar";
import "antd/dist/antd.css";
const { Header, Content, Footer } = Layout;

export const AppLayout: React.FC = () => (
    <Layout className="layout">
        <Header>
            <div className="logo" />
            {/*<Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={new Array(15).fill(null).map((_, index) => {
                    const key = index + 1;
                    return {
                        key,
                        label: `nav ${key}`,
                    };
                })}
            />*/}
            <NavBar/>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content"><AppRouter/></div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>BBS Design ©2022</Footer>
    </Layout>
);
