import { Button, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import adminApi from "../../../api/AdminApi";
import { AuthToken } from "../../../models/AuthToken/AuthToken";
import { User } from "../../../models/User/User";

export default function AdminProfile() {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [profile, setProfile] = React.useState<User>();
  const adminToken = localStorage.getItem("admin-token");
  
  const handleLogOut = React.useCallback(() => {
    localStorage.removeItem("admin-token");
  }, []);

  const slug = authToken?.slug;
  console.log(adminToken)
  React.useEffect(() => {
    function fetchData() {
      adminApi.authentication(adminToken).then((result) => setAuthToken(result));
      adminApi.get(adminToken, slug).then((result: User) => {
        setProfile(result);
      });
    }
    fetchData();
  }, [slug, adminToken]);

  return (
    <div>
      <Row>
        <Col span={10}>
          <img
            style={{ width: "400px", height: "300px" }}
            src="https://th.bing.com/th/id/R.b2ee5091106dc5646ba94647cd77c7b0?rik=ty1Wak976LLaNA&riu=http%3a%2f%2fwww.nwcaonline.com%2fwp-content%2fuploads%2f2016%2f07%2favatar_administrator2.png&ehk=fsTf5nE60n3Kkgd3Unty7PCef3F2tph3TUTYjPtzdUs%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
            alt="error"
          />
        </Col>
        <Col span={10}>
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "50px",
              marginBottom: "20px",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            {profile?.user?.username}
          </h2>
          <p style={{ fontSize: "16px", marginTop: "30px" }}>
            Email:
            {profile?.user?.email}
          </p>
          <p style={{ fontSize: "16px", marginTop: "30px" }}>
            Điện thoại:
            {profile?.user?.tel}
          </p>
          <p style={{ fontSize: "16px", marginTop: "30px" }}>
            Địa chỉ:
            {profile?.user?.address}
          </p>
          <Button
            className="profile-dang-xuat"
            type="dashed"
            onClick={handleLogOut}
          >
            {" "}
            <Link style={{ color: "white", fontSize: "16px" }} to="/">
              {" "}
              Đăng xuất
            </Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
}
