import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Image, Input, Space, Typography, message } from "antd";
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
  const buttomClicked = () => {
    setLoading(true);

    // Call API
    setLoading(false);
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
            width: "60px",
          }}
          preview={false}
          src={LoginImage}
        />
        <Typography.Title
          style={{
            marginLeft: "10px",
          }}
          level={2}
        >
          Login
        </Typography.Title>
      </Space>
      <div className="login-page-content">
        <Space size={24} direction="vertical">
          <Space size={10} direction="vertical">
            <Space
              style={{ width: "25vw" }}
              align="center"
              direction="vertical"
              className="login-header"
            >
              <Image preview={false} width={150} src={cloudImage}></Image>
              <Typography.Title level={2}>Welcome Back</Typography.Title>
              <Typography.Paragraph>
                Please sign in to continue.
              </Typography.Paragraph>
            </Space>
            <Input
              disabled={loading}
              style={{
                width: "25vw",
                height: "40px",
              }}
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            />

            <Input.Password
              status={""}
              disabled={loading}
              style={{
                width: "25vw",
                height: "40px",
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onPressEnter={() => {
                // TODO
              }}
              placeholder="passowrd"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Space>

          <Button
            onClick={buttomClicked}
            loading={loading}
            icon={<LoginOutlined />}
            className="custom-button"
            block
          >
            Login
          </Button>
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
        </Space>
      </div>
    </div>
  );
};

export default LoginPage;
