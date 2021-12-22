import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import axiosClient from "../../../config/axiosClient";
import "./AdminRegister.scss";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function AdminRegister() {
  const [form] = Form.useForm();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tel, setTel] = React.useState(0);
  const [address, setAddress] = React.useState("");

  const [isSignUp, setSignUp] = React.useState("false");

  const handleOnChangeUsername = React.useCallback((e) => {
    setUsername(e.target.value);
  }, []);
  const handleOnChangeEmail = React.useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handleOnChangePassword = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const handleOnChangeTel = React.useCallback((e) => {
    setTel(e.target.value);
  }, []);
  const handleOnChangeAddress = React.useCallback((e) => {
    setAddress(e.target.value);
  }, []);

  const navigate = useNavigate();

  const onFinish = async () => {
    const data = { email, password, username, tel, address };

    axiosClient.post("/admins/signup", { data }).then((response) => {
      setSignUp(response.data.success);
    });
    if (isSignUp) {
      alert("Successful");
      navigate("/admin-login");
    } else {
      alert("Email đã được đăng kí");
    }
  };

  return (
    <div className="admin-register-container">
      <div className="admin-title">
        <h1>ADMIN - ĐĂNG KÝ TÀI KHOẢN</h1>
      </div>

      <Row>
        <Col span={10}>
          <img
            style={{ width: "100%", height: "500px" }}
            src="https://th.bing.com/th/id/R.125792a07ad820e473110ed6b6a11732?rik=HtsiEbe9wPYt2g&riu=http%3a%2f%2fclipartmag.com%2fimages%2fsnowflake-clipart-no-background-10.png&ehk=2S0GvwBXooskek9MQcDABQBXcZHC%2fAgfI%2fxUXj01Exk%3d&risl=&pid=ImgRaw&r=0"
            alt="error"
          />
        </Col>
        <Col span={12}>
          <Form
            className="admin-register"
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: "Nhập họ và tên!",
                  whitespace: true,
                },
              ]}
            >
              <Input onChange={handleOnChangeUsername} />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "sai định dạng Email",
                },
                {
                  required: true,
                  message: "Nhập Email!",
                },
              ]}
            >
              <Input onChange={handleOnChangeEmail} />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Nhập lại mật khẩu!",
                },
              ]}
              hasFeedback
            >
              <Input.Password onChange={handleOnChangePassword} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Nhắc lại mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="tel"
              label="Điện thoại"
              rules={[{ required: true, message: "Nhập Điện thoại" }]}
            >
              <Input style={{ width: "100%" }} onChange={handleOnChangeTel} />
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: "Nhập địa chỉ!",
                  whitespace: true,
                },
              ]}
            >
              <Input onChange={handleOnChangeAddress} />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Đồng ý với các điều khoản?")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>Tôi đồng ý với các điều khoản</Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button htmlType="submit">Đăng ký</Button>
              <Link className="link" to={"/admin-login"}>Đã có tài khoản?</Link>
            </Form.Item>
          </Form>
        </Col>
        <Col span={2}></Col>
      </Row>

      <div className="admin-title">
        <h4>@ Homestay Chim tren cay</h4>
      </div>
    </div>
  );
}
