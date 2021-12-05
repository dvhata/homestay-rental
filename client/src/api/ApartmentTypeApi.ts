import axiosClient from '../config/axiosClient';

class ApartmentTypeApi {
  list = (params?: any) => {
    const url = "/apartments/types";
    return axiosClient.get(url, {
      params
     }).then(response => response.data);
  };

  get = (slug?: string) => {
    const url = "/apartments/types/" + slug;
    return axiosClient.get(url).then(response => response.data);
  };

}
const apartmentTypeApi = new ApartmentTypeApi();
export default apartmentTypeApi;
