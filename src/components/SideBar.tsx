import { Avatar, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Title from "antd/es/typography/Title";
import { useAuth } from "../context/AuthContext";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const items: ItemType<MenuItemType>[] = [
    {
      key: "1",
      icon: <MessageOutlined />,
      label: "Chats",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Contacts",
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: logout, // Handle logout action
    },
  ];
  return (
    <Sider
      theme="dark"
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ padding: 20, textAlign: "center" }}>
        <Avatar size={64} icon={<UserOutlined />} />
        {!collapsed && (
          <Title level={4} style={{ color: "white", marginTop: 10 }}>
            {user?.username}
          </Title>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
