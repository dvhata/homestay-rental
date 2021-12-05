import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import axiosClient from "../../../config/axiosClient";
import "./AdminLogin.scss"

export default function AdminLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLogin, setLogin] = React.useState();

  const onFinish = async () => {
    const data = { email, password };
    axiosClient.post("/admins/login", { data }).then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin-slug", response.data.token);
      setLogin(response.data.success);
    });
    isLogin ? alert("Successful") : alert("Failed");
  };

  const handleChangeEmail = React.useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <div className="admin-login-container">
      <h1 className="admin-title">ADMIN - ĐĂNG NHẬP</h1>
      <Form
        className="admin-login"
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        
      >
        <Form.Item
          name="Email"
          rules={[{ required: true, message: "Nhập Email!" }]}
        >
          <Input
            onChange={handleChangeEmail}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="mật khẩu"
          rules={[{ required: true, message: "Nhập Mật khẩu!" }]}
        >
          <Input
            onChange={handleChangePassword}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ tôi</Checkbox>
          </Form.Item>

          <Link to="/register">Quên mật khẩu</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
        </Form.Item>
        <Link className="admin-login-link" to="/admin-dashboard">Dashboard </Link>
      </Form>
    </div>
  );
}
