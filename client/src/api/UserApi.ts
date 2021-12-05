import axiosClient from "../config/axiosClient";
class UserApi {
  authentication = (token?: any) => {
    const url = "/users/auth-token";
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  };

  get = (slug?: string) => {
    const url = "/users/" + slug;
    return axiosClient.get(url).then((response) => response.data);
  };
}

const userApi = new UserApi();
export default userApi;
