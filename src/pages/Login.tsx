import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import api from "../utils/axios-instance";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: FormValues) => {
    try {
      const response = await api.post("/auth/signin", values);

      console.log(response.data.data.access_token);

      if (response?.data?.success) {
        localStorage.setItem("token", response.data.data.access_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{ width: 400, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
        title={<h2 style={{ textAlign: "center" }}>Login</h2>}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <a href="/forgot-password">Forgot password?</a> |{" "}
          <a href="/register">Register now</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
