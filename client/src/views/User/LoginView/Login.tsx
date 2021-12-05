import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import Header from "../../../components/Header/Header";
import axiosClient from "../../../config/axiosClient";
import "./Login.scss";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLogin, setLogin] = React.useState();

  const onFinish = async () => {
    const data = { email, password };
    axiosClient.post("/users/login", { data }).then((response) => {
      localStorage.setItem("token", response.data.token);
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
    <>
      <Header />
      <h1 className="login-title">XIN MỜI ĐĂNG NHẬP!</h1>

      <div className="login-col-1">
        {" "}
        <Form
          name="normal_login"
          className="login-form"
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
            Or <Link to="/register">Đăng ký!</Link>
          </Form.Item>

          <Link to="/admin-login">Bạn là quản trị viên?</Link>
        </Form>
      </div>
      {/* <div className="login-col-2">
        <img
          className="login-img-2"
          src="https://cdn.dribbble.com/users/2582849/screenshots/16841680/media/0a22d6021a09c7d023ef13e60b93810f.jpg"
          alt="error"
        />
      </div> */}
    </>
  );
}
