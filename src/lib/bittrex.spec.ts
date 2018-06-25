import nock from 'nock';
import '../env';
import * as bittrex from './bittrex';

const {
  EXCHANGE_BITTREX_HOST: HOST,
  EXCHANGE_BITTREX_PREFIX: PREFIX,
}: {
  HOST: string;
  PREFIX: string;
} = process.env;

const INVALID_MARKET_RESPONSE = {
  message: 'INVALID_MARKET',
  result: null,
  success: false,
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
      expect(response).toHaveProperty('asks');
      expect(response.asks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            Quantity: expect.any(Number),
            Rate: expect.any(String),
          }),
        ]),
      );
      expect(response).toHaveProperty('bids');
      expect(response.bids).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            Quantity: expect.any(Number),
            Rate: expect.any(String),
          }),
        ]),
      );
    });
  });
});

// TODO:
// describe('Unit', () => {});
