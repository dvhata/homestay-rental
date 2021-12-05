import "./ApartmentMaster.scss";

import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Layout,
  List,
  Menu,
  Modal,
  Row,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link, useParams } from "react-router-dom";

import apartmentApi from "../../../api/ApartmentApi";
import apartmentTypeApi from "../../../api/AprtmentTypeApi";
import Header from "../../../components/Header/Header";
import { Apartment } from "../../../models/Apartment/Apartment";
import { ApartmentDetail } from "../../../models/ApartmentDetail/ApartmentDetail";
import { ApartmentType } from "../../../models/ApartmentType/ApartmentType";
import { Feedback } from "../../../models/Feedback/Feedback";
import { Carousel } from "react-responsive-carousel";

export default function ApartmentMaster() {
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
    <div>
      <Header />
      <Row className="container">
        <Col span={5}>
          <Sider className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <>
                <Button
                  className="button-control"
                  onClick={handleApartmenttAll}
                  type="dashed"
                >
                  <Link to="">TẤT CẢ</Link>
                </Button>
                {apartmentType?.apartment_types?.map((item, id) => {
                  return (
                    <div key={item._id}>
                      <Button
                        className="button-control"
                        type="dashed"
                        onClick={handleApartmentType}
                      >
                        <Link to={`${item.slug}`}>{item.name}</Link>
                      </Button>
                    </div>
                  );
                })}
              </>
            </Menu>
          </Sider>
        </Col>
        <Col span={15}>
          {" "}
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Homestay</Breadcrumb.Item>
              <Breadcrumb.Item>Loai can ho</Breadcrumb.Item>
              <Breadcrumb.Item>{slug || "tat-ca"}</Breadcrumb.Item>
              <input type="search" placeholder="Tim kiem" />
              <Button type="dashed" onClick={handleSortUp}>
                Tang
              </Button>
              <Button type="dashed" onClick={handleSortDown}>
                Giam
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
                              <button value={ap.slug} onClick={showModal}>
                                Xem them
                              </button>
                              {ap.images?.slice(0, 2).map((item) => {
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
                                      apartmentDetail.apartment?.images?.slice(0,1).map(
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
                                      apartmentDetail.apartment?.price}
                                  </p>
                                  <p>
                                    Dien tich:
                                    {apartmentDetail &&
                                      apartmentDetail.apartment?.area}
                                  </p>
                                  <p>
                                    So nguoi:
                                    {apartmentDetail &&
                                      apartmentDetail.apartment?.number_of_cus}
                                  </p>
                                  <p>Dich vu:</p>
                                  <img
                                    className="img-dichvu"
                                    src={
                                      apartmentDetail &&
                                      apartmentDetail.apartment?.ultilities_img
                                    }
                                    alt="error"
                                  />
                                  <p>
                                    Mo ta:
                                    {apartmentDetail &&
                                      apartmentDetail.apartment?.description}
                                  </p>
                                </Col>
                              </Row>

                              {checkOrder && (
                                <Button disabled={false}>Order</Button>
                              )}
                              {!checkOrder && (
                                <Button disabled={true}>Het phong</Button>
                              )}

                              <Row className="can-ho-cung-loai">
                                <h2 className="h2-related">
                                  {" "}
                                  CĂN HỘ CÙNG LOẠI
                                </h2>
                                <Col className="row-related" span={24}>
                                  {apartmentRelated &&
                                    apartmentRelated.apartments?.map((item) => {
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
                                <Button disabled={false}>Order</Button>
                              )}
                              {!checkOrder && (
                                <Button disabled={true}>Het phong</Button>
                              )}

                              <div>
                                {" "}
                                Cac can tuong tu:
                                {apartmentRelated &&
                                  apartmentRelated.apartments?.map((item) => {
                                    return <div>{item.name}</div>;
                                  })}
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
        </Col>
      </Row>
    </div>
  );
}
