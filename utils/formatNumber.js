export const formatNumber = (price, locales = 'en-US') => {
  return new Intl.NumberFormat(locales, { maximumSignificantDigits: 6 }).format(
    price,
  );
};
