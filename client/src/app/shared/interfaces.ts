export interface User {
  email: string;
  password: string;
}

export interface Category {
  _id?: string;
  name: string;
  imageSrc?: string;
  user?: string;
}

export interface Message {
  message: string;
}

export interface Position {
  _id?: string;
  name: string;
  cost: number;
  category: string;
  user?: string;
  quantity?: number;
}

export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  list: OrderPosition[];
  _id?: string;
}

export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}

export interface  Filter {
  order?: number;
  start?: Date;
  end?: Date;
}

export interface OverviewModel {
  orders: OverviewItem;
  gain: OverviewItem;
}

export interface OverviewItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}

export interface AnalyticsModel {
   average: number;
   chart: AnalyticsChartItem[];
}

export interface AnalyticsChartItem {
  gain: number;
  order: number;
  label: string;
}
