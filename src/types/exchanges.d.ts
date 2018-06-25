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

interface FetchOrderbookParams {
  market: string;
}

export type FetchOrderbook = (FetchOrderbook) => Promise<Orderbook>;
