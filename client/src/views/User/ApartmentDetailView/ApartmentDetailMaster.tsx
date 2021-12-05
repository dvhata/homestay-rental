import { Breadcrumb, Button, Carousel, Col, Modal, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import apartmentApi from "../../../api/ApartmentApi";
import userApi from "../../../api/UserApi";
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

  //modal
  const [visibleLogin, setVisibleLogin] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Bạn chắc chắn muốn đặt phòng chứ?");

  let slug: any = localStorage.getItem("apartment-slug");
  let type_slug: any = apartmentDetail && apartmentDetail.apartment?.type_slug;

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

  const handleOrder = React.useCallback(() => {
    if (login) {
      // setVisibleNoLogin(true);
    } else {
      setVisibleLogin(true);
    }
  }, [login]);

  const handleOk = () => {
    setModalText("Yêu cầu đang được xử lí...");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleLogin(false);
      setConfirmLoading(false);
      alert("Đặt phòng thành công. Hãy kiểm tra trạng thái đơn hàng trong trang cá nhân của bạn!")
    }, 3000);
    
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisibleLogin(false);
  };

  return (
    <div>
      <Header />
      <div className="apartment-detail-container">
        <Breadcrumb
          style={{ margin: "16px 20px", marginTop: 50, marginBottom: 0 }}
        >
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
          <Col span={10}>
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
              <Modal
                title="Xác nhận yêu cầu đặt phòng"
                visible={visibleLogin}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{modalText}</p>
              </Modal>
              {!checkOrder && (
                <Button className="dat-phong" disabled={true}>
                  Hết phòng
                </Button>
              )}
            </h2>
            <p style={{ fontSize: "16px" }}>
              Giá:
              {apartmentDetail && apartmentDetail.apartment?.price}
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

        <Row className="can-ho-cung-loai">
          <h2 className="h2-related"> CĂN HỘ CÙNG LOẠI</h2>
          <Col className="row-related" span={24}>
            {apartmentRelated &&
              apartmentRelated.apartments?.map((item) => {
                return (
                  <div className="col-related">
                    <h4>{item.name}</h4>
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
                  </div>
                );
              })}
          </Col>
        </Row>

        {feedback &&
          feedback.feedbacks?.map((item) => {
            return (
              <div className="feedback">
                <h2 className="h2-related"> FEEDBACK</h2>
                <div>
                  <Row>
                    <Col span={2}>
                      {" "}
                      <img
                        className="feedback-img"
                        src={item.cus_avatar}
                        alt="error"
                      ></img>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={15}>
                      <h4>{item.cus_name}</h4>
                      <h5> {item.createdAt}</h5>
                      <h5> {item.comment}</h5>
                    </Col>
                  </Row>
                </div>
              </div>
            );
          })}
      </div>

      <Footer />
    </div>
  );
}
