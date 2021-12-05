import axiosClient from "../config/axiosClient";
class AdminApi {
  authentication = (token?: any) => {
    const url = "/users/auth-token";
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  };

  get = (slug?: string) => {
    const url = "/admins/" + slug;
    return axiosClient.get(url).then((response) => response.data);
  };

  waiting = (token?: any) => {
    const url = "/admins/orders/waiting";
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  };

  confirmed = (token?: any) => {
    const url = "/admins/orders/confirmed";
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  };

  staying = (token?: any) => {
    const url = "/admins/orders/staying";
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  };
}

const adminApi = new AdminApi();
export default adminApi;
