import { ConfigProvider, theme } from 'antd';
import { createContext, useContext, useState } from 'react';
import { themeConfig } from 'theme';

export const ThemeContext = createContext();
// 'light' | 'dark'

export const ThemeProvider = ({ children }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const [currentTheme, setCurrentTheme] = useState('dark');

  const value = {
    currentTheme,
    setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          algorithm:
            currentTheme === 'light' ? defaultAlgorithm : darkAlgorithm,
          ...themeConfig,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export function useThemeContext() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useThemeContext must be used within a themeProvider');
  }
  return themeContext;
}
