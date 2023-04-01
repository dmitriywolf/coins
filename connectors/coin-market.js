export const coinMarketConnector = (data) => {
  return {
    name: data?.name,
    symbol: data?.symbol,
    high24h: data?.market_data.high_24h,
    low24h: data?.market_data.low_24h,
    marketCap: data?.market_data.market_cap,
    marketCapChangePercentage24hInCurrency:
      data?.market_data.market_cap_change_percentage_24h_in_currency,
    currentPrice: data?.market_data.current_price,
    priceChangePercentage24hInCurrency:
      data?.market_data.price_change_percentage_24h_in_currency,
    circulatingSupply: data?.market_data.circulating_supply,
    maxSupply: data?.market_data.max_supply,
  };
};
