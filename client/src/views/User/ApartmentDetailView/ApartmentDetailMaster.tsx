/* eslint-disable react/jsx-no-undef */
import {
  Breadcrumb,
  Button,
  Carousel,
  Col,
  Form,
  Input,
  Modal,
  Row,
} from "antd";
import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

import apartmentApi from "../../../api/ApartmentApi";
import userApi from "../../../api/UserApi";
import ApartsDetail from "../../../components/ApartsDetail/ApartsDetail";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import { Apartment } from "../../../models/Apartment/Apartment";
import { ApartmentDetail } from "../../../models/ApartmentDetail/ApartmentDetail";
import { AuthToken } from "../../../models/AuthToken/AuthToken";
import { Feedback } from "../../../models/Feedback/Feedback";
import "./ApartmentDetailMaster.scss";

export default function ApartmentDetailMaster() {
  const [apartmentDetail, setApartmentDetail] =
    React.useState<ApartmentDetail>();
  const [apartmentRelated, setApartmentRelated] = React.useState<Apartment>();
  const [checkOrder, setCheckOrder] = React.useState(false);
  const [feedback, setFeedback] = React.useState<Feedback>();
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const token = localStorage.getItem("token");
  const login = authToken?.login;

  let slug: any = localStorage.getItem("apartment-slug");
  let type_slug: any = apartmentDetail && apartmentDetail.apartment?.type_slug;

  //modal
  const [visibleLogin, setVisibleLogin] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(
    "Bạn chắc chắn muốn đặt phòng chứ?"
  );

  // form - order
  const [form] = Form.useForm();
  const [cus_name, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel, setTel] = React.useState(0);
  const handleOnChangeUsername = React.useCallback((e) => {
    setUsername(e.target.value);
  }, []);
  const handleOnChangeEmail = React.useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handleOnChangeTel = React.useCallback((e) => {
    setTel(e.target.value);
  }, []);

  const handleOrder = React.useCallback(() => {
    setVisibleLogin(true);
  }, []);

  //feedback
  const [feedbackUser, setFeedbackUser] = React.useState("");

  React.useEffect(() => {
    const fetchData = () => {
      apartmentApi.detail(slug).then((result: ApartmentDetail) => {
        setApartmentDetail(result);
      });
      apartmentApi.relate(slug, type_slug).then((result: Apartment) => {
        setApartmentRelated(result);
      });
      apartmentApi.checkOrder(slug).then((result) => {
        setCheckOrder(result.available);
      });
      apartmentApi.getFeedback(slug).then((result: Feedback) => {
        setFeedback(result);
      });
      userApi.authentication(token).then((result) => setAuthToken(result));
    };
    fetchData();
  }, [slug, token, type_slug]);

  //model-order

  const handleOk = async () => {
    const data = { cus_name, email, tel };
    if (!token && (!email || !tel || !cus_name)) {
      alert("Đặt phòng thất bại do bạn chưa điền đầy đủ thông tin!");
    } else {
      apartmentApi.order(slug, token as string, data).then((result) => {});
      setModalText("Yêu cầu đang được xử lí...");
      setConfirmLoading(true);
      setTimeout(() => {
        setVisibleLogin(false);
        setConfirmLoading(false);
        alert(
          "Đặt phòng thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!"
        );
      }, 3000);
    }
  };

  const handleCancel = () => {
    setVisibleLogin(false);
  };

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

  //feedback
  const handleGetFeedback = React.useCallback((e) => {
    setFeedbackUser(e.target.value);
  }, []);

  const handleSendFeedback = async () => {
    const data = { comment: feedbackUser };
    apartmentApi.feedback(slug, token as string, data).then((result) => {});
    window.location.reload();
  };

  return (
    <div className="apartment-detail-containerr">
      <Header />
      <div className="apartment-detail-container">
        <Breadcrumb style={{ marginLeft: 10, marginTop: 50, marginBottom: 0 }}>
          <Breadcrumb.Item>
            <Link to="/"> Bird's net</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/apartment-type"> Loai can ho</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/apartment/${type_slug}`}>{type_slug}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{slug}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span={10}>
            <Carousel autoplay>
              {apartmentDetail &&
                apartmentDetail.apartment?.images?.map((item) => {
                  return (
                    <>
                      <div>
                        <img className="img-detail" alt="" src={item} />
                      </div>
                    </>
                  );
                })}
            </Carousel>
          </Col>
          <Col span={14}>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "50px",
                marginBottom: "20px",
                borderBottom: "1px solid black",
              }}
            >
              {apartmentDetail && apartmentDetail.apartment?.name}
              {checkOrder && (
                <Button
                  className="dat-phong"
                  onClick={handleOrder}
                  disabled={false}
                >
                  Đặt phòng{" "}
                </Button>
              )}
              {login && (
                <Modal
                  title="Xác nhận yêu cầu đặt phòng"
                  visible={visibleLogin}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <p>{modalText}</p>
                </Modal>
              )}

              {!login && (
                <Modal
                  title="Điền đơn đặt phòng"
                  visible={visibleLogin}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={handleOk}
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
                      name="tel"
                      label="Điện thoại"
                      rules={[{ required: true, message: "Nhập Điện thoại" }]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        onChange={handleOnChangeTel}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              )}

              {!checkOrder && (
                <Button className="dat-phong" disabled={true}>
                  Hết phòng
                </Button>
              )}
            </h2>
            <p style={{ fontSize: "16px" }}>
              Giá:
              <NumberFormat
                value={apartmentDetail && apartmentDetail.apartment?.price}
                displayType={"text"}
                thousandSeparator={true}
              />
              đ
            </p>
            <p style={{ fontSize: "16px" }}>
              Diện tích:
              {apartmentDetail && apartmentDetail.apartment?.area}
            </p>
            <p style={{ fontSize: "16px" }}>
              Số người:
              {apartmentDetail && apartmentDetail.apartment?.number_of_cus}
            </p>
            <p style={{ fontSize: "16px" }}>Dịch vụ:</p>
            <img
              className="img-dichvu"
              src={apartmentDetail && apartmentDetail.apartment?.ultilities_img}
              alt="error"
            />
            <p style={{ fontSize: "16px" }}>
              Mô tả:
              {apartmentDetail && apartmentDetail.apartment?.description}
            </p>
          </Col>
        </Row>
        <Row></Row>
        <ApartsDetail />
        <Row className="can-ho-cung-loai">
          <h2 className="h2-related"> CĂN HỘ CÙNG LOẠI</h2>
          <Col className="row-related" span={23}>
            {apartmentRelated &&
              apartmentRelated.apartments?.map((item) => {
                return (
                  <div className="col-related">
                    {item.images?.slice(0, 1).map((image) => {
                      return (
                        <>
                          <img
                            className="img-related"
                            src={image}
                            alt="error"
                          />
                        </>
                      );
                    })}
                    <h4 style={{ textAlign: "center", fontSize: "16px", fontWeight: "bold" }}>{item.name}</h4>
                  </div>
                );
              })}
          </Col>
        </Row>

        <div className="feedback">
          <h2 className="h2-related"> FEEDBACK</h2>
          {!login && (
            <>
              <h5 style={{ fontSize: "16px" }}>
                <Link to={"/login"}> Đăng nhập </Link>
                để có thể feedback
              </h5>
            </>
          )}
          {login && (
            <>
              <Row>
                <Col span={3}>
                  {" "}
                  <img
                    className="feedback-img"
                    src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                    alt="error"
                    style={{ borderRadius: "70px" }}
                  ></img>
                </Col>

                <Col span={18}>
                  {" "}
                  <Input
                    style={{ fontSize: "16px", width: "100%", height: "100px" }}
                    placeholder="Nhập đánh giá của bạn về chúng tui"
                    type="dashed"
                    onChange={handleGetFeedback}
                  />
                  <Button
                    onClick={handleSendFeedback}
                    style={{
                      fontSize: "16px",
                      width: "150px",
                      height: "40px",
                      color: "white",
                      backgroundColor: "black",
                      marginTop: "10px",
                    }}
                  >
                    Gửi feedback
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {feedback &&
            feedback.feedbacks?.map((item) => {
              return (
                <div>
                  <Row style={{ marginTop: "30px" }}>
                    <Col span={3}>
                      {" "}
                      <img
                        className="feedback-img"
                        src={item.cus_avatar}
                        alt="error"
                        style={{ borderRadius: "70px" }}
                      ></img>
                    </Col>
                    <Col span={18} style={{ fontSize: "16px" }}>
                      <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                        {item.cus_name}
                      </h4>
                      <h5 style={{ fontSize: "14px" }}> {item.createdAt}</h5>
                      <h5 style={{ fontSize: "14px" }}> {item.comment}</h5>
                    </Col>
                  </Row>
                </div>
              );
            })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
