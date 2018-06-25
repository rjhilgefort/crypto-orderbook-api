export interface Order {
  Quantity: number;
  Rate: string;
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
  Quantity: number;
}

export type ExchangeQuantities = Array<ExchangeQuantity>;

export type CombinedOrder = Array<Rate, ExchangeQuantities>;

export interface CombindedOrderbook {
  asks: Array<CombinedOrder>;
  bids: Array<CombinedOrder>;
}
