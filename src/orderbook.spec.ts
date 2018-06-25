import './env';
import fetchOrderbook from './orderbook';

const expectOrders = orders => {
  expect(orders).toEqual(
    expect.arrayContaining([
      expect.arrayContaining([
        expect.any(String),
        expect.arrayContaining([
          expect.objectContaining({
            Quantity: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      ]),
    ]),
  );
};

const expectOrderbook = orderbook => {
  expect(orderbook).toHaveProperty('asks');
  expectOrders(orderbook.asks);
  expect(orderbook).toHaveProperty('bids');
  expectOrders(orderbook.bids);
};

describe('fetchOrderbook', () => {
  it('returns combined orderbook', async () => {
    expect.assertions(4);
    const response = await fetchOrderbook({ market: 'BTC-ETH' });
    expectOrderbook(response);
  });
  it('handles underscores in market name, non `BTC-ETH` market', async () => {
    expect.assertions(4);
    const response = await fetchOrderbook({ market: 'BTC_DOGE' });
    expectOrderbook(response);
  });
});
