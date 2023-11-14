import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space, Typography, message } from "antd";
import React, { useState } from "react";
import cloudImage from "../../../assets/cloud.png";
import { Link } from "react-router-dom";
import "./style.css";

import LoginImage from "../../../assets/login.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    setError(false);
    messageApi.open({
      type: "success",
      content: "Log in successfully",
    });
  };
  const warning = () => {
    setError(true);
    messageApi.open({
      type: "warning",
      content: "The user name or password is incorrect",
    });
  };

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      warning();
      setLoading(false);
    }, 4000);
  };
  return (
    <div className="login-page">
      {contextHolder}
      <Space>
        <Image
          style={{
            backgroundColor: "#b3cde0",
            padding: "6px",
            borderRadius: "100px",
            // width: "60px",
          }}
          width={63}
          preview={false}
          src={LoginImage}
        />
        <Typography.Title
          style={{
            marginLeft: "10px",
          }}
          level={3}
        >
          Login
        </Typography.Title>
      </Space>
      <div className="login-page-content">
        <Form className="login-form" onFinish={onFinish}>
          <Image preview={false} width={150} src={cloudImage}></Image>
          <Typography.Title level={2}>Welcome Back</Typography.Title>
          <Typography.Paragraph>
            Please sign in to continue.
          </Typography.Paragraph>
          <Form.Item
            style={{ width: "100%", marginBottom: 15 }}
            name={"username"}
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
            ]}
          >
            <Input
              disabled={loading}
              style={{
                width: "100%",
                height: "40px",
              }}
              placeholder="Username"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name={"password"}
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input.Password
              status={""}
              disabled={loading}
              style={{
                height: "40px",
              }}
              placeholder="passowrd"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item style={{ width: "100%", marginBottom: 15 }}>
            <Button
              style={{ width: "100%" }}
              loading={loading}
              icon={<LoginOutlined />}
              className="custom-button"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Typography.Text
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Don't have an account?
              <span style={{ marginLeft: "3px" }}>
                <Link to={"/register"}> Signup now</Link>
              </span>
            </Typography.Text>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
