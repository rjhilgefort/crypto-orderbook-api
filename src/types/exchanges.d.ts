export type Quantity = number;
export type Rate = string;

export interface Order {
  Quantity: Quantity;
  Rate: Rate;
}

export type Orders = Array<Order>;

export type Asks = Orders;
export type Bids = Orders;

export interface Orderbook {
  asks: Asks;
  bids: Bids;
}

export interface FetchOrderbookParams {
  market: string;
}

export type FetchOrderbook = (FetchOrderbook) => Promise<Orderbook>;

export interface ExchangeQuantity {
  name: string;
  Quantity: Quantity;
}

export type CombinedOrder = [Rate, Array<ExchangeQuantity>];

export interface CombinedOrderbook {
  asks: Array<CombinedOrder>;
  bids: Array<CombinedOrder>;
}
