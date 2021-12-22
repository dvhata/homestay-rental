import "./Profile.scss";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tag } from "antd";
import React from "react";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

import userApi from "../../../api/UserApi";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import { AuthToken } from "../../../models/AuthToken/AuthToken";
import { User } from "../../../models/User/User";
import { Order } from "./../../../models/Order/Order";

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

export default function Profile() {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [profile, setProfile] = React.useState<User>();
  const [orderList, setOrderList] = React.useState<Order>();
  const token = localStorage.getItem("token");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [form] = Form.useForm();

  // setUsername(profile?.user?.username as string);
  // setEmail(profile?.user?.email as string);
  // setAddress(profile?.user?.address as string);
  // setTel(profile?.user?.tel as string);

  //modal
  const [visibleLogin, setVisibleLogin] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

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

  //modal edit

  const showModal = () => {
    setVisibleLogin(true);
  };

  const handleOk = async () => {
    const data = { username, tel, email, address };
    userApi.edit(slug, token as string, data).then((result) => {});
    setConfirmLoading(true);
    alert("Thay doi thong tin thanh cong!");
    window.location.reload();
  };

  const handleCancel = () => {
    setVisibleLogin(false);
  };

  // cancel order
  const handleCancelOrder = async (e: any) => {
    console.log(e.target.value);
    userApi.cancel(token as string, e.target.value).then((result) => {});
    setConfirmLoading(true);
    window.location.reload();
  };

  // log out

  const handleLogOut = React.useCallback(() => {
    localStorage.removeItem("token");
  }, []);

  const slug = authToken?.slug;
  const login = authToken?.login;

  React.useEffect(() => {
    setUsername(profile?.user?.username as string);
    setEmail(profile?.user?.email as string);
    setAddress(profile?.user?.address as string);
    setTel(profile?.user?.tel as string);
    function fetchData() {
      userApi.authentication(token).then((result) => setAuthToken(result));
      userApi.get(slug).then((result: User) => {
        setProfile(result);
      });
      userApi.orderList(token).then((result) => setOrderList(result));
    }
    fetchData();
  }, [
    profile?.user?.address,
    profile?.user?.email,
    profile?.user?.tel,
    profile?.user?.username,
    slug,
    token,
  ]);
  let count = 1;

  return (
    <div>
      <Header />
      {!login && (
        <div>
          <h1>WARNING: Chưa đăng nhập</h1>
        </div>
      )}
      {login && (
        <div className="profile-container">
          <Row>
            <Col span={10}>
              <img
                style={{ width: "400px", height: "300px" }}
                src={profile?.user?.avatar}
                alt="error"
              />
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
          <Row
            style={{ marginTop: "50px", width: "90%" }}
            className="can-ho-cung-loai"
          >
            <h2 className="h2-related"> CĂN HỘ ĐÃ ĐẶT</h2>
            <table>
              <tr>
                <th>STT</th>
                <th>Tên căn hộ</th>
                <th>Giá tiền</th>
                <th>Ngày đặt phòng</th>
                <th>Ngày thuê phòng</th>
                <th>Ngày trả phòng</th>
                <th>Tình trạng đặt</th>
                <th></th>
              </tr>

              {orderList?.orders?.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{count++}</td>
                    <td>{item.apartment_name}</td>
                    <td>
                      <NumberFormat
                        value={item.price}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      {"đ "}
                    </td>
                    <td>
                      {" "}
                      {item.order_date && (
                        <Moment
                          date={item.order_date}
                          format="DD/MM/YYYY"
                        ></Moment>
                      )}
                    </td>
                    <td>
                      {" "}
                      {item.check_in_date && (
                        <Moment
                          date={item.check_in_date}
                          format="DD/MM/YYYY"
                        ></Moment>
                      )}
                      {!item.check_in_date && "---"}
                    </td>
                    <td>
                      {item.return_date && (
                        <Moment
                          date={item.return_date}
                          format="DD/MM/YYYY"
                        ></Moment>
                      )}
                      {!item.check_in_date && "---"}
                    </td>
                    <td>
                      {!item.status && (
                        <Tag icon={<ClockCircleOutlined />} color="default">
                          Chờ xác nhận
                        </Tag>
                      )}
                      {item.status && item.status === "canceled" && (
                        <Tag icon={<MinusCircleOutlined />} color="error">
                          Bị hủy
                        </Tag>
                      )}

                      {item.status &&
                        item.status === "confirmed" &&
                        !item.check_in_date &&
                        !item.return_date && (
                          <Tag
                            icon={<ExclamationCircleOutlined />}
                            color="warning"
                          >
                            Đã xác nhận
                          </Tag>
                        )}

                      {item.status &&
                        item.status === "confirmed" &&
                        item.check_in_date &&
                        !item.return_date && (
                          <Tag icon={<SyncOutlined spin />} color="processing">
                            Đang thuê
                          </Tag>
                        )}

                      {item.status &&
                        item.status === "confirmed" &&
                        item.check_in_date &&
                        item.return_date && (
                          <Tag icon={<CheckCircleOutlined />} color="success">
                            Đã trả phòng
                          </Tag>
                        )}
                    </td>
                    <td>
                      {!item.status && (
                        <button value={item._id} onClick={handleCancelOrder}>
                          Hủy đặt
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </table>
          </Row>
          <Modal
            title="Chỉnh sửa thông tin cá nhân"
            visible={visibleLogin}
            onOk={handleOk}
            confirmLoading={confirmLoading}
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
                <Input
                  defaultValue={profile?.user?.username}
                  onChange={handleOnChangeUsername}
                />{" "}
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
                <Input
                  defaultValue={profile?.user?.email}
                  onChange={handleOnChangeEmail}
                />
              </Form.Item>

              <Form.Item
                name="tel"
                label="Điện thoại"
                rules={[{ required: true, message: "Nhập Điện thoại" }]}
              >
                <Input
                  defaultValue={profile?.user?.tel}
                  style={{ width: "100%" }}
                  onChange={handleOnChangeTel}
                />{" "}
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
                <Input
                  defaultValue={profile?.user?.address}
                  onChange={handleOnChangeAddress}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}

      <Footer />
    </div>
  );
}
