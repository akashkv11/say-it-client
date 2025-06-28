import React from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import api from "../../utils/axios-instance";
import { errorHandler } from "../../utils/error-handler";
import popMessage from "../../utils/show-message";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log("Registration Data:", values);
    const [error, data] = await errorHandler(api.post("/users/signup", values));
    if (error) {
      console.error("Registration Error:", error);
      // Handle error appropriately, e.g., show a notification
      popMessage("error", "Registration failed. Please try again.");
      return;
    }
    console.log("Registration Success:", data);
    popMessage("success", "Registration successful! Please log in.");
    // Handle successful registration, e.g., redirect to login page or show a success message

    navigate("/login");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{ width: 400, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
        title={<h2 style={{ textAlign: "center" }}>Create your account</h2>}
      >
        <Form layout="vertical" onFinish={onFinish}>
          {/* Username */}
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter username" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter an email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter password"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
