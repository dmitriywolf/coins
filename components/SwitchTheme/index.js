import { Button } from 'antd';

import { useThemeContext } from '@/context';
import MoonIcon from '@/public/images/Moon.svg';
import SunIcon from '@/public/images/Sun.svg';

export default function SwitchTheme() {
  const { currentTheme, setCurrentTheme } = useThemeContext();

  const switchThemeHandler = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      type='primary'
      aria-label='Switch Theme'
      onClick={switchThemeHandler}
      icon={currentTheme === 'light' ? <SunIcon /> : <MoonIcon />}
    />
  );
}
