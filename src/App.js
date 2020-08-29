import React, { useEffect, useState } from 'react';
import Routes from './routes';
import NavbarHeader from './navbar';

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const parsedTheme = localStorage.getItem("theme")
    setTheme(parsedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <NavbarHeader theme={themeToggler} />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
