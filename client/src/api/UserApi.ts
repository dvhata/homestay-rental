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

  orderList = (token?: any) => {
    const url = "/users/orders";
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  };
  edit = (slug?: string, token?: string, data?: any) => {
    const url = "/users/" + slug + "/edit";
    return axiosClient
      .post(
        url,
        { data },
        {
          headers: { Authorization: token as string },
        }
      )
      .then((response) => response.data);
  };

  cancel = (token?: any, id?: string) => {
    const url = "/users/orders/" + id + "/cancel";
    return axiosClient
      .post(
        url,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => response.data);
  };
}

const userApi = new UserApi();
export default userApi;
