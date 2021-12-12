import './ApartmentTypeMaster.scss';

import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import apartmentTypeApi from '../../../api/ApartmentTypeApi';
import Header from '../../../components/Header/Header';
import { ApartmentType } from '../../../models/ApartmentType/ApartmentType';
import Footer from './../../../components/Footer/Footer';

export default function ApartmentTypeMaster() {
  const [data, setData] = React.useState<ApartmentType>();

  React.useEffect(() => {
    const fetchData = () => {
      apartmentTypeApi.list().then((result: ApartmentType) => {
        setData(result);
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="breadcrumb">
        {/* <img
          className="img-type"
          src="https://ontrip.in/wp-content/uploads/2016/12/Kagey1.jpg"
          alt="error"
        /> */}
        <div className="text-header">
          {" "}
          <h1>!!! CHIM TRÊN CÂY HOMESTAY !!!</h1>
          <h3>
            Một ngôi làng cheo veo trên triền đồi với những chiếc tổ được làm
            bằng gỗ, phủ đầy hoa lá, cách trung tâm Đà Lạt khoảng 2km. Nếu bạn
            yêu thiên nhiên, thích sự mộc mạc, giản tiện và tự phục vụ thì đây
            hẳn là một thiên đường dành cho bạn.
          </h3>
        </div>
      </div>
      <div>
        {data &&
          data.apartment_types?.map((item) => {
            return (
              <div key={item._id}>
                <Row
                  style={{
                    padding: "7%",
                    paddingLeft: "10%",
                    paddingTop: "10px",
                  }}
                >
                  <Col
                    style={{ border: "1px solid black" }}
                    className=""
                    span={10}
                  >
                    <img className="img-type" src={item.image} alt="error" />
                  </Col>
                  <Col span={2}></Col>
                  <Col
                    style={{ border: "1px solid black" }}
                    /* className="apartment-type-detail" */ span={12}
                  >
                    <div className="apartment-type-div">
                      <h1 className="apartment-type-title">
                        <Link className="link" to={`/apartment/${item.slug}`}>
                          {item.name}
                        </Link>
                      </h1>
                      <h3 className="apartment-type-content">{item.price}</h3>
                      <h3 className="apartment-type-content">
                        {item.description}
                      </h3>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
}
