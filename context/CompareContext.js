import React, { createContext, useState } from 'react';

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [coinsGraph, setCoinsGraph] = useState([]);

  const coinExist = ({ coin, isGraph }) => {
    if (isGraph) {
      const item = coinsGraph.find((item) => item.id === coin.id);
      return !!item;
    } else {
      const item = coins.find((item) => item.internal === coin.internal);
      return !!item;
    }
  };

  const addCoin = ({ coin, isGraph }) => {
    if (isGraph) {
      const arr = coinsGraph.concat(coin);
      setCoinsGraph(arr);
    } else {
      const arr = coins.concat(coin);
      setCoins(arr);
    }
  };

  const removeCoin = ({ coin, isGraph }) => {
    if (isGraph) {
      const arr = coinsGraph.filter((item) => item.id !== coin.id);
      setCoinsGraph(arr);
    } else {
      const arr = coins.filter((item) => item.internal !== coin.internal);
      setCoins(arr);
    }
  };

  const value = {
    count: coins.length,
    countGraph: coinsGraph.length,
    coins,
    coinsGraph,
    addCoin,
    removeCoin,
    coinExist,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

export function useCompareContext() {
  const compareContext = React.useContext(CompareContext);

  if (!compareContext) {
    throw new Error('useCompareContext must be used within a CompareProvider');
  }
  return compareContext;
}
