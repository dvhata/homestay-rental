import './AdminDashboard.scss';

import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined';
import { Breadcrumb, Button, Card, Col, Dropdown, Form, Input, Layout, Menu, Modal, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import adminApi from '../../../api/AdminApi';
import apartmentApi from '../../../api/ApartmentApi';
import apartmentTypeApi from '../../../api/ApartmentTypeApi';
import axiosClient from '../../../config/axiosClient';
import { Apartment } from '../../../models/Apartment/Apartment';
import { ApartmentType } from '../../../models/ApartmentType/ApartmentType';
import { AuthToken } from '../../../models/AuthToken/AuthToken';

export default function Dashboard() {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const token = localStorage.getItem("admin-token");

  const handleLogOut = React.useCallback(() => {
    localStorage.removeItem("admin-token");
  }, []);

  const slugName = authToken?.slug;
  const login = authToken?.login;
  const username = authToken?.username;

  React.useEffect(() => {
    function fetchData() {
      adminApi.authentication(token).then((result) => setAuthToken(result));
    }
    fetchData();
  }, [slugName, token]);

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
  const [countApartment, setCountApartment] = React.useState();
  const [apartmentSlug, setApartmentSlug] = React.useState("");
  const [apartmentSort, setApartmentSort] = React.useState<Apartment>();
  const [sortType, setSortType] = React.useState("");

  let { slug } = useParams();

  React.useEffect(() => {
    const fetchData = () => {
      apartmentApi.list().then((result: Apartment) => {
        setData(result);
      });
      apartmentApi.sort(sortType).then((result: Apartment) => {
        setApartmentSort(result);
      });
      apartmentApi.count().then((result) => {
        setCountApartment(result.count);
      });

      apartmentTypeApi.list().then((result: ApartmentType) => {
        setApartmentType(result);
      });
      apartmentTypeApi.get(slug).then((result: Apartment) => {
        setApartment(result);
      });
    };
    fetchData();
  }, [slug, sortType, apartmentSlug]);

  const handleSortUp = React.useCallback(() => {
    setSortType("asc");
    setData(apartmentSort);
  }, [apartmentSort]);

  const handleSortDown = React.useCallback(() => {
    setSortType("desc");
    setData(apartmentSort);
  }, [apartmentSort]);

  const handleGoDetail = React.useCallback((e) => {
    let temp = e.target.value;
    setApartmentSlug(temp);
    localStorage.setItem("apartment-slug", temp);
  }, []);

  // search
  const { Search } = Input;
  const onSearch = async (search: string) => {
    const data = { search };
    axiosClient.post("/apartments/search", { data }).then((response) => {
      if (response.data.success === false) {
        alert("Không có căn hộ cần tìm kiếm. So sorry :(");
      } else {
        setData(response.data);
      }
    });
  };

  //modal tao moi
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const data = { name, description, number_of_cus, price, area, images };
    adminApi.add(token as string, data).then((result) => {});
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // form add new
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

  const [form] = Form.useForm();
  const [name, setName] = React.useState("");
  const [area, setArea] = React.useState("");
  const [number_of_cus, setNumOfCus] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [images, setImages] = React.useState("");

  const handleOnChangeName = React.useCallback((e) => {
    setName(e.target.value);
  }, []);
  const handleOnChangeArea = React.useCallback((e) => {
    setArea(e.target.value);
  }, []);
  const handleOnChangeNumOfCus = React.useCallback((e) => {
    setNumOfCus(e.target.value);
  }, []);
  const handleOnChangePrice = React.useCallback((e) => {
    setPrice(e.target.value);
  }, []);
  const handleOnChangeDescription = React.useCallback((e) => {
    setDescription(e.target.value);
  }, []);
  const handleOnChangeImages = React.useCallback((e) => {
    setImages(e.target.value);
  }, []);

  // delete

  const handleDelete = async (e: any) => {
    adminApi.delete(token, e.target.value).then((result) => {});
    window.location.reload();
  };

  return (
    <div className="all">
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
              <h2 className="header-dashboard"> ADMIN DASHBOARD</h2>
              <Button className="button-dashboard" type="dashed">
                Quản lý chung
              </Button>
              <Button className="button-dashboard" type="dashed">
                <Link to="/waiting-order"> Phòng chờ</Link>
              </Button>
              <Button className="button-dashboard" type="dashed">
                <Link to="/confirmed-order"> Phòng xác nhận</Link>
              </Button>
              <Button className="button-dashboard" type="dashed">
                <Link to="/staying-order"> Phòng đang thuê</Link>
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
                    <>
                      <Row>
                        <Col span={4}>
                          {" "}
                          <Button className="button-control" type="dashed">
                            <Link to="">TẤT CẢ</Link>
                          </Button>
                        </Col>

                        {apartmentType?.apartment_types?.map((item, id) => {
                          return (
                            <Col span={5} key={item._id}>
                              <Button className="button-control" type="dashed">
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
                            <Breadcrumb.Item>
                              {slug || "tat-ca"}
                            </Breadcrumb.Item>
                          </Breadcrumb>
                          <div style={{ marginLeft: "39%" }}>
                            {" "}
                            <Search
                              placeholder="Nhập tên căn hộ"
                              onSearch={onSearch}
                              style={{ width: 400 }}
                            />
                            <Button type="dashed" onClick={handleSortUp}>
                              Tăng
                            </Button>
                            <Button type="dashed" onClick={handleSortDown}>
                              Giảm
                            </Button>
                            <Button onClick={showModal} type="dashed">
                              Tạo mới
                            </Button>
                          </div>
                          <Modal
                            title="Tạo mới căn hộ"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <Form
                              {...formItemLayout}
                              form={form}
                              onFinish={handleOk}
                              scrollToFirstError
                            >
                              <Form.Item
                                name="apartment_name"
                                label="Tên căn hộ"
                                rules={[
                                  {
                                    required: true,
                                    message: "Nhập tên căn hộ!",
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input onChange={handleOnChangeName} />
                              </Form.Item>
                              <Form.Item
                                name="area"
                                label="Diện tích"
                                rules={[
                                  {
                                    required: true,
                                    message: "Nhập diện tích",
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input onChange={handleOnChangeArea} />
                              </Form.Item>

                              <Form.Item
                                name="num_of_cus"
                                label="Số người"
                                rules={[
                                  {
                                    required: true,
                                    message: "Nhập số người",
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input onChange={handleOnChangeNumOfCus} />
                              </Form.Item>
                              <Form.Item
                                name="price"
                                label="Giá tiền"
                                rules={[
                                  {
                                    required: true,
                                    message: "Nhập giá tiền",
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input onChange={handleOnChangePrice} />
                              </Form.Item>
                              <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                  {
                                    required: true,
                                    message: "Nhập mô tả",
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input onChange={handleOnChangeDescription} />
                              </Form.Item>
                              <Form.Item
                                name="image"
                                label="Link ảnh căn hộ"
                                rules={[
                                  {
                                    required: true,
                                    message: "Nhập link ảnh căn hộ",
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input onChange={handleOnChangeImages} />
                              </Form.Item>
                            </Form>
                          </Modal>

                          <Content
                            className="site-layout-background"
                            style={{
                              padding: 24,
                              margin: 0,
                              minHeight: 280,
                            }}
                          >
                            {!slug && (
                              <>
                                <h5 className="so-luong">
                                  Hien thi: {countApartment} / {countApartment}{" "}
                                </h5>
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
                                              <Link
                                                to={`/apartment-detail/${item.slug}`}
                                              >
                                                <button
                                                  style={{
                                                    marginRight: "10px",
                                                  }}
                                                  value={item.slug}
                                                  onClick={handleGoDetail}
                                                >
                                                  Xem thêm
                                                </button>
                                              </Link>

                                              <button
                                                value={item.slug}
                                                onClick={handleDelete}
                                              >
                                                Xóa phòng
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
                                </>
                              </>
                            )}
                            {slug && (
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
                                            <Link
                                              to={`/apartment-detail/${ap.slug}`}
                                            >
                                              <button
                                                value={ap.slug}
                                                onClick={handleGoDetail}
                                              >
                                                Xem thêm
                                              </button>
                                            </Link>
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
                                        </>
                                      </div>
                                    );
                                  })}
                              </div>
                            )}
                          </Content>
                        </Layout>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
