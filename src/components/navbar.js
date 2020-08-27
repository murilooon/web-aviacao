import React, {Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './login';
import LogoutButton from './logout';

const NavbarHeader = () => {
  const { isAuthenticated } = useAuth0();

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
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarHeader;
