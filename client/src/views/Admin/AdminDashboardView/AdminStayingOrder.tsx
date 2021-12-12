import './AdminDashboard.scss';

import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined';
import { Button, Col, Dropdown, Input, Menu, Row } from 'antd';
import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

import adminApi from '../../../api/AdminApi';
import { AuthToken } from '../../../models/AuthToken/AuthToken';
import { Order } from '../../../models/Order/Order';
import { User } from '../../../models/User/User';

export default function AdminStayingOrder() {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [StayingOrder, setStayingOrder] = React.useState<Order>();
  const token = localStorage.getItem("admin-token");

  const handleLogOut = React.useCallback(() => {
    localStorage.removeItem("admin-token");
  }, []);

  const slugName = authToken?.slug;
  const username = authToken?.username;

  React.useEffect(() => {
    function fetchData() {
      adminApi.authentication(token).then((result) => setAuthToken(result));

      adminApi.staying(token).then((result: User) => {
        // console.log(result);
        setStayingOrder(result);
      });
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

  // confirm order
  const handleOrderConfirm = async (e: any) => {
    adminApi.checkout(token as string, e.target.value).then((result) => {
      setStayingOrder(result);
      console.log(result);
      alert("Số tiền khách cần thanh toán:" + result.payment);
    });
    
  };

  // search
  const { Search } = Input;
  const onSearch = async (search: string) => {
    const data = { search };
    adminApi.searchStaying(token as string, data as any).then((result) => {
      setStayingOrder(result);
    });
  };

  return (
    <div className="all">
      
        <>
          <Row>
            <Col className="col-1-dashboard" span={4}>
              <h2 className="header-dashboard"> ADMIN DASHBOARD</h2>
              <Button className="button-dashboard" type="dashed">
                <Link to="/admin-dashboard"> Quản lý chung</Link>
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
                      <div className="content-type">
                        <Search
                          placeholder="Nhập tên khách hàng"
                          onSearch={onSearch}
                          style={{
                            width: 400,
                            marginLeft: "65%",
                            marginTop: "20px",
                            marginBottom: "20px",
                          }}
                        />
                        <table>
                          <tr>
                            <th>Khách hàng</th>
                            <th>Email</th>
                            <th>Tên căn hộ</th>
                            <th>Giá tiền</th>
                            <th>Ngày thuê phòng</th>
                            <th>Ngày trả phòng</th>

                            <th></th>
                          </tr>

                          {StayingOrder &&
                            StayingOrder.orders?.map((item) => {
                              return (
                                <tr key={item._id}>
                                  <td>{item.cus_name}</td>
                                  <td>{item.email}</td>
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
                                    <button
                                      value={item._id}
                                      onClick={handleOrderConfirm}
                                    >
                                      Thanh toán
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </table>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>

    </div>
  );
}
