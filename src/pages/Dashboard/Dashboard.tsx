import React, { useState } from "react";
import { Layout, Menu, Avatar, List, Typography, Button } from "antd";
import {
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useAuth } from "../../context/AuthContext";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

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
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
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
              User Name
            </Title>
          )}
          dashboard{" "}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>

      {/* Main Content */}
      <Layout>
        {/* Header */}
        <Header
          style={{ background: "#fff", padding: 20, textAlign: "center" }}
        >
          <Title level={3}>Welcome to SayIt</Title>
        </Header>

        {/* Chat Area */}
        <Content
          style={{
            margin: 20,
            background: "#fff",
            padding: 20,
            borderRadius: 8,
          }}
        >
          <Title level={4}>Recent Chats</Title>
          <List
            itemLayout="horizontal"
            dataSource={[
              { name: "Alice", message: "Hey, how are you?" },
              { name: "Bob", message: "Let's catch up later!" },
              { name: "Charlie", message: "Sent a new file." },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.name}
                  description={item.message}
                />
                <Button type="link">Open</Button>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
