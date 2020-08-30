import React, { useEffect, useState } from 'react';
import Routes from './routes';
import NavbarHeader from './navbar';
import { func, string } from 'prop-types';

import { useDarkMode } from "./components/useDarkMode"
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import Toggle from "./components/Toggler";

const App = () => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if(!mountedComponent) return <div/>

  return (
    <ThemeProvider theme={themeMode}>
      <Toggle theme={theme} toggleTheme={themeToggler} />
      <GlobalStyles/>
      <NavbarHeader/>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
