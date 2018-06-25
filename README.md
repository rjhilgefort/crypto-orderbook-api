# Crypto Orderbook 

A combined orderbook API sourcing from `bittrex` and `poloniex`. Built with express, ramda, sanctuary, typescript, jest, nock, and more.

The API is deployed at the following URL and has `GET` routes for `/` and `/orderbook`.

### [https://crypto-orderbook.now.sh](https://crypto-orderbook.now.sh)

![](./demo.gif)

# NOTES:

- It would seem that [coinapi.io](https://docs.coinapi.io/#order-book) would be pretty useful for this sort of thing, but it didn't seem like that was the spirit of the task.

# TODO:

- Document routes
- Deploy somewhere
- `TODO` in `tsconfig` about module imports
- Remove *all* // @ts-ignore
- More tests
