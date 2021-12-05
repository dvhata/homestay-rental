import "./ApartmentMaster.scss";

import { Breadcrumb, Button, Card, Col, Input, Layout, Menu, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link, useParams } from "react-router-dom";

import apartmentApi from "../../../api/ApartmentApi";
import apartmentTypeApi from "../../../api/ApartmentTypeApi";
import Header from "../../../components/Header/Header";
import { Apartment } from "../../../models/Apartment/Apartment";
import { ApartmentType } from "../../../models/ApartmentType/ApartmentType";
import axiosClient from "../../../config/axiosClient";

export default function ApartmentMaster() {
  const [data, setData] = React.useState<Apartment>();
  const [apartmentType, setApartmentType] = React.useState<ApartmentType>();
  const [apartment, setApartment] = React.useState<Apartment>();
  const [apartmentSlug, setApartmentSlug] = React.useState("");
  const [countApartment, setCountApartment] = React.useState();
  const [sortType, setSortType] = React.useState("");
  const [apartmentSort, setApartmentSort] = React.useState<Apartment>();
  const [apartmentSearch, setApartmentSearch] = React.useState<Apartment>();

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
                <Button className="button-control" type="dashed">
                  <Link to="">TẤT CẢ</Link>
                </Button>
                {apartmentType?.apartment_types?.map((item, id) => {
                  return (
                    <div key={item._id}>
                      <Button className="button-control" type="dashed">
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
            <Breadcrumb
              style={{ margin: "16px 20px", marginTop: 50, marginBottom: 0 }}
            >
              <Breadcrumb.Item>Bird's net</Breadcrumb.Item>
              <Breadcrumb.Item>Loai can ho</Breadcrumb.Item>
              <Breadcrumb.Item>{slug || "tat-ca"}</Breadcrumb.Item>
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
                                <Link to={`/apartment-detail/${item.slug}`}>
                                  <button
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
                              title={`${ap.name} -  ${ap.price}`}
                            >
                              <button value={ap.slug} onClick={handleGoDetail}>
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
                          </>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* {slug === undefined && (
                <div>
                  <h5 className="so-luong">
                    Hien thi: {countApartment} / {countApartment}{" "}
                  </h5>
                  {apartment &&
                    apartment.apartments?.map((ap) => {
                      return <div key={ap._id}></div>;
                    })}
                </div>
              )} */}
            </Content>
          </Layout>
        </Col>
      </Row>
    </div>
  );
}
