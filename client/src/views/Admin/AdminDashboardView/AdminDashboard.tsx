import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import {
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Col,
  Dropdown,
  Layout,
  Menu,
  Modal,
  Row,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link, useParams } from "react-router-dom";
import adminApi from "../../../api/AdminApi";
import apartmentApi from "../../../api/ApartmentApi";
import apartmentTypeApi from "../../../api/ApartmentTypeApi";
import axiosClient from "../../../config/axiosClient";
import { Apartment } from "../../../models/Apartment/Apartment";
import { ApartmentDetail } from "../../../models/ApartmentDetail/ApartmentDetail";
import { ApartmentType } from "../../../models/ApartmentType/ApartmentType";
import { AuthToken } from "../../../models/AuthToken/AuthToken";
import { Feedback } from "../../../models/Feedback/Feedback";
import { Order } from "../../../models/Order/Order";
import { User } from "../../../models/User/User";
import "./AdminDashboard.scss";

export default function Dashboard() {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [profile, setProfile] = React.useState<User>();
  const [waitingOrder, setWaitingOrder] = React.useState<Order>();
  const [stayingOrder, setStayingOrder] = React.useState<Order>();
  const [confirmedOrder, setConfirmedOrder] = React.useState<Order>();
  const [showWaitingApartment, setShowWaitingApartment] = React.useState(false);
  const [showConfirmedApartment, setShowConfirmedApartment] =
    React.useState(false);
  const [showStayingApartment, setShowStayingApartment] = React.useState(false);
  const token = localStorage.getItem("token");

  const handleLogOut = React.useCallback(() => {
    localStorage.removeItem("token");
  }, []);

  const slugName = authToken?.slug;
  const login = authToken?.login;
  const username = authToken?.username;

  React.useEffect(() => {
    function fetchData() {
      adminApi.authentication(token).then((result) => setAuthToken(result));
      adminApi.get(slugName).then((result: User) => {
        setProfile(result);
      });

      adminApi.waiting(token).then((result: User) => {
        // console.log(result);
        setWaitingOrder(result);
      });

      adminApi.confirmed(token).then((result: User) => {
        // console.log(result);
        setConfirmedOrder(result);
      });

      adminApi.staying(token).then((result: User) => {
        // console.log(result);
        setStayingOrder(result);
      });
    }
    fetchData();
  }, [slugName, token]);

  const handleConfirm = React.useCallback(
    (e) => {
      const id = e.target.value;
      axiosClient
        .patch(`/admins/orders/${id}/check-in`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          // console.log(response);
        });
    },
    [token]
  );

  const handleStaying = React.useCallback(
    (e) => {
      const id = e.target.value;
      axiosClient
        .patch(`/admins/orders/${id}/check-in`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          // console.log(response);
        });
    },
    [token]
  );

  const handlePayment = React.useCallback(
    (e) => {
      const id = e.target.value;
      axiosClient
        .patch(`/admins/orders/${id}/check-out`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          // console.log(response);
        });
    },
    [token]
  );

  const handleShowWaitingApartment = React.useCallback(() => {
    setShowStayingApartment(true);
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button className="button-dashboard" onClick={handleLogOut}>
          <Link to={"/"}>Dang xuat</Link>
        </Button>
      </Menu.Item>
      <Menu.Item key="0">
        <Button className="button-dashboard" onClick={handleLogOut}>
          <Link to={"/admin-profile"}>Trang ca nhan</Link>
        </Button>
      </Menu.Item>
    </Menu>
  );

  // handle All
  const [data, setData] = React.useState<Apartment>();
  const [apartmentType, setApartmentType] = React.useState<ApartmentType>();
  const [apartment, setApartment] = React.useState<Apartment>();
  const [apartmentDetail, setApartmentDetail] =
    React.useState<ApartmentDetail>();
  const [apartmentSlug, setApartmentSlug] = React.useState("");
  const [countApartment, setCountApartment] = React.useState();
  const [isVisibleAprtment, setVisibleAprtment] = React.useState(true);
  const [sortType, setSortType] = React.useState("");
  const [apartmentRelated, setApartmentRelated] = React.useState<Apartment>();
  const [checkOrder, setCheckOrder] = React.useState(false);
  const [feedback, setFeedback] = React.useState<Feedback>();

  let { slug } = useParams();
  console.log(slug);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = React.useCallback((e) => {
    let temp = e.target.value;
    setApartmentSlug(temp);
    setIsModalVisible(true);
  }, []);

  React.useEffect(() => {
    const fetchData = () => {
      apartmentApi.list().then((result: Apartment) => {
        setData(result);
      });
      apartmentApi.sort(sortType).then((result: Apartment) => {
        setData(result);
      });
      apartmentApi.count().then((result) => {
        setCountApartment(result.count);
      });
      apartmentApi.get(apartmentSlug).then((result: ApartmentDetail) => {
        setApartmentDetail(result);
      });
      apartmentApi.relate(slug, apartmentSlug).then((result: Apartment) => {
        setApartmentRelated(result);
      });
      apartmentApi.checkOrder(apartmentSlug).then((result) => {
        setCheckOrder(result.available);
      });
      apartmentApi.getFeedback(apartmentSlug).then((result: Feedback) => {
        setFeedback(result);
      });

      apartmentTypeApi.list().then((result: ApartmentType) => {
        setApartmentType(result);
      });
      apartmentTypeApi.get(slug).then((result: Apartment) => {
        setApartment(result);
      });
    };
    fetchData();
  }, [slug, apartmentSlug, sortType]);

  const handleApartmentType = React.useCallback(() => {
    setVisibleAprtment(true);
  }, []);

  const handleApartmenttAll = React.useCallback(() => {
    setVisibleAprtment(false);
  }, []);

  // modal order

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSortUp = React.useCallback(() => {
    setSortType("asc");
  }, []);

  const handleSortDown = React.useCallback(() => {
    setSortType("desc");
  }, []);

  return (
    <div className="all">
      {/* <h1>{username}</h1> */}
      {!login && (
        <div className="div-not-login">
          <h1 className="h1-not-login">
            Ban phai dang nhap hoac dang ky de tiep tuc!
          </h1>
          <img
            className="img-not-login"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Warning.svg/2219px-Warning.svg.png"
            alt="error"
          />
          <Button className="button-not-login" type="dashed">
            <Link to="/admin-register">Dang ky</Link>
          </Button>
          <Button className="button-not-login" type="dashed">
            <Link to="/admin-login">Dang nhap</Link>
          </Button>
        </div>
      )}
      {login && (
        <>
          <Row>
            <Col className="col-1-dashboard" span={4}>
              <h2 className="header-dashboard"> Chim tren cay</h2>
              <Button
                onClick={handleApartmenttAll}
                className="button-dashboard"
                type="dashed"
              >
                Quản lý chung
              </Button>
              <Button
                onClick={handleShowWaitingApartment}
                className="button-dashboard"
                type="dashed"
              >
                Phòng chờ
              </Button>
              <Button className="button-dashboard" type="dashed">
                Phòng xác nhận
              </Button>
              <Button className="button-dashboard" type="dashed">
                {" "}
                Phòng đang thuê
              </Button>
            </Col>
            <Col span={18}>
              <div className="dashboard-container">
                <div className="dashboard-header">
                  <Dropdown
                    className="dashboard-header-dropdown"
                    overlay={menu}
                    trigger={["click"]}
                  >
                    <Button
                      className="button-dropdown"
                      onClick={(e) => e.preventDefault()}
                    >
                      <h3 className="dashboard-header-h3">
                        Hello admin: {username} <DownOutlined />{" "}
                      </h3>
                    </Button>
                  </Dropdown>
                </div>

                <div className="dashboard-content">
                  <div className="content-all">
                    <Row>
                      <Col span={4}>
                        {" "}
                        <Button
                          className="button-control"
                          onClick={handleApartmenttAll}
                          type="dashed"
                        >
                          <Link to="">TẤT CẢ</Link>
                        </Button>
                      </Col>

                      {apartmentType?.apartment_types?.map((item, id) => {
                        return (
                          <Col span={5} key={item._id}>
                            <Button
                              className="button-control"
                              type="dashed"
                              onClick={handleApartmentType}
                            >
                              <Link to={`${item.slug}`}>{item.name}</Link>
                            </Button>
                          </Col>
                        );
                      })}
                    </Row>

                    <div>
                      {" "}
                      <Layout style={{ padding: "0 24px 24px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                          <Breadcrumb.Item>Admin</Breadcrumb.Item>
                          <Breadcrumb.Item>Quản lý chung</Breadcrumb.Item>
                          <Breadcrumb.Item>{slug || "tat-ca"}</Breadcrumb.Item>
                          <input type="search" placeholder="Tim kiem" />
                          <Button type="dashed" onClick={handleSortUp}>
                            Tang
                          </Button>
                          <Button type="dashed" onClick={handleSortDown}>
                            Giam
                          </Button>
                          <Button type="dashed" onClick={handleSortDown}>
                            Them moi can ho
                          </Button>
                        </Breadcrumb>

                        <Content
                          className="site-layout-background"
                          style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                          }}
                        >
                          {isVisibleAprtment && (
                            <div>
                              {apartment &&
                                apartment.apartments?.map((ap) => {
                                  return (
                                    <div key={ap._id}>
                                      <>
                                        <Card
                                          className="card-apartment"
                                          title={`${ap.name} -  ${ap.price}`}
                                        >
                                          <Button
                                            type="default"
                                            value={ap.slug}
                                            onClick={showModal}
                                          >
                                            Xem thêm
                                          </Button>

                                          {ap.images
                                            ?.slice(0, 2)
                                            .map((item) => {
                                              return (
                                                <>
                                                  <img
                                                    className="apartment-img"
                                                    src={item}
                                                    alt="error"
                                                  />
                                                </>
                                              );
                                            })}
                                        </Card>
                                        <Modal
                                          title={
                                            apartmentDetail &&
                                            apartmentDetail.apartment?.name
                                          }
                                          visible={isModalVisible}
                                          onOk={handleOk}
                                          onCancel={handleCancel}
                                          width={1000}
                                        >
                                          <Row>
                                            <Col span={14}>
                                              <Carousel>
                                                {apartmentDetail &&
                                                  apartmentDetail.apartment?.images?.map(
                                                    (item) => {
                                                      return (
                                                        <>
                                                          <div>
                                                            <img
                                                              className="img-detail"
                                                              alt=""
                                                              src={item}
                                                            />
                                                          </div>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                              </Carousel>
                                            </Col>
                                            <Col span={10}>
                                              <p>
                                                Gia:
                                                {apartmentDetail &&
                                                  apartmentDetail.apartment
                                                    ?.price}
                                              </p>
                                              <p>
                                                Dien tich:
                                                {apartmentDetail &&
                                                  apartmentDetail.apartment
                                                    ?.area}
                                              </p>
                                              <p>
                                                So nguoi:
                                                {apartmentDetail &&
                                                  apartmentDetail.apartment
                                                    ?.number_of_cus}
                                              </p>
                                              <p>Dich vu:</p>
                                              <img
                                                className="img-dichvu"
                                                src={
                                                  apartmentDetail &&
                                                  apartmentDetail.apartment
                                                    ?.ultilities_img
                                                }
                                                alt="error"
                                              />
                                              <p>
                                                Mo ta:
                                                {apartmentDetail &&
                                                  apartmentDetail.apartment
                                                    ?.description}
                                              </p>
                                            </Col>
                                          </Row>

                                          <Button>Xóa </Button>

                                          <Button>Sửa</Button>

                                          <Row className="can-ho-cung-loai">
                                            <h2 className="h2-related">
                                              {" "}
                                              CĂN HỘ CÙNG LOẠI
                                            </h2>
                                            <Col
                                              className="row-related"
                                              span={24}
                                            >
                                              {apartmentRelated &&
                                                apartmentRelated.apartments?.map(
                                                  (item) => {
                                                    return (
                                                      <div className="col-related">
                                                        <h4>{item.name}</h4>
                                                        {item.images
                                                          ?.slice(0, 1)
                                                          .map((image) => {
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
                                                  }
                                                )}
                                            </Col>
                                          </Row>

                                          {feedback &&
                                            feedback.feedbacks?.map((item) => {
                                              return (
                                                <div className="feedback">
                                                  <h2 className="h2-related">
                                                    {" "}
                                                    FEEDBACK
                                                  </h2>
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
                                                        <h5>
                                                          {" "}
                                                          {item.createdAt}
                                                        </h5>
                                                        <h5> {item.comment}</h5>
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                        </Modal>
                                      </>
                                    </div>
                                  );
                                })}
                            </div>
                          )}

                          {(!isVisibleAprtment || !slug) && (
                            <div>
                              <h5 className="so-luong">
                                Hien thi: {countApartment} / {countApartment}{" "}
                              </h5>
                              {apartment &&
                                apartment.apartments?.map((ap) => {
                                  return (
                                    <div key={ap._id}>
                                      <>
                                        {data &&
                                          data.apartments?.map((item) => {
                                            return (
                                              <div key={item._id}>
                                                <>
                                                  <Card
                                                    className="card-apartment"
                                                    title={`${item.name} -  ${item.price}`}
                                                  >
                                                    <button
                                                      value={ap.slug}
                                                      onClick={showModal}
                                                    >
                                                      Xem them
                                                    </button>

                                                    {item.images
                                                      ?.slice(0, 2)
                                                      .map((item, index) => {
                                                        return (
                                                          <>
                                                            <img
                                                              className="apartment-img"
                                                              src={item}
                                                              alt="error"
                                                            />
                                                          </>
                                                        );
                                                      })}
                                                  </Card>
                                                </>
                                              </div>
                                            );
                                          })}

                                        <Modal
                                          title="Basic Modal"
                                          visible={isModalVisible}
                                          onOk={handleOk}
                                          onCancel={handleCancel}
                                          width={1000}
                                        >
                                          {apartmentDetail &&
                                            apartmentDetail.apartment?.name}
                                          {checkOrder && (
                                            <Button disabled={false}>
                                              Order
                                            </Button>
                                          )}
                                          {!checkOrder && (
                                            <Button disabled={true}>
                                              Het phong
                                            </Button>
                                          )}

                                          <div>
                                            {" "}
                                            Cac can tuong tu:
                                            {apartmentRelated &&
                                              apartmentRelated.apartments?.map(
                                                (item) => {
                                                  return <div>{item.name}</div>;
                                                }
                                              )}
                                          </div>
                                          {feedback &&
                                            feedback.feedbacks?.map((item) => {
                                              return (
                                                <div>
                                                  {item.cus_name}
                                                  <img
                                                    src={item.cus_avatar}
                                                    alt="error"
                                                  ></img>
                                                  {/* <Moment > */}
                                                  {item.createdAt}
                                                  {/* </Moment> */}
                                                  {item.comment}
                                                </div>
                                              );
                                            })}
                                        </Modal>
                                      </>
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </Content>
                      </Layout>
                    </div>
                  </div>
                  <div className="content-type">
                    {" "}
                    
                    {showWaitingApartment && (
                      <>
                        {" "}
                        Phong dang cho
                        {waitingOrder &&
                          waitingOrder.orders?.map((item) => {
                            return (
                              <div key={item._id}>
                                {item.apartment_name}
                                <button
                                  value={item._id}
                                  onClick={handleConfirm}
                                >
                                  {" "}
                                  Xac nhan
                                </button>
                                ;
                              </div>
                            );
                          })}{" "}
                      </>
                    )}
                  </div>
                  {/* <div>
                    Phong da xac nhan
                    {confirmedOrder &&
                      confirmedOrder.orders?.map((item) => {
                        return (
                          <>
                            {item.apartment_name}
                            <button value={item._id} onClick={handleStaying}>
                              {" "}
                              Xac nhan
                            </button>
                            ;
                          </>
                        );
                      })}
                  </div>
                  <div>
                    Phong dang thue
                    {stayingOrder &&
                      stayingOrder.orders?.map((item) => {
                        return (
                          <>
                            {item.apartment_name}
                            <button value={item._id} onClick={handlePayment}>
                              {" "}
                              Xac nhan
                            </button>
                            ;
                          </>
                        );
                      })}
                  </div> */}
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
