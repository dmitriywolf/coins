import { Select } from 'antd';

import { CURRENCIES } from '../../common/constant';
import { useCurrencyContext } from '../../context';

export function CurrencySelect() {
  const { currency, setCurrency } = useCurrencyContext();

  const options = CURRENCIES.map(({ value, symbol }) => ({
    value,
    label: `${symbol} | ${value}`,
  }));

  const handleChange = (value) => {
    setCurrency(value);
  };

  return (
    <Select
      defaultValue={currency.value}
      options={options}
      onChange={handleChange}
      className='customSelect'
      popupClassName='customDropDowmMenu'
      style={{
        width: 100,
      }}
    />
  );
}
