import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function SignIn() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="Tên đăng nhập"
        rules={[{ required: true, message: "Nhập Tên đăng nhập!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Tên đăng nhập"
        />
      </Form.Item>
      <Form.Item
        name="mật khẩu"
        rules={[{ required: true, message: "Nhập Mật khẩu!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Nhớ tôi</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Quên mật khẩu
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Đăng ký
        </Button>
        Or <a href="">Đăng ký!</a>
      </Form.Item>
    </Form>
  );
}
