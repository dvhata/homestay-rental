import './ApartmentMaster.scss';

import { Breadcrumb, Button, Card, Col, Input, Layout, Menu, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import NumberFormat from 'react-number-format';
import { Link, useParams } from 'react-router-dom';

import apartmentApi from '../../../api/ApartmentApi';
import apartmentTypeApi from '../../../api/ApartmentTypeApi';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import axiosClient from '../../../config/axiosClient';
import { Apartment } from '../../../models/Apartment/Apartment';
import { ApartmentType } from '../../../models/ApartmentType/ApartmentType';

export default function ApartmentMaster() {
  const [countApartment,setCountApartment] = React.useState();
  const [data, setData] = React.useState<Apartment>();
  const [apartmentType, setApartmentType] = React.useState<ApartmentType>();
  const [apartment, setApartment] = React.useState<Apartment>();
  const [apartmentSlug, setApartmentSlug] = React.useState("");
  const [sortType, setSortType] = React.useState("");
  const [apartmentSort, setApartmentSort] = React.useState<Apartment>();

  let { slug } = useParams();

  const handleGoDetail = React.useCallback((e) => {
    let temp = e.target.value;
    setApartmentSlug(temp);
    localStorage.setItem("apartment-slug", temp);
  }, []);

  React.useEffect(() => {
    const fetchData = () => {
      apartmentApi.list().then((result: Apartment) => {
        setData(result);
      });
      apartmentApi.sort(sortType).then((result: Apartment) => {
        setApartmentSort(result);
      });
      apartmentApi.count().then ((result) => {
        setCountApartment(result.count)
      })

      apartmentTypeApi.list().then((result: ApartmentType) => {
        setApartmentType(result);
      });
      apartmentTypeApi.get(slug).then((result: Apartment) => {
        setApartment(result);
      });
    };
    fetchData();
  }, [slug, apartmentSlug, sortType]);

  const handleSortUp = React.useCallback(() => {
    setSortType("asc");
    setData(apartmentSort);
  }, [apartmentSort]);

  const handleSortDown = React.useCallback(() => {
    setSortType("desc");
    setData(apartmentSort);
  }, [apartmentSort]);

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

  return (
    <div>
      <Header />
      <Row className="apartment-container">
        <Col span={5}>
          <Sider className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <>
                <Link to="">
                  <Button className="button-control" type="dashed">
                    TẤT CẢ
                  </Button>
                </Link>

                {apartmentType?.apartment_types?.map((item, id) => {
                  return (
                    <div key={item._id}>
                      <Link to={`${item.slug}`}>
                        {" "}
                        <Button className="button-control" type="dashed">
                          {item.name}{" "}
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </>
            </Menu>
          </Sider>
        </Col>
        <Col span={19}>
          {" "}
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb
              style={{ margin: "16px 20px", marginTop: 50, marginBottom: 0 }}
            >
              <Breadcrumb.Item>Bird's net</Breadcrumb.Item>
              <Breadcrumb.Item>Loai can ho</Breadcrumb.Item>
              <Breadcrumb.Item>{slug || "tat-ca"}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ paddingLeft: "45%" }}>
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
            </div>

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
                    Hien thi: {data?.apartments?.length} /{" "}
                    {countApartment}{" "}
                  </h5>
                  <>
                    {data &&
                      data.apartments?.map((item) => {
                        return (
                          <div key={item._id}>
                            <>
                              <Card
                                className="card-apartment"
                                title={
                                  <Title level={2}>
                                    {item.name + " - "}
                                    <NumberFormat
                                      value={item.price && item.price}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                    {"đ "}
                                  </Title>
                                }
                              >
                                <Link to={`/apartment-detail/${item.slug}`}>
                                  <button
                                    className="xem-them"
                                    value={item.slug}
                                    onClick={handleGoDetail}
                                  >
                                    Xem thêm
                                  </button>
                                </Link>

                                {item.images?.slice(0, 2).map((item, index) => {
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
                              title={
                                <Title level={2}>
                                  {ap.name + " - "}
                                  <NumberFormat
                                    value={ap.price && ap.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />
                                  {"đ "}
                                </Title>
                              }
                            >
                              <Link to={`/apartment-detail/${ap.slug}`}>
                                <button
                                  className="xem-them"
                                  value={ap.slug}
                                  onClick={handleGoDetail}
                                >
                                  Xem thêm
                                </button>
                              </Link>
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
      <Footer />
    </div>
  );
}
