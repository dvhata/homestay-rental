import axiosClient from "../config/axiosClient";
class AdminApi {
  authentication = (token?: any) => {
    const url = "/auth-token";
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  };

  get = (token?: any, slug?: string) => {
    const url = "/admins/" + slug;
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
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

  add = (token?: string, data?: any) => {
    const url = "/admins/add-new";
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

  edit = (token?: string, slug?: any, data?: any) => {
    const url = "/admins/edit/" + slug;
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

  delete = (token?: any, slug?: string) => {
    const url = "/admins/delete-one/" + slug;
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  };

  confirm = (token?: any, id?: string) => {
    const url = "/admins/orders/" + id + "/confirm";
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
  checkin = (token?: any, id?: string) => {
    const url = "/admins/orders/" + id + "/check-in";
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
  checkout = (token?: any, id?: string) => {
    const url = "/admins/orders/" + id + "/check-out";
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

  cancel = (token?: any, id?: string) => {
    const url = "/admins/orders/" + id + "/cancel";
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

  searchConfirmed = (token?: any, data?: any) => {
    const url = "/admins/orders/confirmed/search";
    return axiosClient
      .post(
        url,
        {data},
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => response.data);
  };

  searchStaying = (token?: any, data?: any) => {
    const url = "/admins/orders/staying/search";
    return axiosClient
      .post(
        url,
        {data},
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => response.data);
  };

  // chua co
  searchWaiting = (token?: any, data?: any) => {
    const url = "/admins/orders/confirmed/search";
    return axiosClient
      .post(
        url,
        {data},
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => response.data);
  };
}

const adminApi = new AdminApi();
export default adminApi;
