import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import Toggle from "./components/Toggler";
import { useDarkMode } from "./components/useDarkMode";
import { lightTheme, darkTheme } from "./components/Themes";
import { func, string } from 'prop-types';

const NavbarHeader = ({ theme, handleThemeToggler }) => {
  // const [theme, themeMode, themeToggler] = useDarkMode();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Aviação</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/models">Modelos</Nav.Link>
          <Nav.Link href="/airplanes">Aviões</Nav.Link>
        </Nav>

        <Nav>
          {/* <Button variant="outline-success" onClick={theme}>Switch Theme</Button> */}
          <Toggle theme={theme} toggleTheme={handleThemeToggler} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarHeader;
