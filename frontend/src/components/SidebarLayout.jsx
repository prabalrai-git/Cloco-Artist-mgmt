import { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import usePermissions from "../hooks/usePermissions";

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

  const user = useSelector((state) => state.auth.user);

  const permissions = usePermissions(user.role.role);

  const menuItems = [
    {
      key: "/artists",
      icon: <VideoCameraOutlined />,
      label: <Link to="/artists">Artists</Link>,
      visible: permissions.artist.Read,
    },
    {
      key: "/",
      icon: <UserOutlined />,
      label: <Link to="/">Users</Link>,
      visible: permissions.user.Read,
    },
  ].filter((item) => item.visible); // Filter out items that are not visible

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
          items={menuItems}
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
          <div className="flex items-center gap-10 ">
            <p>
              Howdy!{" "}
              <span className="font-semibold">
                {user?.first_name} {user?.last_name}
              </span>
            </p>
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
          </div>
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
