import { COMPARE_LINK } from '@/common/constant';

export const cryptoCoinsConnector = (data) => {
  return data?.Data?.map((item) => {
    const currencyKey = item.DISPLAY ? Object.keys(item.DISPLAY)[0] : '';

    return {
      key: item.CoinInfo.Id,
      id: item.CoinInfo.Id,
      internal: item.CoinInfo.Internal,
      algorithm: item.CoinInfo.Algorithm,
      blockTime: item.CoinInfo.BlockTime,
      blockNumber: item.CoinInfo.BlockNumber,
      launchDate: item.CoinInfo.AssetLaunchDate,
      fullName: item.CoinInfo.FullName,
      symbol: item.CoinInfo.Name,
      proofType: item.CoinInfo.ProofType,
      image: `${COMPARE_LINK}${item.CoinInfo.ImageUrl}`,
      price: item.DISPLAY?.[currencyKey]?.PRICE || '-',
      highPrice24h: item.DISPLAY?.[currencyKey]?.HIGH24HOUR || '-',
      lowPrice24h: item.DISPLAY?.[currencyKey]?.LOW24HOUR || '-',
    };
  });
};
