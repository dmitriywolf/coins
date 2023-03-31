import { createContext, useContext, useState } from 'react';

import { CURRENCIES } from '@/common/constant';

export const CurrencyContext = createContext({
  currency: CURRENCIES[0],
});

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  const handleChangeCurrency = (value) => {
    const newCurrency = CURRENCIES.find((item) => item.value === value);
    setCurrency(newCurrency);
  };

  const value = {
    currency,
    setCurrency: handleChangeCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export function useCurrencyContext() {
  const currencyContext = useContext(CurrencyContext);

  if (!currencyContext) {
    throw new Error(
      'useCurrencyContext must be used within a CurrencyProvider',
    );
  }
  return currencyContext;
}
