import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from "./Themes";

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false)

  const setMode = mode => {
    window.localStorage.setItem('theme', mode)

    setTheme(mode)
  };

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light')
  };

  // const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    localTheme ? setTheme(localTheme) : setMode('light')

    setMountedComponent(true)
  }, []);

  return [theme, themeToggler, mountedComponent]
};
