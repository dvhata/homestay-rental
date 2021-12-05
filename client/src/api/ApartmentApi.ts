import axiosClient from "../config/axiosClient";

class ApartmentApi {
  list = (params?: any) => {
    const url = "/apartments";
    return axiosClient
      .get(url, {
        params,
      })
      .then((response) => response.data);
  };

  get = (name?: string) => {
    const url = "/apartments/" + name;
    return axiosClient.get(url).then((response) => response.data);
  };

  count = (params?: any) => {
    const url = "/apartments/all-count";
    return axiosClient
      .get(url, {
        params,
      })
      .then((response) => response.data);
  };

  sort = (sortType?: string) => {
    const url = "/apartments/sort/" + sortType;
    return axiosClient.get(url).then((response) => response.data);
  };

  detail = (slug?: string) => {
    const url = "/apartments/" + slug;
    return axiosClient.get(url).then((response) => response.data);
  };

  relate = (slug?: string, apartmentSlug?: string) => {
    const url = "/apartments/" + slug + "/related-products/" + apartmentSlug;
    return axiosClient.get(url).then((response) => response.data);
  };

  checkOrder = (apartmentSlug?: string) => {
    const url = "/apartments/" + apartmentSlug + "/check-order";
    return axiosClient.get(url).then((response) => response.data);
  };

  getFeedback = (apartmentSlug?: string) => {
    const url = "/apartments/" + apartmentSlug + "/get-feedbacks";
    return axiosClient.get(url).then((response) => response.data);
  };

  order = (slug?: string) => {
    const url = "/apartments/" + slug + "/save-order";
    return axiosClient.post(url, slug).then((response) => response.data);
  };
}
const apartmentApi = new ApartmentApi();
export default apartmentApi;
