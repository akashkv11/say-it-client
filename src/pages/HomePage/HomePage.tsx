import { Button, Col, Layout, Menu, Row, Typography } from "antd";
import React from "react";
import "./home-page.css";
import { useNavigate } from "react-router-dom";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const menuItems: ItemType<MenuItemType>[] | undefined = [
    {
      label: "Home",
      key: "1",
    },
    {
      label: "About",
      key: "2",
    },
    {
      label: "Contact",
      key: "3",
    },
  ];

  return (
    <Layout>
      {/* Header Section */}
      <Header className="d-flex  p-0">
        <div className="app-title ">SayIt</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          className="w-100"
          items={menuItems}
        />
      </Header>

      {/* Content Section */}
      <Content style={{ padding: "50px", marginTop: 64 }}>
        <Row justify="center" align="middle" style={{ height: "70vh" }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <div style={{ textAlign: "center" }}>
              <Title level={2}>Welcome to SayIt</Title>

              <Button
                type="primary"
                size="large"
                style={{ marginRight: 10 }}
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
              <Button size="large" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          </Col>
        </Row>
      </Content>

      {/* Footer Section */}
      <Footer style={{ textAlign: "center" }}>
        SayIt ©{new Date().getFullYear()} Created by Akash
      </Footer>
    </Layout>
  );
};

export default HomePage;
