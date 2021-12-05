import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import userApi from "../../../api/UserApi";
import { AuthToken } from "../../../models/AuthToken/AuthToken";
import { User } from "../../../models/User/User";

export default function Profile() {
  const [authToken, setAuthToken] = React.useState<AuthToken>();
  const [profile, setProfile] = React.useState<User>();
  const token = localStorage.getItem("token");

  const handleLogOut = React.useCallback(() => {
    localStorage.removeItem("token");
  }, []);

  const slug = authToken?.slug;
  const login = authToken?.login;

  React.useEffect(() => {
    function fetchData() {
      userApi.authentication(token).then((result) => setAuthToken(result));
      userApi.get(slug).then((result: User) => {
        setProfile(result);
      });
    }
    fetchData();
  }, [slug, token]);

  return (
    <div>
      <Button type="dashed" onClick={handleLogOut}>
        {" "}
        <Link to="/"> dang xuat</Link>
      </Button>
      {login && (
        <div>
          {profile?.user?.username}
          <img src= {profile?.user?.avatar} alt="error" />
         
        </div>
      )}
      {!login && <div>Chua dang nhap</div>}
    </div>
  );
}
