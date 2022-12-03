export const formatNumber = (price, locales = 'en-US') => {
  return new Intl.NumberFormat(locales).format(price);
};
