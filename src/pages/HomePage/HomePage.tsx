import { Button, Col, Layout, Menu, Row, Typography } from "antd";
import React from "react";
import "./home-page.css";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const HomePage: React.FC = () => {
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
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item>
        </Menu>
      </Header>

      {/* Content Section */}
      <Content style={{ padding: "50px", marginTop: 64 }}>
        <Row justify="center" align="middle" style={{ height: "70vh" }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <div style={{ textAlign: "center" }}>
              <Title level={2}>Welcome to SayIt</Title>

              <Button type="primary" size="large" style={{ marginRight: 10 }}>
                Sign in
              </Button>
              <Button size="large">Sign Up</Button>
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
