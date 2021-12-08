import "./Profile.scss";

import { Button, Col, Form, Input, Modal, Row, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import userApi from "../../../api/UserApi";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import { AuthToken } from "../../../models/AuthToken/AuthToken";
import { User } from "../../../models/User/User";
import { Order } from "./../../../models/Order/Order";
import confirm from "antd/lib/modal/confirm";

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

export default function Profile() {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [profile, setProfile] = React.useState<User>();
  const [orderList, setOrderList] = React.useState<Order>();
  const token = localStorage.getItem("token");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel, setTel] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [form] = Form.useForm();

  const handleOnChangeUsername = React.useCallback((e) => {
    setUsername(e.target.value);
  }, []);
  const handleOnChangeEmail = React.useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handleOnChangeTel = React.useCallback((e) => {
    setTel(e.target.value);
  }, []);
  const handleOnChangeAddress = React.useCallback((e) => {
    setAddress(e.target.value);
  }, []);

  //modal

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogOut = React.useCallback(() => {
    localStorage.removeItem("token");
  }, []);

  const slug = authToken?.slug;
  const login = authToken?.login;

  React.useEffect(() => {
    function fetchData() {
      userApi.authentication(token).then((result) => setAuthToken(result));
      userApi.get(slug).then((result: User) => {
        setProfile(result);
      });
      userApi.orderList(token).then((result) => setOrderList(result));
    }
    fetchData();
  }, [slug, token]);

  //table order list

  const columns = [
    {
      title: "Tên căn hộ",
      dataIndex: "apartment_name",
      render: (text: "Tên căn hộ") => <Link to="/">{text}</Link>,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
    },
    {
      title: "Thời gian đặt",
      dataIndex: "order_date",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (status: any) => (
        <>
          {status === null ? (
            <Tag color="yellow">Chờ xác nhận</Tag>
          ) : (
            <Tag color="blue">Đã xác nhận</Tag>
          )}
          {/* Đang thuê */}
        </>
      ),
    },
    {
      title: "",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button>Hủy đặt </Button>
        </Space>
      ),
    },
  ];

  const data = orderList?.orders;

  return (
    <div>
      <Header />
      {!login && (
        <div>
          <h1>Chua dang nhap</h1>
        </div>
      )}
      {login && (
        <div className="profile-container">
          <Row>
            <Col span={10}>
              <img src={profile?.user?.avatar} alt="error" />
            </Col>
            <Col span={10}>
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: "50px",
                  marginBottom: "20px",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                {profile?.user?.username}
              </h2>
              <p style={{ fontSize: "16px", marginTop: "30px" }}>
                Email:
                {profile?.user?.email}
              </p>
              <p style={{ fontSize: "16px", marginTop: "30px" }}>
                Điện thoại:
                {profile?.user?.tel}
              </p>
              <p style={{ fontSize: "16px", marginTop: "30px" }}>
                Địa chỉ:
                {profile?.user?.address}
              </p>
              <Button
                className="profile-edit-info"
                type="dashed"
                onClick={showModal}
              >
                Sửa thông tin
              </Button>
              <Button
                className="profile-dang-xuat"
                type="dashed"
                onClick={handleLogOut}
              >
                {" "}
                <Link style={{ color: "white", fontSize: "16px" }} to="/">
                  {" "}
                  Đăng xuất
                </Link>
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "50px" }} className="can-ho-cung-loai">
            <h2 className="h2-related"> CĂN HỘ ĐÃ ĐẶT</h2>
            <Table columns={columns} dataSource={data} />
          </Row>
          <Modal
            title="Chỉnh sửa thông tin cá nhân"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              className="register-form"
              {...formItemLayout}
              form={form}
              name="register"
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
                <Input onChange={handleOnChangeUsername} />{" "}
                {profile?.user?.username}
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
                <Input onChange={handleOnChangeEmail} /> {profile?.user?.email}
              </Form.Item>

              <Form.Item
                name="tel"
                label="Điện thoại"
                rules={[{ required: true, message: "Nhập Điện thoại" }]}
              >
                <Input style={{ width: "100%" }} onChange={handleOnChangeTel} />{" "}
                {profile?.user?.tel}
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
                {profile?.user?.address}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}

      <Footer />
    </div>
  );
}
