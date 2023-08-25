import React from "react";

import { Button, Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  AreaChartOutlined,
  BuildOutlined,
  DesktopOutlined,
  LoginOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import logoMenu from "../Dashboard/assets/logoMenu";
import SubMenu from "antd/es/menu/SubMenu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";

const { Sider } = Layout;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  path: string;
  children?: MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: string,
  icon: React.ReactNode,
  path: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    label,
    path,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", <AppstoreOutlined />, "/"),
  getItem("Thiết bị", "2", <DesktopOutlined />, "/devices"),
  getItem("Dịch vụ", "3", <MessageOutlined />, "/services"),
  getItem("Cấp số", "4", <BuildOutlined />, "/numbers"),
  getItem("Báo cáo", "5", <AreaChartOutlined />, "/reports"),
  getItem("Cài đặt hệ thống", "6", <SettingOutlined />, "/settings", [
    getItem("Quản lý vai trò", "6.1", <SettingOutlined />, "/roles"),
    getItem("Quản lý tài khoản", "6.2", <SettingOutlined />, "/accounts"),
    getItem("Nhật ký người dùng", "6.3", <SettingOutlined />, "/users"),
  ]),
];

const SiderMenu = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const handleLogout = async () => {
    localStorage.removeItem("userAccount");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    await navigate("/login");
  };
  return (
    <Sider theme="light" className="sidebar">
      <div style={{ width: 200 }}>
        <div
          dangerouslySetInnerHTML={{ __html: logoMenu }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        ></div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="vertical"
          theme="light"
        >
          {items.map((item) =>
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>
                    <Link to={child.path}>{child.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </div>
      <Button
        className="btn-logout"
        icon={<LoginOutlined style={{ color: "#ff7506" }} />}
        onClick={handleLogout}
      >
        <span className="btn-text__logout">Đăng xuất</span>
      </Button>
    </Sider>
  );
};

export default SiderMenu;
