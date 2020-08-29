import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';

const NavbarHeader = ({ theme }) => {
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
          <Button variant="outline-success" onClick={theme}>Switch Theme</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarHeader;
