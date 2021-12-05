import Moment from "react-moment";

export interface FeedbackData {
  _id?: string;
  apartment_slug?: string;
  cus_slug?: string;
  cus_name?: string;
  cus_avatar?: string;
  comment?: string;
  createdAt: Moment,
  updatedAt: Moment
  }