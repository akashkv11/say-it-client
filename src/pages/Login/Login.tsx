import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // 🚀 Redirect if already logged in
    }
  }, [user, navigate]);
  const onFinish = async (values: FormValues) => {
    const isLoginSuccess = await login(values);
    if (isLoginSuccess) {
      navigate("/dashboard"); // 🚀 Redirect to dashboard on successful login
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
          <a href="/signup">Sign up</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
