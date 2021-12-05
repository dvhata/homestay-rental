import React from "react";
import apartmentTypeApi from "../../../api/AprtmentTypeApi";
import Header from "../../../components/Header/Header";
import { ApartmentType } from "../../../models/ApartmentType/ApartmentType";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./ApartmentTypeMaster.scss";

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
      <div>
        <Row className="breadcrumb">
          <Col span={12}>
            <img
              className="img-type"
              src="https://cdn.dribbble.com/users/2532676/screenshots/16883465/media/47fb561d3ae19a6640a4f7a6136c81d3.png?compress=1&resize=1600x1200"
              alt="error"
            />
          </Col>
          <Col className="text-header" span={6}>
            {" "}
            <h1>CHIM TRÊN CÂY HOMESTAY</h1>
            <h3>
              Một ngôi làng cheo veo trên triền đồi với những chiếc tổ được làm
              bằng gỗ, phủ đầy hoa lá, cách trung tâm Đà Lạt khoảng 2km. Nếu bạn
              yêu thiên nhiên, thích sự mộc mạc, giản tiện và tự phục vụ thì đây
              hẳn là một thiên đường dành cho bạn.
            </h3>
          </Col>
        </Row>
      </div>
      <div className="container">
        {data &&
          data.apartment_types?.map((item) => {
            return (
              <Row key={item._id}>
                <Col className=""span={10}>
                  <img className="img-type" src={item.image} alt="error" />
                </Col>
                <Col  className="apartment-type-detail" span={14}>
                  <h1>
                    <Link className="link" to="/apartment-master">{item.name}</Link>
                  </h1>
                  <h4>{item.price}</h4>
                  <h4>{item.description}</h4>
                </Col>
              </Row>
            );
          })}
      </div>
    </div>
  );
}
