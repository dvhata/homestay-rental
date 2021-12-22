import Moment from "react-moment";

export interface OrderData {
  _id?:string;
  cus_name?: string;
  cus_slug?: string;
  tel?: string;
  email?: string;
  apartment_name?: string;
  apartment_slug?: string;
  price?: number;
  status?: string;
  order_date?: Moment;
  return_date?: Moment;
  check_in_date?: Moment;
}
