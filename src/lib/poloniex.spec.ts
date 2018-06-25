import nock from 'nock';
import '../env';
import * as poloniex from './poloniex';

const {
  EXCHANGE_POLONIEX_HOST: HOST,
  EXCHANGE_POLONIEX_PREFIX: PREFIX,
}: {
  HOST: string;
  PREFIX: string;
} = process.env;

const INVALID_MARKET_RESPONSE = {
  error: 'Invalid currency pair.',
};

describe('Integration', () => {
  describe('fetchOrderbook', () => {
    it('yells about invalid markets', () => {
      expect.assertions(1);
      return poloniex.fetchOrderbook({ market: 'testing' }).catch(err => {
        expect(err).toEqual(INVALID_MARKET_RESPONSE);
      });
    });

    it('Gets a success response for valid market', async () => {
      const response = await poloniex.fetchOrderbook({ market: 'BTC-ETH' });
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
