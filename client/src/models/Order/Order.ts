import { OrderData } from "./OrderData";

export interface Order {
    status?: boolean;
    orders?: OrderData[];
  }