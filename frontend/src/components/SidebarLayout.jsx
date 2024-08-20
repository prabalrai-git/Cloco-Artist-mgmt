import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const { Header, Sider, Content } = Layout;

const SidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const selectedKey = location.pathname;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical flex justify-center items-center font-semibold text-white text-xl"
          style={{
            height: "64px",
            background: "#858585",
            margin: "0px 0px 20px",
          }}
        >
          {collapsed ? "A" : " Artist Management"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: <Link to="/">Users</Link>,
            },
            {
              key: "/artists",
              icon: <VideoCameraOutlined />,
              label: <Link to="/artists">Artists</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            danger
            className="  flex justify-center items-center px-10 mr-10 rounded-sm 0"
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet /> {/* Render the nested routes */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
