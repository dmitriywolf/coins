export const marketCoinsConnector = (data) => {
  if (data) {
    return data?.map((item) => ({
      key: item.id,
      id: item.id,
      rank: item.market_cap_rank,
      name: item.name,
      symbol: item.symbol,
      image: item.image,
      price: item.current_price,
      price_change_percentage_24h: item.price_change_percentage_24h,
      price_change_24h: item.price_change_24h,
      price_change_percentage_7d: item.price_change_percentage_7d_in_currency,
      price_change_percentage_30d: item.price_change_percentage_30d_in_currency,
      market_cap: item.market_cap,
      circulating_supply: item.circulating_supply,
      max_supply: item.max_supply,
    }));
  } else {
    return [];
  }
};
