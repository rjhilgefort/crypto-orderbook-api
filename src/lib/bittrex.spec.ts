import '../env';
import * as bittrex from './bittrex';

const INVALID_MARKET_RESPONSE = {
  message: 'INVALID_MARKET',
  result: null,
  success: false,
};

const expectOrders = orders => {
  expect(orders).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        Quantity: expect.any(Number),
        Rate: expect.any(String),
      }),
    ]),
  );
};

const expectOrderbook = orderbook => {
  expect(orderbook).toHaveProperty('asks');
  expectOrders(orderbook.asks);
  expect(orderbook).toHaveProperty('bids');
  expectOrders(orderbook.bids);
};

describe('Integration', () => {
  describe('fetchOrderbook', () => {
    it('yells about invalid markets', () => {
      expect.assertions(1);
      return bittrex.fetchOrderbook({ market: 'testing' }).catch(err => {
        expect(err).toEqual(INVALID_MARKET_RESPONSE);
      });
    });

    it('Gets a success response for valid market', async () => {
      const response = await bittrex.fetchOrderbook({ market: 'BTC-ETH' });
      expect.assertions(4);
      expectOrderbook(response);
    });
  });
});

// TODO:
// describe('Unit', () => {});
