import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./HomeView.scss";
import Footer from "./../../../components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container">
        <Row>
          <Col className="col-1" lg={9}>
            {" "}
            <h1>Homestay...! Chim trên cây </h1>
            <h3>Một homestay nhỏ xinh giữa lòng Đà Lạt thơ mộng!</h3>
            <button>
              <Link className="link" to="/apartment-type">
                Xem căn hộ
              </Link>
            </button>
            <Link className="link-admin" to="/admin-register">
              {/* <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABmJLR0QA/wD/AP+gvaeTAAABwElEQVQ4ja2UXUvCUBjHH7fpZorpzEqzDSMIwqASodBuir5LN32EvlFRdxVENylYEvZCdRG4dImQOnVauaFnXRixDpst6391nv/h/Hhezjm29m0V/kPEv1AAgBq8jRDKi0KhVJTbMgB43B5+ipuZjhAEnoFtQGnvSucsm2rKMuZ7PaPJeMJJM3rTtDSEkCEFABpyM5VNI4QsgfKiYEj5YgnikyVQoVTEnN2j/a2d7b3jg35YLIuWQP3u6nWSPlVU5SR92g+lhiSWn38AaZrW7fYwczO5QTvozcR6P0RIy+QuMrlzRVXBbGqapu0e7psliyk0EUzEVv96Ie0UFQxMgtmF7CG8LkPFokvTobCdspuCanXJCmiGi3ytDUp767xfPdxYAen1mVG9Wa9IVbndar22pIaEkDYM6KlUyF5f/vokRepDAix3BBNDO3EQ62WHAI37AziIC4VdI67fgvgpDgeRBLmyGLdTP3xyenGh8JjPj4MAgPWya/EEwzBGp3D5fWxsYRkzv701RVXvHu8FUTAbP0HYZvnZ6Nw8SZDYlsGj7SiKWBZfapW63FBVBQAcDnrU7QmwY3yYx37YQaDh9AF2/LhgNfB0DwAAAABJRU5ErkJggg=="
                alt="error"
              /> */}
              Ban la admin?
            </Link>
          </Col>
          <Col className="col-2" lg={15}>
            <div className="anh-1">
              <img
                src="https://cdn.dribbble.com/users/1066220/screenshots/16679547/media/9f01e7ff9c8c386bd2dd22c5536bfee8.jpg"
                alt="error"
              />
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}
